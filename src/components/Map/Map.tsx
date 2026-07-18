import {
  AdvancedMarker,
  Map as GoogleMap,
  useMap
} from '@vis.gl/react-google-maps';
import { usePostHog } from 'posthog-js/react';
import {
  type CSSProperties,
  useState,
  useMemo,
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

const STEP_DELAY = 90;

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


  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoadingData(true);
        const data = await getBathroomData();
        setDbData(data);
      } catch (error) {
        console.error('Error loading water data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  }, []);


  const flatResources = useMemo(() => {
    const parts = [dbData.part1, dbData.part2, dbData.part3];
    const flat: { resource: ResourceEntry; phaseIndex: number }[] = [];
    parts.forEach((part, phaseIndex) => {
      part.forEach(resource => flat.push({ resource, phaseIndex }));
    });
    return flat;
  }, [dbData]);

  const totalSteps = flatResources.length;

  const phaseEndSteps = useMemo(() => {
    const c1 = dbData.part1.length;
    const c2 = c1 + dbData.part2.length;
    const c3 = c2 + dbData.part3.length;
    return [c1, c2, c3];
  }, [dbData]);

  const visibleResources = useMemo(
    () => flatResources.slice(0, currentStep).map(f => f.resource),
    [flatResources, currentStep]
  );

  const activePhaseIndex = useMemo(() => {
    if (currentStep <= 0) return -1;
    if (currentStep <= phaseEndSteps[0]) return 0;
    if (currentStep <= phaseEndSteps[1]) return 1;
    return 2;
  }, [currentStep, phaseEndSteps]);

  const isComplete = totalSteps > 0 && currentStep >= totalSteps;

  const progressPercentage = useMemo(() => {
    if (totalSteps === 0 || currentStep <= 0) return 0;
    const segment = 100 / TIMELINE_PHASES.length;
    for (let i = 0; i < TIMELINE_PHASES.length; i++) {
      const start = dotSteps[i];
      const end = dotSteps[i + 1];
      if (currentStep <= end) {
        const span = end - start;
        const withinPhase = span > 0 ? (currentStep - start) / span : 1;
        return i * segment + withinPhase * segment;
      }
    }
    return 100;
  }, [currentStep, totalSteps, dotSteps]);

 
  useEffect(() => {
    if (!isPlaying || currentStep >= totalSteps) return;
    const timeout = setTimeout(() => {
      setCurrentStep(s => {
        const next = s + 1;
        if (next >= totalSteps) setIsPlaying(false);
        return next;
      });
    }, STEP_DELAY);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, totalSteps]);

  const handlePlayPause = () => {
    if (isLoadingData || totalSteps === 0) return;
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (currentStep >= totalSteps) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const seekToStep = (step: number) => {
    setIsPlaying(false);
    setCurrentStep(step);
  };

  const displayLabel = useMemo(() => {
    if (isLoadingData) return 'Loading Data...';
    if (currentStep === 0) return 'Ready to visualize';
    if (isComplete) return 'Complete';
    return TIMELINE_PHASES[activePhaseIndex] ?? '';
  }, [isLoadingData, currentStep, isComplete, activePhaseIndex]);

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

  const chipStyle = (active: boolean): CSSProperties => ({
    padding: '5px 10px',
    fontSize: '0.78rem',
    fontWeight: 600,
    borderRadius: '999px',
    border: active ? '1px solid #007BFF' : '1px solid #d0d5dd',
    backgroundColor: active ? '#007BFF' : 'white',
    color: active ? 'white' : '#60718C',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.15s ease'
  });

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? '16px' : '24px',
          left: isMobile ? '12px' : '24px',
          right: isMobile ? '12px' : 'auto',
          zIndex: 10,
          backgroundColor: 'white',
          padding: '16px 18px',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: isMobile ? 'auto' : '340px',
          maxWidth: '92vw'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '8px'
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            {displayLabel}
          </h2>
          {!isLoadingData && (
            <p
              style={{
                margin: 0,
                fontSize: '0.9rem',
                color: '#60718C',
                whiteSpace: 'nowrap'
              }}
            >
              Mapped: <strong>{visibleResources.length}</strong>
            </p>
          )}
        </div>

        {/* TIMELINE UI */}
        <div
          style={{
            position: 'relative',
            height: '24px',
            margin: '2px 8px',
            zIndex: 1
          }}
        >
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
              width: `${progressPercentage}%`,
              height: '4px',
              backgroundColor: '#007BFF',
              transform: 'translateY(-50%)',
              zIndex: -1,
              transition: 'width 0.15s linear',
              borderRadius: '2px'
            }}
          />

          {dotSteps.map((step, index) => {
            const isActive = currentStep > 0 && currentStep >= step;
            const leftPos = `${index * (100 / TIMELINE_PHASES.length)}%`;
            const label =
              index === 0 ? 'Start' : `End of ${TIMELINE_PHASES[index - 1]}`;

            return (
              <div
                key={label}
                title={`Jump to ${label}`}
                onClick={() => seekToStep(step)}
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
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease-in-out',
                  boxShadow: isActive
                    ? '0 0 0 2px rgba(0, 123, 255, 0.2)'
                    : 'none'
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            justifyContent: 'center'
          }}
        >
          {TIMELINE_PHASES.map((phase, index) => (
            <button
              key={phase}
              onClick={() => seekToStep(phaseEndSteps[index])}
              disabled={isLoadingData || totalSteps === 0}
              style={chipStyle(currentStep > 0 && activePhaseIndex === index)}
            >
              {phase}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handlePlayPause}
            disabled={isLoadingData || totalSteps === 0}
            style={{
              flex: 1,
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e =>
              (e.currentTarget.style.backgroundColor = '#0056b3')
            }
            onMouseOut={e =>
              (e.currentTarget.style.backgroundColor = '#007BFF')
            }
          >
            {isPlaying
              ? 'Pause'
              : isComplete
                ? 'Replay'
                : currentStep > 0
                  ? 'Resume'
                  : 'Play Timelapse'}
          </button>
          {currentStep > 0 && !isPlaying && (
            <button
              onClick={() => seekToStep(0)}
              disabled={isLoadingData}
              style={{
                padding: '10px 16px',
                backgroundColor: 'white',
                color: '#60718C',
                border: '1px solid #d0d5dd',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
            >
              Reset
            </button>
          )}
        </div>
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
