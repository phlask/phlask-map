// This function cleans up properties from marker objects passed to Redux
// This is done to prevent large and unused properties from overloading state
export const cleanUpForRedux = (markerObject) => {
    const {map, google, onClick: _, ...cleanedObject} = markerObject;
    return cleanedObject
}