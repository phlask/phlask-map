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
import { getBathroomData } from 'services/db.ts';

const style: CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'relative',
  zIndex: 1,
  touchAction: 'none'
};

const TIMELINE_PHASES = ['2024', 'Summer 2025', 'Fall 2025 - Jan 2026'];

const Map = () => {
  const isMobile = useIsMobile();
  const posthog = usePostHog();
  const { setSelectedResource } = useSelectedResource();
  const { activeSearchLocation } = useActiveSearchLocation();
  const map = useMap();

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

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(-1);
  const [timelineProgressPercentage, setTimelineProgressPercentage] =
    useState<number>(0); // NEW: Granular progress
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

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

  // NEW: Added an onProgress callback so the timeline moves with every single marker
  const staggerMarkers = (
    newResources: ResourceEntry[],
    delayBetweenMarkers = 100,
    onProgress: (phaseCompletionPercentage: number) => void
  ): Promise<void> => {
    return new Promise(resolve => {
      if (!newResources || newResources.length === 0) {
        resolve();
        return;
      }

      newResources.forEach((resource, index) => {
        const timeout = setTimeout(() => {
          setVisibleResources(prev => [...prev, resource]);

          // Report progress from 0.0 to 1.0 for this specific phase
          onProgress((index + 1) / newResources.length);

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
    setTimelineProgressPercentage(0);

    const segmentWidth = 100 / TIMELINE_PHASES.length; // Each phase takes up 33.33% of the bar

    // Phase 1
    setCurrentPhaseIndex(0);
    setCurrentPhaseLabel(TIMELINE_PHASES[0]);
    await staggerMarkers(dbData.part1, 100, p => {
      setTimelineProgressPercentage(0 * segmentWidth + p * segmentWidth);
    });

    await new Promise(r => setTimeout(r, 800));

    // Phase 2
    setCurrentPhaseIndex(1);
    setCurrentPhaseLabel(TIMELINE_PHASES[1]);
    await staggerMarkers(dbData.part2, 80, p => {
      setTimelineProgressPercentage(1 * segmentWidth + p * segmentWidth);
    });

    await new Promise(r => setTimeout(r, 800));

    // Phase 3
    setCurrentPhaseIndex(2);
    setCurrentPhaseLabel(TIMELINE_PHASES[2]);
    await staggerMarkers(dbData.part3, 50, p => {
      setTimelineProgressPercentage(2 * segmentWidth + p * segmentWidth);
    });

    setTimeout(() => {
      setCurrentPhaseIndex(3);
      setCurrentPhaseLabel('Resources Mapped!');
      setTimelineProgressPercentage(100);
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
          padding: '20px 30px',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          minWidth: '320px'
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          {isLoadingData ? 'Loading Data...' : currentPhaseLabel}
        </h2>

        {/* TIMELINE UI */}
        <div
          style={{
            position: 'relative',
            height: '24px',
            margin: '5px 10px',
            zIndex: 1
          }}
        >
          {/* Background Track */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '4px',
              backgroundColor: '#e0e0e0',
              transform: 'translateY(-50%)',
              zIndex: -2,
              borderRadius: '2px'
            }}
          />

          {/* Active Progress Track */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              width: `${timelineProgressPercentage}%`,
              height: '4px',
              backgroundColor: '#007BFF',
              transform: 'translateY(-50%)',
              zIndex: -1,
              transition: 'width 0.15s linear',
              borderRadius: '2px'
            }}
          />

          {/* Timeline Nodes */}
          {TIMELINE_PHASES.map((phase, index) => {
            const isActive = currentPhaseIndex >= index;
            // Place nodes exactly where the phase segments begin (0%, 33.3%, 66.6%)
            const leftPos = `${index * (100 / TIMELINE_PHASES.length)}%`;

            return (
              <div
                key={phase}
                title={phase}
                style={{
                  position: 'absolute',
                  left: leftPos,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#007BFF' : '#e0e0e0',
                  border: '3px solid white',
                  transition: 'background-color 0.3s ease-in-out',
                  boxShadow: isActive
                    ? '0 0 0 2px rgba(0, 123, 255, 0.2)'
                    : 'none'
                }}
              />
            );
          })}

          {/* Final "Complete" Node at 100% */}
          <div
            title="Complete"
            style={{
              position: 'absolute',
              left: '100%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: currentPhaseIndex >= 3 ? '#007BFF' : '#e0e0e0',
              border: '3px solid white',
              transition: 'background-color 0.3s ease-in-out',
              boxShadow:
                currentPhaseIndex >= 3
                  ? '0 0 0 2px rgba(0, 123, 255, 0.2)'
                  : 'none'
            }}
          />
        </div>

        {!isPlaying && !isLoadingData && (
          <button
            onClick={playTimelapse}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s',
              marginTop: '5px'
            }}
            onMouseOver={e =>
              (e.currentTarget.style.backgroundColor = '#0056b3')
            }
            onMouseOut={e =>
              (e.currentTarget.style.backgroundColor = '#007BFF')
            }
          >
            {visibleResources.length > 0 ? 'Replay Timeline' : 'Play Timelapse'}
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
        mapId="f0d6405d2136c67be3edaf26"
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
