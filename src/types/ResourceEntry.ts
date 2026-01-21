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

/** A data source defining where the resource data entry came from */
type DataSource = {
  /** type The type of data source */
  type: 'MANUAL' | 'WEB_SCRAPE';
  /** If available, the URL where this data came from */
  url?: string;
};

/** Details for verification status. */
export type Verification = {
  /** Whether or not this resource is currently verified. */
  verified: boolean;
  /** The latest date this resource had a verification change. */
  last_modified: Date | string;
  /** Who most recently changes the verification state of this resource. */
  verifier: string;
};

export type GooglePlacesTimePoint = {
  /** The date for this time. */
  date: Date;
  /** Whether or not this time is truncated. */
  truncated: boolean;
  /** The day of the week for this time. */
  day: number;
  /** The hour for this time. */
  hour: number;
  /** The minute for this time. */
  minute: number;
};

/** A period of time for a place's hours. */
type GooglePlacesPeriod = {
  /** The closing time for this period. */
  close: GooglePlacesTimePoint;
  /** The opening time for this period. */
  open: GooglePlacesTimePoint;
};

export type WaterDispenserType =
  | 'DRINKING_FOUNTAIN'
  | 'BOTTLE_FILLER'
  | 'SINK'
  | 'JUG'
  | 'SODA_MACHINE'
  | 'VESSEL'
  | 'WATER_COOLER';

export type WaterTag =
  | 'WHEELCHAIR_ACCESSIBLE'
  | 'FILTERED'
  | 'BYOB'
  | 'ID_REQUIRED';

/** Details for a WATER resource. */
export type WaterInfo = {
  dispenser_type: WaterDispenserType[];
  tags: WaterTag[];
};

export type FoodType = 'PERISHABLE' | 'NON_PERISHABLE' | 'PREPARED';

export type FoodDistributionType = 'EAT_ON_SITE' | 'DELIVERY' | 'PICKUP';

export type FoodOrganizationType =
  | 'GOVERNMENT'
  | 'BUSINESS'
  | 'NON_PROFIT'
  | 'UNSURE';

/** Details for a FOOD resource. */
export type FoodInfo = {
  food_type: FoodType[];
  distribution_type: FoodDistributionType[];
  organization_type: FoodOrganizationType;
  organization_name?: string;
  organization_url: string;
  tags: string[];
};

export type ForageType = 'NUT' | 'FRUIT' | 'LEAVES' | 'BARK' | 'FLOWERS';

export type ForageTag = 'MEDICINAL' | 'IN_SEASON' | 'COMMUNITY_GARDEN';

/** Details for a FORAGE resource. */
export type ForageInfo = {
  forage_type: ForageType[];
  tags: ForageTag[];
};

export type BathroomTag =
  | 'WHEELCHAIR_ACCESSIBLE'
  | 'GENDER_NEUTRAL'
  | 'CHANGING_TABLE'
  | 'SINGLE_OCCUPANCY'
  | 'HAS_FOUNTAIN'
  | 'FAMILY';

/** Details for a BATHROOM resource. */
export type BathroomInfo = {
  tags: BathroomTag[];
};

export type ResourceEntryType = 'OPEN' | 'RESTRICTED' | 'UNSURE';

type ResourceType = 'WATER' | 'FOOD' | 'FORAGE' | 'BATHROOM';

export type ResourceStatus =
  | 'OPERATIONAL'
  | 'TEMPORARILY_CLOSED'
  | 'PERMANENTLY_CLOSED'
  | 'HIDDEN';

/** An organization or entity that provided/contributed this resource. */
export type Provider = {
  /** The name of the provider organization. */
  name: string;
  /** Optional URL to the provider's logo image. */
  logo_url?: string;
  /** Optional URL to the provider's website. */
  url?: string;
};

export type ResourceEntry = {
  id?: string;
  /** Represents the schema that this resource entry is following. */
  version?: number;
  /** The date this resource was created, in ISO UTC format. */
  date_created: string;
  /** Who created this resource. */
  creator: string;
  /** The date this resource was last modified, in ISO UTC format. */
  last_modified: string;
  /** Who last modified this resource. */
  last_modifier: string;
  /** Where this resource data came from. */
  source: DataSource;
  /** The verification details of this resource. */
  verification: Verification;
  /** The type of resource. */
  resource_type: ResourceType;
  /** The street address of the resource (not including city, state, or zip). May include the secondary address. */
  address?: string | null;
  /** The city of the resource. */
  city?: string | null;
  /** The 2-letter abbreviation for the state of the resource. */
  state?: string | null;
  /** The zip code of the resource. */
  zip_code?: string | null;
  /** The latitude of the resource. */
  latitude: number;
  /** The longitude of the resource. */
  longitude: number;
  /** The Google Places ID of the resource. */
  gp_id?: string | null;
  /** A list of S3 keys for images showing this resource. */
  images: string[];
  /** Any additional community guidelines or rules for this resource. */
  guidelines?: string | null;
  /** A description of the resource. */
  description?: string | null;
  /** A non-address name for this location, such as the business name or park name. */
  name?: string | null;
  /** The current status of this resource. */
  status: ResourceStatus;
  /** What entry permissions are required for this resource. */
  entry_type?: ResourceEntryType | null;
  /** The hours of operation for this resource, if available. */
  hours?: GooglePlacesPeriod[] | null;
  /** If the resource_type is WATER, the information about the water resource. */
  water?: WaterInfo | null;
  /** If the resource_type is FOOD, the information about the food resource. */
  food?: FoodInfo | null;
  /** If the resource_type is FORAGE, the information about the foraging resource. */
  forage?: ForageInfo | null;
  /**  If the resource_type is BATHROOM, the information about the bathroom resource. */
  bathroom?: BathroomInfo | null;
  /** Organizations or entities that provided/contributed this resource. */
  providers?: Provider[] | null;
};
