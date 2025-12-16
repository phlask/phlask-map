import { Box, Button, SwipeableDrawer } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import React, { useState } from 'react';
import selectFilteredResource from 'selectors/resourceSelectors';
import {
  removeEntryFilterFunction,
  removeFilterFunction,
  resetFilterFunction,
  setEntryFilterFunction,
  setFilterFunction,
  setToolbarModal,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE,
  type ResourceType
} from 'actions/actions';
import noop from 'utils/noop';
import styles from './Filter.module.scss';
import useAppSelector from 'hooks/useSelector';
import filters from 'fixtures/filters';
import useAppDispatch from 'hooks/useDispatch';

type ActiveFilterTagState = {
  [key: string]: (boolean[] | number)[];
};

type FilterTagsProps = {
  tags: string[];
  activeTags: ActiveFilterTagState;
  resourceType: ResourceType;
  index: number;
  handleTag: (
    type: number,
    resourceType: ResourceType,
    filterTag: string,
    index: number,
    key: number
  ) => void;
};

const FilterTags = ({
  tags,
  activeTags,
  resourceType,
  index,
  handleTag
}: FilterTagsProps) => (
  <Box className={styles.filterTags}>
    {tags.map((tag, key) => (
      <Box
        key={tag}
        className={
          styles.filterTag +
          // @ts-expect-error Change filter to be powered by query params
          (activeTags[resourceType][index][key]
            ? ` ${styles.filterTagSelected}`
            : '')
        }
        onClick={() => {
          handleTag(0, resourceType, tag, index, key);
        }}
        data-cy={`filter-option-${tag}`}
      >
        <p>{tag}</p>
      </Box>
    ))}
  </Box>
);

const FilterTagsExclusive = ({
  tags,
  activeTags,
  resourceType,
  index,
  handleTag
}: FilterTagsProps) => (
  <Box className={styles.filterTagsExclusive}>
    {tags.map((tag, key) => (
      <Box
        key={tag}
        className={
          styles.filterTagExclusive +
          (activeTags[resourceType][index] === key
            ? ` ${styles.filterTagSelected}`
            : '')
        }
        onClick={() => {
          handleTag(1, resourceType, tag, index, key);
        }}
        data-cy={`filter-option-${tag}`}
      >
        <p>{tag}</p>
      </Box>
    ))}
  </Box>
);

const noActiveFilterTags = Object.entries(filters).reduce<{
  [key: string]: (boolean[] | number)[];
}>(
  (prev, [key, value]) => ({
    ...prev,
    [key]: value.categories.map(category => {
      if (category.type === 0) {
        return new Array(category.tags.length).fill(false);
      }
      return category.tags.length;
    })
  }),
  {}
);

const Filter = () => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const [activeFilterTags, setActiveFilterTags] =
    useState<ActiveFilterTagState>(noActiveFilterTags);

  const resourceType = useAppSelector(
    state => state.filterMarkers.resourceType
  );

  const toolbarModal = useAppSelector(
    state => state.filterMarkers.toolbarModal
  );
  const filteredResources = useAppSelector(state =>
    selectFilteredResource(state)
  );

  const clearAllTags = () => {
    setActiveFilterTags(JSON.parse(JSON.stringify(noActiveFilterTags)));
    dispatch(resetFilterFunction());
  };

  const handleTag = (
    type: number,
    filterType: ResourceType,
    filterTag: string,
    index: number,
    key: number
  ) => {
    const updatedActiveFilterTags = { ...activeFilterTags };

    // handles multi select filters
    if (type === 0) {
      // @ts-expect-error Change filter to be powered by query params
      if (updatedActiveFilterTags[filterType][index][key]) {
        dispatch(removeFilterFunction({ tag: filterTag }));
      } else {
        dispatch(setFilterFunction({ tag: filterTag }));
      }
      // @ts-expect-error Change filter to be powered by query params
      updatedActiveFilterTags[filterType][index][key] =
        // @ts-expect-error Change filter to be powered by query params
        !updatedActiveFilterTags[filterType][index][key];
      setActiveFilterTags(updatedActiveFilterTags);
    }
    // handles single select entry/organization filters
    else if (type === 1) {
      if (updatedActiveFilterTags[filterType][index] === key) {
        // @ts-expect-error Change filter to be powered by query params
        updatedActiveFilterTags[filterType][index] = null;
        dispatch(removeEntryFilterFunction());
      } else {
        updatedActiveFilterTags[filterType][index] = key;
        dispatch(setEntryFilterFunction({ tag: filterTag }));
      }
      setActiveFilterTags(updatedActiveFilterTags);
    }
  };

  return (
    <SwipeableDrawer
      anchor={isMobile ? 'bottom' : 'left'}
      onClose={() => {
        dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
      }}
      onOpen={noop}
      disableSwipeToOpen
      open={toolbarModal === TOOLBAR_MODAL_FILTER}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '10px',
            width: isMobile ? 'auto' : '30vw',
            height: isMobile ? '70vh' : '100%'
          }
        }
      }}
    >
      <Box className={styles.header}>
        <Box sx={{ width: '100%' }}>
          {isMobile ? (
            <Box
              sx={{
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: '#ffffff'
              }}
            />
          ) : null}
        </Box>
        <h1>{filters[resourceType].title}</h1>
      </Box>

      <Box sx={{ margin: '20px' }}>
        {filters[resourceType].categories.map((category, index) => (
          <React.Fragment key={category.header}>
            <h2 className={styles.label}>{category.header}</h2>
            {category.type === 0 ? (
              <FilterTags
                tags={category.tags}
                resourceType={resourceType}
                index={index}
                handleTag={handleTag}
                activeTags={activeFilterTags}
              />
            ) : (
              <FilterTagsExclusive
                tags={category.tags}
                resourceType={resourceType}
                index={index}
                handleTag={handleTag}
                activeTags={activeFilterTags}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
      <Box
        sx={{
          marginBottom: '10px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          fontSize: '16.8px',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <Box
          sx={{
            margin: '10px 20px'
          }}
        >
          <Button onClick={clearAllTags} data-cy="button-clear-all-mobile">
            Clear All
          </Button>
        </Box>
        <Box
          sx={{
            margin: '0px 20px'
          }}
        >
          <p
            style={{
              margin: '10px',
              padding: '10px 20px',
              width: 'fit-content',
              position: 'relative',
              float: 'right',
              border: '1px solid #09A2E5',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            Resources: {filteredResources.length}
          </p>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default Filter;
