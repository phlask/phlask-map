import {
  AdvancedMarker,
  Map as GoogleMap,
  useMap
} from '@vis.gl/react-google-maps';
import { usePostHog } from 'posthog-js/react';
import {
  type CSSProperties,
  useState,
  useCallback,
  useRef,
  useEffect
} from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { CITY_HALL_LOCATION } from 'constants/defaults';
import { type ResourceEntry } from 'types/ResourceEntry';
import useSelectedResource from 'hooks/useSelectedResource';
import useActiveSearchLocation from 'hooks/useActiveSearchLocation';
import ResourceMarker from 'components/ResourceMarker/ResourceMarker';
// IMPORT YOUR SUPABASE FETCH FUNCTION HERE
import { getBathroomData } from 'services/db.ts';

const style: CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'relative',
  zIndex: 1,
  touchAction: 'none'
};

const Map = () => {
  const isMobile = useIsMobile();
  const posthog = usePostHog();
  const { setSelectedResource } = useSelectedResource();
  const { activeSearchLocation } = useActiveSearchLocation();
  const map = useMap();

  // --- DATA FETCHING STATE ---
  const [dbData, setDbData] = useState<{
    part1: ResourceEntry[];
    part2: ResourceEntry[];
    part3: ResourceEntry[];
  }>({ part1: [], part2: [], part3: [] });
  const [isLoadingData, setIsLoadingData] = useState(true);

  // --- ANIMATION STATE ---
  const [visibleResources, setVisibleResources] = useState<ResourceEntry[]>([]);
  const [currentPhaseLabel, setCurrentPhaseLabel] =
    useState<string>('Ready to visualize');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoadingData(true);
        const data = await getBathroomData();
        setDbData(data);
      } catch (error) {
        console.error('Error loading water data:', error);
        setCurrentPhaseLabel('Error loading data');
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();

    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  const staggerMarkers = (
    newResources: ResourceEntry[],
    delayBetweenMarkers = 100
  ): Promise<void> => {
    return new Promise(resolve => {
      if (!newResources || newResources.length === 0) {
        resolve();
        return;
      }

      newResources.forEach((resource, index) => {
        const timeout = setTimeout(() => {
          setVisibleResources(prev => [...prev, resource]);
          if (index === newResources.length - 1) {
            resolve();
          }
        }, index * delayBetweenMarkers);
        timeoutsRef.current.push(timeout);
      });
    });
  };

  const playTimelapse = useCallback(async () => {
    if (isPlaying || isLoadingData) return;
    setIsPlaying(true);
    setVisibleResources([]);

    setCurrentPhaseLabel('Part 1: 2024');
    await staggerMarkers(dbData.part1, 100);

    await new Promise(r => setTimeout(r, 1000));

    setCurrentPhaseLabel('Part 2: Summer 2025');
    await staggerMarkers(dbData.part2, 80);

    await new Promise(r => setTimeout(r, 1000));

    setCurrentPhaseLabel('Part 3: Fall 2025 - Jan 2026');
    await staggerMarkers(dbData.part3, 50);

    setTimeout(() => {
      setCurrentPhaseLabel('All Resources Mapped!');
      setIsPlaying(false);
    }, 1500);
  }, [isPlaying, isLoadingData, dbData]);

  const onMarkerClick = (resource: ResourceEntry) => {
    setSelectedResource(resource);
    if (!map) return;
    map.panTo({ lat: resource.latitude, lng: resource.longitude });
    posthog.capture('LocationClicked', {
      resourceType: resource.resource_type,
      name: resource.name,
      address: resource.address
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          backgroundColor: 'white',
          padding: '15px 25px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          minWidth: '250px'
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
          {isLoadingData ? 'Loading Data...' : currentPhaseLabel}
        </h2>
        {!isPlaying && !isLoadingData && (
          <button
            onClick={playTimelapse}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {visibleResources.length > 0 ? 'Replay' : 'Play Timelapse'}
          </button>
        )}
      </div>

      <GoogleMap
        style={style}
        defaultZoom={12}
        zoomControl={!isMobile}
        streetViewControl={false}
        mapTypeControl={false}
        rotateControl={false}
        fullscreenControl={false}
        gestureHandling="greedy"
        defaultCenter={activeSearchLocation || CITY_HALL_LOCATION}
        mapId="DEMO_MAP_ID"
      >
        {visibleResources.map((resource, index) => (
          <ResourceMarker
            key={`${resource.id}-${index}`}
            resource={resource}
            onClick={onMarkerClick}
            data-cy={`marker-${resource.resource_type}-${index}`}
          />
        ))}

        {activeSearchLocation ? (
          <AdvancedMarker position={activeSearchLocation} />
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;
