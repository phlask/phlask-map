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

### GitHub Codespaces

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/phlask/phlask-map/tree/develop?quickstart=1)

GitHub Codespaces provides you with a remote development environment without needing to install anything locally. You can also connect to your Codespace from VSCode, if desired. A default codespace configuration in the `.devcontainer/devcontainer.json` file has been prepared that will ensure your codespace has everything needed to run PHLASK. Once the codespace has started, you should be able to use the Terminal window in the bottom to run `yarn start`. That will load a local development copy of the PHLASK site for you to test with.

To learn more about Codespaces, review this page: https://github.com/features/codespaces

As of this writing, PHLASK does not fund these codespaces. However, GitHub offers up to 60 hours/month of free use for codespaces. For more details on Codespace pricing, review this page: https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces#monthly-included-storage-and-core-hours-for-personal-accounts

Note that `core hours per month` means each core on your codespace consumes independent hours from your code hour limit. If you choose a 2-core space (sufficient for PHLASK), you use 2 core-hours every hour from the free `core hours per month` allowance.

### Yarn

1. Ensure you have [nodejs v16](https://nodejs.org/download/release/latest-v16.x/) installed on your machine.
   - You can also use use [nvm](https://github.com/nvm-sh/nvm/tree/master#install--update-script).
   - once you have install nvm
   - run `nvm install` <- this will download the required verison (only required on the first installation)
   - run `nvm use` sets that to the active version of node in your terminal
1. Ensure you have [Yarn](https://yarnpkg.com/en/) installed on your machine
1. Run `yarn install`
1. Run `yarn start`

### Docker

1.  Download [Docker Desktop](https://www.docker.com/products/docker-desktop)

    - Follow installer instructions provided by Docker

1.  Open up a terminal (Powershell on Windows, Terminal on Mac, bash on Linux, or whatever your preferred terminal is)
1.  Confirm Docker Desktop installed successful: `docker --version`

    Expected output:

    ```
      $ docker --version
      # something similar to below should be printed out
      # older versions of Docker OK
      Docker version x.y.z, build xxx
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
    Beta site https://beta.phlask.me/
    Project is running at http://172.21.112.1/
    ...
    Starting the development server...
    ```

1.  Navigate to localhost:3000 on your browser.

## Recommended Development Tools

### Code Formatting

We use Prettier to ensure a consistent code formatting across the project, if you are running VSCode, please make sure to install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), the project configuration will ensure that Prettier is set as your default formatter as well.

### Redux State Viewing

During development, you may need to make changes to components which interact with Redux state. If you would like to have a better idea of the values in the Redux state while in development, install the Redux DevTools using the instructions here: https://github.com/reduxjs/redux-devtools/tree/main/extension#installation

For a guide on how to use the extension check the [Docs section of their documentation](https://github.com/reduxjs/redux-devtools/tree/main/extension#docs). This video in particular may be useful: https://egghead.io/lessons/javascript-getting-started-with-redux-dev-tools

For more information on how to understand/use the PHLASK Map Redux state, see our [Redux Guide](redux_guide.md)

### Storybook

We use Storybook for documentation and testing of the PHLask components and design system.

You can run `yarn storybook` in order to access it.

We highly recommend for any new collaborators to access Storybook in order to get more familiar with our components and how to use them.

## Want to add something new or develop/report a fix for a bug you found?

See our [Contribution Guide](contributing.md) to learn about our branching strategy and issue reporting etiquette, and more!

## Branching Strategy

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
- Redux (https://redux.js.org/)
  - Provides a single state which is accessible across the application.
  - This is used to simplify passing state properties when they need to be modified by child/sibling components.
  - For more information on how to understand/use our Redux state, see our [Redux Guide](redux_guide.md)
- Material UI (https://mui.com/)
  - Provides pre-built components and simplifies consistent styling across the project
- React Bootstrap (https://react-bootstrap.netlify.com)
  - Provides pre-built components with Bootstrap-styling baked-in
  - NOTE: This is currently on-track for deprecation in our project in favor of Material UI
- GitHub Actions (https://github.com/features/actions)
  - Runs the required compute to build the site on ReactJS
- Storybook (https://storybook.js.org/)
  - Enables developers to see standalone versions of the components used throughout this site

## Testing

This project uses [Cypress](https://www.cypress.io/) for testing.

### Running Tests

This project has been configed to run all tests in the `cypress/integration` directory. To run these tests:

1. `cd` into the root (top-level) directory of the project
2. ensure that you have all requirements installed with `yarn install` or `npm install`
3. run `yarn test`

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
- Google Firebase Realtime Database (https://firebase.google.com/docs/database)
  - Stores the tap data used to generate the information on our site
