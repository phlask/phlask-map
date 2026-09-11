const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 2048;
const MIN_IMAGE_DIMENSION = 640;
const RESIZE_FACTOR = 0.75;
const QUALITY_STEPS = [0.9, 0.8, 0.7, 0.6, 0.5, 0.4];

type CompressImageOptions = {
  maxBytes?: number;
  maxDimension?: number;
};

const decodeImage = async (
  file: File
): Promise<ImageBitmap | HTMLImageElement> => {
  if (typeof createImageBitmap === 'function') {
    const orientedBitmap = await createImageBitmap(file, {
      imageOrientation: 'from-image'
    }).catch(() => null);
    if (orientedBitmap) {
      return orientedBitmap;
    }

    const bitmap = await createImageBitmap(file).catch(() => null);
    if (bitmap) {
      return bitmap;
    }
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    const loaded = new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Could not decode image'));
    });
    image.src = objectUrl;
    await loaded;
    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const canvasToBlob = (canvas: HTMLCanvasElement, quality: number) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Could not compress image'));
        }
      },
      'image/jpeg',
      quality
    );
  });

const toJpegFile = (blob: Blob, originalFile: File) => {
  const baseName = originalFile.name.replace(/\.[^.]+$/, '') || 'image';
  return new File([blob], `${baseName}.jpeg`, {
    type: 'image/jpeg',
    lastModified: originalFile.lastModified
  });
};

const compressImage = async (
  file: File,
  {
    maxBytes = MAX_IMAGE_BYTES,
    maxDimension = MAX_IMAGE_DIMENSION
  }: CompressImageOptions = {}
): Promise<File> => {
  const isCompressibleImage =
    file.type.startsWith('image/') && file.type !== 'image/gif';

  if (!isCompressibleImage || file.size <= maxBytes) {
    return file;
  }

  const source = await decodeImage(file);
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      return file;
    }

    const scale = Math.min(
      1,
      maxDimension / Math.max(source.width, source.height)
    );
    let width = Math.max(1, Math.round(source.width * scale));
    let height = Math.max(1, Math.round(source.height * scale));
    let compressed: Blob | null = null;

    while (true) {
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, width, height);
      context.drawImage(source, 0, 0, width, height);

      for (const quality of QUALITY_STEPS) {
        compressed = await canvasToBlob(canvas, quality);
        if (compressed.size <= maxBytes) {
          return toJpegFile(compressed, file);
        }
      }

      if (Math.max(width, height) <= MIN_IMAGE_DIMENSION) {
        break;
      }

      width = Math.max(1, Math.round(width * RESIZE_FACTOR));
      height = Math.max(1, Math.round(height * RESIZE_FACTOR));
    }

    return compressed ? toJpegFile(compressed, file) : file;
  } finally {
    if (typeof ImageBitmap !== 'undefined' && source instanceof ImageBitmap) {
      source.close();
    }
  }
};

export { MAX_IMAGE_BYTES };
export default compressImage;
