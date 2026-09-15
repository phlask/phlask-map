import {
  autocompleteInput,
  checkTag,
  expectFormWasSubmitted,
  input,
  interceptResourceSubmitRequest,
  nextPageOrSubmit,
  openContributeMenu,
  selectAddress,
  selectEntryType,
  selectResource
} from 'utils/crowdsourcing.ts';
import { GUIDELINES_TEXTAREA } from 'utils/selectors.ts';

const FIVE_MB = 5 * 1024 * 1024;
const UPLOADED_IMAGE_KEY = 'compressed-image.jpeg';

type TestWindow = Window & typeof globalThis;

const createNoisyPng = (win: TestWindow): Promise<File> => {
  const canvas = win.document.createElement('canvas');
  canvas.width = 3000;
  canvas.height = 2000;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Could not create canvas context');
  }

  const imageData = context.createImageData(canvas.width, canvas.height);
  const data = imageData.data;
  const chunk = new Uint8Array(65536);
  for (let offset = 0; offset < data.length; offset += chunk.length) {
    win.crypto.getRandomValues(chunk);
    data.set(
      chunk.subarray(0, Math.min(chunk.length, data.length - offset)),
      offset
    );
  }
  for (let alpha = 3; alpha < data.length; alpha += 4) {
    data[alpha] = 255;
  }
  context.putImageData(imageData, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('Could not create test image'));
        return;
      }
      resolve(new win.File([blob], 'large-image.png', { type: 'image/png' }));
    }, 'image/png');
  });
};

const dropFile = (win: TestWindow, file: File) => {
  const dataTransfer = new win.DataTransfer();
  dataTransfer.items.add(file);

  const fileInput =
    win.document.querySelector<HTMLInputElement>('input[type="file"]');
  if (!fileInput) {
    throw new Error('Could not find the image upload input');
  }

  fileInput.files = dataTransfer.files;
  fileInput.dispatchEvent(new win.Event('change', { bubbles: true }));
};

describe('image compression', () => {
  beforeEach(() => {
    cy.visit('/');
    openContributeMenu();
    interceptResourceSubmitRequest();

    cy.intercept(
      { method: 'GET', hostname: 'phlask.me', pathname: '/submit-image' },
      {
        statusCode: 200,
        body: {
          putURL: 'https://s3.test/compressed-image',
          getURL: UPLOADED_IMAGE_KEY,
          errorMessage: null
        }
      }
    ).as('submitImageRequest');

    cy.intercept(
      { method: 'PUT', url: 'https://s3.test/compressed-image' },
      { statusCode: 200, body: '' }
    ).as('uploadImageRequest');
  });

  it('should compress an image over 5 MB before uploading it', () => {
    selectResource('WATER');

    input('name', 'Cypress Test Name');
    selectAddress();

    input('description', 'Cypress Test Description');
    selectEntryType();

    autocompleteInput('water.dispenser_type', 'Sink');

    nextPageOrSubmit();

    cy.window().then(async win => {
      const file = await createNoisyPng(win);
      expect(file.size, 'test image size').to.be.greaterThan(FIVE_MB);
      dropFile(win, file);
    });

    cy.wait('@submitImageRequest', { timeout: 30000 })
      .its('request.url')
      .should('include', 'type=image/jpeg');

    cy.wait('@uploadImageRequest', { timeout: 30000 }).then(({ request }) => {
      expect(request.headers['content-type']).to.equal('image/jpeg');
      expect(
        Number(request.headers['content-length']),
        'uploaded image size'
      ).to.be.lessThan(FIVE_MB);
    });

    checkTag();
    cy.get(GUIDELINES_TEXTAREA).type('Cypress Test');

    nextPageOrSubmit();

    cy.wait('@resourceSubmitRequest')
      .its('request.body')
      .then(body => {
        expect(body.images).to.deep.equal([UPLOADED_IMAGE_KEY]);
      });

    expectFormWasSubmitted();
  });
});
