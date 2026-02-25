qx# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PHLASK is a web application that helps users find free community resources in Philadelphia: water fountains, food banks, foraging sites, and public bathrooms. It's a Progressive Web App built with React and uses Google Maps for the interactive map interface.

## Common Commands

```bash
# Development
yarn install          # Install dependencies
yarn start            # Start dev server at localhost:5173
yarn start:cypress    # Start dev server with Cypress test mode enabled

# Testing
yarn test             # Generate test data and run all desktop Cypress tests
yarn test:mobile      # Run mobile Cypress tests (375x667 viewport)
yarn cypress          # Open Cypress interactive test runner

# Code Quality
yarn lint             # Run ESLint on all JS/JSX/TS/TSX files
yarn format           # Format src files with Prettier

# Build & Tools
yarn build            # Production build
yarn storybook        # Run Storybook on port 6006
yarn generate-icons   # Convert SVGs in src/assets/icons to React components

# Database
node scripts/fetch-supabase.js <table> [options]  # Fetch entries from Supabase
```

### Fetching Supabase Data

Use the fetch script to query Supabase tables directly:

```bash
# Basic usage - fetch from a table
node scripts/fetch-supabase.js resources

# Fetch with options
node scripts/fetch-supabase.js contact_submissions --pretty --order created_at --limit 10

# Options:
#   --limit, -l   Number of entries to fetch (default: 100)
#   --order, -o   Column to order by (descending, most recent first)
#   --pretty, -p  Pretty print JSON output
#   --help, -h    Show help message
```

Known tables: `resources`, `contributors`, `contact_submissions`

## Architecture

### State Management (Redux)

The app uses Redux Toolkit for state management. Key files:
- `src/store.ts` - Store configuration using `configureStore`
- `src/reducers/filterMarkers.js` - Main reducer containing all app state
- `src/actions/actions.js` - Action creators and action type constants
- `src/selectors/resourceSelectors.js` - Memoized selectors using Reselect for filtering resources

Redux state is initialized in `src/App.tsx` via the `Provider` component, making it available app-wide.

### Resource Types

Four resource types defined in `src/types/ResourceEntry.js`:
- `WATER` - Water fountains, bottle fillers, water coolers
- `FOOD` - Food banks, prepared meals, distribution sites
- `FORAGE` - Foraging locations (nuts, fruits, leaves, etc.)
- `BATHROOM` - Public restrooms

Each resource has type-specific info (e.g., `WaterInfo`, `FoodInfo`) and common fields (address, coordinates, hours, verification status).

### Component Organization

- `src/components/Head/` - Main header component, entry point for toolbar and modals
- `src/components/ReactGoogleMaps/` - Google Maps integration using `@vis.gl/react-google-maps`
- `src/components/Toolbar/` - Desktop and mobile toolbar variants
- `src/components/AddResourceModal/` - Multi-step forms for adding resources (water, food, foraging, bathroom)
- `src/components/SelectedTap/` - Resource detail view when a map marker is selected
- `src/components/Filter/` - Resource filtering UI
- `src/components/SearchBar/` - Location search with Google Places Autocomplete

### Backend

Uses Supabase (PostgreSQL) for data storage. Resources are fetched via `actions.getResources` async thunk and stored in `state.filterMarkers.allResources`.

### Testing Structure

Cypress tests are split by viewport:
- `cypress/e2e/desktop/` - Desktop tests (default config)
- `cypress/e2e/mobile/` - Mobile tests (iPhone viewport, `cypress.mobile.config.mjs`)

Test data is generated before each run via `cypress/testDataGenerator.js`.

## Key Patterns

**Functional components with hooks** are preferred over class components. Use `useDispatch()` for actions and `useSelector()` for state access.

**Filter system**: Tags map frontend labels to database values in `src/selectors/resourceSelectors.js`. The `selectFilteredResource` selector handles filtering by resource type and active filter tags.

**Responsive design**: Many components have desktop/mobile variants (e.g., `DesktopToolbar.jsx` / `MobileToolbar.jsx`).

## Dev Loop

When working on features or fixes, follow this loop:

### 1. Start Dev Server
```bash
yarn start  # Run in background, serves at localhost:5173 with hot reload
```

### 2. Develop & Monitor
- Make code changes - Vite hot reloads automatically
- Monitor terminal output for build errors/warnings
- Check browser console for frontend JS errors

### 3. Visual Testing (Chrome MCP)
- Navigate to localhost:5173 when ready to inspect
- Take screenshots to verify UI changes
- Test interactions (clicks, form inputs, navigation)
- Check console logs for runtime errors

### 4. Automated Testing
```bash
yarn test         # Desktop Cypress tests
yarn test:mobile  # Mobile Cypress tests
```
Write new tests in `cypress/e2e/desktop/` or `cypress/e2e/mobile/` focused on the feature being developed.

### 5. Create PR
```bash
git checkout -b feature/description
git add . && git commit
git push -u origin feature/description
gh pr create --base develop
```

### 6. Verify Preview
- PR triggers deploy to https://test.phlask.me/ (~5 minutes)
- Visually verify the deployed preview before merging

### 7. Check CI Results
After pushing, monitor GitHub Actions CI results:
```bash
# List recent workflow runs for the repo
gh run list --limit 5

# Check status of runs for current branch
gh run list --branch $(git branch --show-current) --limit 5

# View details of a specific run (get run ID from list command)
gh run view <run-id>

# View only failed logs from a run
gh run view <run-id> --log-failed

# Watch a run in progress until completion
gh run watch <run-id>
```

If CI fails:
1. Review failed logs with `gh run view <run-id> --log-failed`
2. Fix the issues locally
3. Run relevant tests locally (`yarn test` or `yarn test:mobile`)
4. Commit and push the fix
5. Monitor the new CI run with `gh run watch`
