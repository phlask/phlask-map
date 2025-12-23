type Coordinates = [number, number];

type WayPoints = [number, number];

type BBox = [number, number, number, number];

type SegmentStep = {
  distance: number;
  duration: number;
  type: number;
  instruction: string;
  name: string;
  way_points: WayPoints;
};

type FeaturePropertiesSegment = {
  distance: string;
  duration: string;
  steps: SegmentStep[];
};

type FootWalkingDirectionFeaturePropertiesSummary = {
  distance: number;
  duration: number;
};

type FootWalkingDirectionFeatureProperties = {
  segments: FeaturePropertiesSegment[];
  way_points: WayPoints;
  summary: FootWalkingDirectionFeaturePropertiesSummary;
};

type FootWalkingDirectionFeatureGeometry = {
  coordinates: Coordinates[];
  type: string;
};

type FootWalkingDirectionFeature = {
  bbox: BBox;
  type: string;
  properties: FootWalkingDirectionFeatureProperties;
  geometry: FootWalkingDirectionFeatureGeometry;
};

type FootWalkingDirectionMetadataQuery = {
  coordinates: Coordinates[];
  profile: string;
  profileName: string;
  format: string;
};

type FootWalkingDirectionMetadataEngine = {
  version: string;
  build_date: string;
  graph_date: string;
  osm_date: string;
};

type FootWalkingDirectionMetadata = {
  attribution: string;
  service: string;
  timestamp: number;
  query: FootWalkingDirectionMetadataQuery;
  engine: FootWalkingDirectionMetadataEngine;
};

type OpenRouteServiceFootWalkingDirectionResponse = {
  type: string;
  bbox: BBox;
  features: FootWalkingDirectionFeature[];
  metadata: FootWalkingDirectionMetadata;
};
