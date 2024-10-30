import { createSelector } from 'reselect';

const getAllResources = state => state.filterMarkers.allResources;
const getResourceType = state => state.filterMarkers.resourceType;
const filterTags = state => state.filterMarkers.filterTags;
const filterEntry = state => state.filterMarkers.filterEntry;

//this controls the mapping between values shown in the frontend and values used in the database, keys correspond to frontend and values to the database
const tagMapping = {
  //ENTRY TYPES
  'Open Access': 'OPEN',
  Restricted: 'RESTRICTED',
  Unsure: 'UNSURE',
  //WATER
  //dispenser types
  'Drinking fountain': 'DRINKING_FOUNTAIN',
  'Bottle filler': 'BOTTLE_FILLER',
  Sink: 'SINK',
  'Water cooler': 'WATER_COOLER',
  'Soda machine': 'SODA_MACHINE',
  Vessel: 'VESSEL',
  //features
  'ADA accessible': 'WHEELCHAIR_ACCESSIBLE',
  'Filtered water': 'FILTERED',
  'Vessel needed': 'BYOB',
  'ID required': 'ID_REQUIRED',
  //FOOD
  //food types
  Perishable: 'PERISHABLE',
  'Non-perishable': 'NON_PERISHABLE',
  'Prepared foods and meals': 'PREPARED',
  //distribution types
  'Eat on site': 'EAT_ON_SITE',
  Delivery: 'DELIVERY',
  'Pick up': 'PICKUP',
  //organization types
  Government: 'GOVERNMENT',
  Business: 'BUSINESS',
  'Non-profit': 'NON_PROFIT',
  //FORAGING
  //forage type
  Nut: 'NUT',
  Fruit: 'FRUIT',
  Leaves: 'LEAVES',
  Bark: 'BARK',
  Flowers: 'FLOWERS',
  //features
  Medicinal: 'MEDICINAL',
  'In season': 'IN_SEASON',
  'Community garden': 'COMMUNITY_GARDEN',
  //BATHROOM
  //features
  'Gender neutral': 'GENDER_NEUTRAL',
  'Changing table': 'CHANGING_TABLE',
  'Single occupancy': 'SINGLE_OCCUPANCY',
  'Family bathroom': 'FAMILY',
  'Has water fountain': 'HAS_FOUNTAIN'
};

const propertyMapping = {
  WATER: ['dispenser_type', 'tags'],
  FOOD: ['food_type', 'distribution_type'],
  FORAGE: ['forage_type', 'tags'],
  BATHROOM: ['tags']
};

/**
 * This creates a selector for all resources filtered by the requested filters.
 */
const selectFilteredResource = createSelector(
  [getAllResources, getResourceType, filterTags, filterEntry],
  (allResources, resourceType, tags, entryType) => {
    // First, filter based on resource type
    let filteredResources = [];
    allResources.filter(resource => {
      let isValid = false;
      let isEntryValid = true;
      if (resource.resource_type === resourceType) isValid = true;
      //run through filters
      if (isValid) {
        //logic for entry types
        if (entryType) {
          if (resource.entry_type != tagMapping[entryType])
            isEntryValid = false;
        }
        const resourceTypeFormatted = resource.resource_type.toLowerCase();
        //logic for other filters
        tags.forEach(tag => {
          const tagFormatted = tagMapping[tag];
          //check to make sure resource has property with filter info
          if (resourceTypeFormatted in resource) {
            let tagFound = false;
            //loop through filter info types to find filter value
            propertyMapping[resourceType].forEach(prop => {
              if (prop in resource[resourceTypeFormatted]) {
                if (
                  resource[resourceTypeFormatted][prop].includes(tagFormatted)
                )
                  tagFound = true;
              }
            });
            if (!tagFound) isValid = false;
          } else if (!(resourceTypeFormatted in resource)) isValid = false;
        });
      }
      //return resource if it matches resource type and entry type filters
      if (isValid && isEntryValid) filteredResources.push(resource);
    });
    return filteredResources;
  }
);

export default selectFilteredResource;
