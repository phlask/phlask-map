// This file defines some types that are used in the application for Resources. Since this is JavaScript, we can't
// actually enforce these types, but we can tag incoming JSON objects with these types to help with type checking.
// You can mark objects as having these types by using the JSDoc syntax. For example:
//
// /**
//  * @type {ResourceEntry}
//  */
// const testResourceEntry = {};
//
// This will tell your IDE that `testResourceEntry` is a `ResourceEntry` object, and you'll get type checking and
// autocompletion for that object.

/**
 * A PHLask resource coming from our backend.
 * @typedef {Object} ResourceEntry
 * @property {number | undefined} version Represents the schema that this resource entry is following.
 * @property {string} date_created The date this resource was created, in ISO UTC format.
 * @property {string} creator Who created this resource.
 * @property {string} last_modified The date this resource was last modified, in ISO UTC format.
 * @property {string} last_modifier Who last modified this resource.
 * @property {DataSource} source Where this resource data came from.
 * @property {boolean} verified Whether or not this resource is currently verified.
 * @property {"WATER" | "FOOD" | "FORAGE" | "BATHROOM"} resource_type The type of resource.
 * @property {string | undefined} address The street address of the resource (not including city, state, or zip). May include the secondary address.
 * @property {string} city The city of the resource.
 * @property {string} state The 2-letter abbreviation for the state of the resource.
 * @property {string} zip_code The zip code of the resource.
 * @property {number} latitude The latitude of the resource.
 * @property {number} longitude The longitude of the resource.
 * @property {string | undefined} gp_id The Google Places ID of the resource.
 * @property {string[]} images A list of S3 keys for images showing this resource.
 * @property {string | undefined} guidelines Any additional community guidelines or rules for this resource.
 * @property {string | undefined} description A description of the resource.
 * @property {string} name A non-address name for this location, such as the business name or park name.
 * @property {"OPERATIONAL" | "TEMPORARILY_CLOSED" | "PERMANENTLY_CLOSED"} status The current status of this resource.
 * @property {"OPEN" | "RESTRICTED" | "UNSURE" | undefined} entry_type What entry permissions are required for this resource.
 * @property {GooglePlacesPeriod[] | undefined} hours The hours of operation for this resource, if available.
 * @property {WaterInfo | undefined} water If the resource_type is WATER, the information about the water resource.
 * @property {FoodInfo | undefined} food If the resource_type is FOOD, the information about the food resource.
 * @property {ForageInfo | undefined} forage If the resource_type is FORAGE, the information about the foraging resource.
 * @property {BathroomInfo | undefined} bathroom If the resource_type is BATHROOM, the information about the bathroom resource.
 */

/**
 * A data source defining where the resource data entry came from.
 * @typedef {Object} DataSource
 * @property {"MANUAL" | "WEB_SCRAPE"} type The type of data source.
 * @property {string | undefined} url If available, the URL where this data came from.
 */

/**
  * A period of time for a place's hours.
 * @typedef {Object} GooglePlacesPeriod
 * @property {GooglePlacesTimePoint} close The closing time for this period.
 * @property {GooglePlacesTimePoint} open The opening time for this period.

/**
 * A time object for a place's hours.
 * @typedef {Object} GooglePlacesTimePoint
 * @property {Date} date The date for this time.
 * @property {boolean} truncated Whether or not this time is truncated.
 * @property {number} day The day of the week for this time.
 * @property {number} hour The hour for this time.
 * @property {number} minute The minute for this time.
 */

/**
 * Details for a WATER resource.
 * @typedef {Object} WaterInfo
 * @property {("DRINKING_FOUNTAIN" | "BOTTLE_FILLER" | "SINK" | "JUG" | "SODA_MACHINE" | "PITCHER" | "WATER_COOLER")[]} dispenser_type The type of water dispenser. Can be empty.
 * @property {("WHEELCHAIR_ACCESSIBLE" | "FILTERED" | "BYOB" | "ID_REQUIRED")[]} tags A list of additional tags regarding this water resource. Can be empty.
 */

/**
 * Details for a FOOD resource.
 * @typedef {Object} FoodInfo
 * @property {("PERISHABLE" | "NON_PERISHABLE" | "PREPARED")[]} food_type The types of food included in this resource. Must have at least one entry.
 * @property {("EAT_ON_SITE" | "DELIVERY" | "PICKUP")[]} distribution_type The permitted ways to access the food. Must have at least one entry.
 * @property {("GOVERNMENT" | "BUSINESS" | "NON_PROFIT" | "UNSURE")[]} organization_type The type of organization providing this food. Must have at least one entry.
 * @property {string | undefined} organization_name If available, the name of the organization providing the resource.
 * @property {string | undefined} organization_url If available, a URL to more information about this food resource.
 */

/**
 * Details for a FORAGE resource.
 * @typedef {Object} ForageInfo
 * @property {("NUT" | "FRUIT" | "LEAVES" | "BARK" | "FLOWERS")[]} forage_type The type of foraging resources this location contains. Must have at least one entry.
 * @property {("MEDICINAL" | "IN_SEASON" | "COMMUNITY_GARDEN")[]} tags A list of additional tags regarding this foraging resource. Can be empty.
 */

/**
 * Details for a BATHROOM resource.
 * @typedef {Object} BathroomInfo
 * @property {("WHEELCHAIR_ACCESSIBLE" | "GENDER_NEUTRAL" | "CHANGING_TABLE" | "SINGLE_OCCUPANCY" | "FAMILY")[]} tags A list of additional tags regarding this bathroom resource. Can be empty.
 */

export const WATER_RESOURCE_TYPE = "WATER";
export const FOOD_RESOURCE_TYPE = "FOOD";
export const FORAGE_RESOURCE_TYPE = "FORAGE";
export const BATHROOM_RESOURCE_TYPE = "BATHROOM";