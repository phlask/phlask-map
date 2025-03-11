// Primary Goal: Test each tap in without incurring heavy use of the Maps API, such as loading dynamic maps multiple times

// - Builds a queue of all RESOURCE_TYPE locations
// - While the queue is not empty, pulls an item from the queue and tests clicking it
// - If the site crashes, records the tap that crashed, reloads the site, and continues looping

const RESOURCE_TYPE = "BATHROOM"

let exception_ocurred = false;
let exception_message = "";

// For each resource type, test each site detail permutation and confirm only the expected number of taps appear.
describe('site info', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it(`should tap through all ${RESOURCE_TYPE} sites`, () => {
    let test_target_queue = [5, 4, 3, 2, 1];
    let test_target_failures = [];

    cy.on('uncaught:exception', (err, runnable) => {
      exception_message = err.message;
      exception_ocurred = true;
      return false;
    })

    const testLocation = () => {
      const target_location_id = test_target_queue.pop()
      cy.task('log', `Testing ${target_location_id}`)
      cy.get(`[title=data-cy-${target_location_id}]`).click({ force: true, timeout: 8000 }).then(() => {
        cy.task('log', `Tested location ${target_location_id}`)
        if (!exception_ocurred) {
          cy.get('[data-cy=close-selected-tap] > button').click()
        }
        else {
          cy.task('log', `An error ocurred when loading location ${target_location_id}: ${exception_message}`)
          test_target_failures.push(target_location_id)
          cy.reload()
          cy.switchResourceType(RESOURCE_TYPE)
          cy.zoomMapOutMax()
        }
        if (test_target_queue.length == 0) {
          cy.task('log', `Errors ocurred when loading the following ${test_target_failures.length} locations: ${test_target_failures}`)

          if (test_target_failures.length > 0) {
            throw new Error(`Errors ocurred when loading the following locations: ${test_target_failures}`)
          }
          return
        }
        exception_ocurred = false
        exception_message = "";

        cy.wait(2000, { log: false })
        testLocation()
      })
    }

    cy.switchResourceType(RESOURCE_TYPE)
    cy.zoomMapOutMax()

    cy.task('getResources').then((resources) => {
      let water_resources = resources.filter((resource) => resource['resource_type'] === RESOURCE_TYPE)
      test_target_queue = [...Array(water_resources.length).keys()]
      cy.task('log', `test_target_queue: ${test_target_queue}`)

      // For targeted debugging
      // test_target_queue = [106, 107, 108, 109, 110];

      exception_ocurred = false;
      exception_message = "";
      testLocation()
    })
  });
}
);
