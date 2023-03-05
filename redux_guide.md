# Redux Guide
## Purpose
The purpose of this guide is to instruct developers of the PHLASK Map project on how to interact with the Redux state used throughout the site. A deep understanding of how Redux generally works is out of scope for this document, as that has been covered by the wider dev community.

## Why Redux?
The main is Redux was chosen very early on (2019) into our transition to React was to simplify passing state properties when they need to be modified by child/sibling components. The team's understanding of React was immature at the time, but we were struggling with the idea of passing properties. We had a lot of unrelated components that interact with all of the tap data, and we want the tap data to be stored locally in order to minimize the amount of pulls from Firebase. Storing the tap data in Redux state allowed us to pass references to the taps via their IDs and then pull any additional data by interacting with the central Redux state.

## How is the Redux state used?
### Initialization
In order to start up the state, we call the `store` function in `index.js` as a property of the `Provider` component. This exposes the state to everything contained under that Provider component. Since it is the top-level component for the site, it is available to all components.

### Initial State
The initial state is defined in `store.js`. This file defines:
- Use of Redux Thunk to enable async interactions with Redux state: https://github.com/reduxjs/redux-thunk
- Use of `reducers/filterMarkers.js` as the definition of the state structure.
    - `initialState` - Defines the properties for the Redux state
    - `case actions.ACTION_NAME` - Defines the different actions available to interact with the state and how they behave when invoked.
    - For more information about reducers, read: https://redux.js.org/tutorials/essentials/part-1-overview-concepts#reducers

### Manipulating the state
The `actions/actions.js` file defines the actions that can be performed by components to manipulate the state. For more information about actions, read: https://redux.js.org/tutorials/essentials/part-1-overview-concepts#actions

Actions are referenced in components via two different approaches, depending on how the component is built:
#### Functional Components
For an example of how class based components interact with Redux state, check `components/Head/Head.js`.
- `const dispatch = useDispatch();` is added to the function in order to enable the use of Redux dispatches. These are the functions from `actions/actions.js` which can be triggered to manipulate state.
    - For information about Redux dispatches, see: https://redux.js.org/tutorials/essentials/part-1-overview-concepts#dispatch
    - This is used within the functional component by calling the `dispatch` function with the following properties
        - `type` - The type value defined in `actions/actions.js`
        - `property_name` - Additional properties defined for the action with the `type` property with value of `type`.
- `const property_name = useSelector(state => state.redux_state_property)` is used to reference Redux state.

#### Class Based Components
**NOTE:** We are gradually deprecating this approach in favor of functional components. This subsection is included while the deprecation is underway.
For an example of how class based components interact with Redux state, check `components/SearchBar/SearchBar.js`.
- A top-level `const mapStateToProps` is defined to map Redux state properties to properties that should be set in the component.
    - To interact with these proprties within the component class, use `this.props.property_name`
- A top-level `const mapDispatchToProps` is defined to map Redux dispatches. These are the functions from `actions/actions.js` which can be triggered to manipulate state.
    - For information about Redux dispatches, see: https://redux.js.org/tutorials/essentials/part-1-overview-concepts#dispatch
    - These functions should be imported using standard javascript imports.
    - To interact with dispatches within the component class, use `this.props.function_name`
- A top-level export of the component is arranged such that it uses the `connect()` redux function to connect the component class to the Redux state store.
