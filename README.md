# phlask-map

Code behind the PHLASK Web Map

## Project Structure

```
.
├── Dockerfile                         <-- Dockerfile defining container for local dev and deploy
├── README.md
├── _phlask.code-workspace
├── assets
├── contributing.md
├── cypress                            <-- Unit tests
│   ├── fixtures                       <-- Fixtures for mocked out data
│   └── integration                    <-- Source files for unit tests
├── cypress.json
├── docker-compose.yml
├── package-lock.json
├── package.json
├── public
├── src                                <-- Source files for project
│   ├── App.js
│   ├── actions                        <-- Source for all Redux actions
│   ├── components                     <-- Source for all React components
│   ├── firebase                       <-- Source for configurations used to connect to Firebase database
│   ├── helpers                        <-- Helper functions shared across components/pages
│   ├── hooks                          <-- Custom hooks
│   ├── reducers                       <-- Redux reducers
│   ├── selectors                      <-- Source for all Redux selectors
│   └── theme.js                       <-- Theme file for Material UI
├── yarn-error.log
└── yarn.lock
```

## Running Locally

### Docker (Recommended path for consistency across computers)

1.  Download [Docker Desktop](https://www.docker.com/products/docker-desktop)

    - Follow installer instructions provided by Docker

1.  Open up a terminal (Powershell on Windows, Terminal on Mac, bash on Linux, or whatever your preferred terminal is)
1.  Confirm Docker Desktop installed successful: `docker --version`

    Expected output:

    ```
      $ docker --version
      # something similar to below should be printed out
      # older versions of Docker OK
      Docker version 20.10.12, build e91ed57
    ```

1.  Clone this repo: `git clone git@github.com:phlask/phlask-map.git`
1.  Navigate to the root of the cloned repo: `cd phlask-map`
1.  Build the container with docker-compose: `docker-compose build app`.

    Note: this may take awhile. In the past this has taken ~5 minutes. If this step takes longer than 10 minutes, kill the process and try again. Final output should look like this:

    ```
    [+] Building 238.2s (12/12) FINISHED
    ...
    => => writing image sha256:c98c...
    ```

1.  Run the container with docker-compose: `docker-compose up app`

    Note: this may take awhile. Once the application is up, output similar to this should be printed out to the console:

    ```
    Project is running at http://172.21.112.1/
    ...
    Starting the development server...
    ```

1.  Navigate to localhost:3000 on your browser.

### Yarn

1. Ensure you have [nodejs v12.20.0](https://nodejs.org/download/release/v12.20.0/) installed on your machine
1. Ensure you have [Yarn](https://yarnpkg.com/en/) installed on your machine
1. Run `yarn install`
1. Run `yarn start`

## Want to add something new or develop/report a fix for a bug you found?

See our [Contribution Guide](contributing.md) to learn about our branching strategy and issue reporting etiquette, and more!

## Branching strategy

![png](assets/images/phlaskgitPipelines.png)

## Goals

The technical goals for this project are:

- Usability on web and mobile
  - Currently planning on using a Progressive Web App (PWA) approach (via ReactJS) to solve this
- Fast access to useful information about where you can get water nearby
  - Implemented via our Nearest Tap Route

## Architecture

The PHLASK Map runs on a static page built with:

- ReactJS (https://reactjs.org)
  - Builds the static content that composes the map page
- React Bootstrap (https://react-bootstrap.netlify.com)
  - Provides pre-built components with Bootstrap-styling baked-in
- GitHub Actions (https://github.com/features/actions)
  - Runs the required compute to build the site on ReactJS

## Testing

This project uses [Cypress](https://www.cypress.io/) for testing.

### Running Tests

This project has been configed to run all tests in the `cypress/integration` directory. To run these tests:

1. `cd` into the root (top-level) directory of the project
2. ensure that you have all requirements installed with `yarn install` or `npm install`
3. run `npm run test`

#### Testing in Docker

TBD - This has not yet been tested.

### Adding Tests

Please refer to the `cypress.json` file for testing configurations.

Tests follow the convention of being placed in a `<test-file-name>.spec.js` file where `<test-file-name>` is descriptive of the features/functionality the file tests for. Example, `water-tap-viewing.spec.js` tests feature related to viewing taps and the information displayed on the web page.

To add new tests, create a `*.spec.js` file at the top level of `/cypress/integration`.

Refer to `/cypress/integration/example` for the kinds of things cypress can test for -- NOTE the `*.spec.js` files are configured to not run when running `npm run test`.

The site runs on:

- AWS S3 (https://aws.amazon.com/s3/)
  - Stores the static files generated from the ReactJS build which present the map page
- AWS CloudFront (https://aws.amazon.com/cloudfront/)
  - Serves as a global Content Delivery Network (CDN) for the content hosted in S3
  - Enables us to have a custom domain with SSL in order to ensure your traffic to the page is encrypted via HTTPS (https://en.wikipedia.org/wiki/HTTPS)
