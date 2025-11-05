import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Stack,
  SwipeableDrawer
} from '@mui/material';
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
  toggleInfoWindow,
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

type FilterProps = {
  resourceType: ResourceType;
};

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

const Filter = ({ resourceType }: FilterProps) => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const [activeFilterTags, setActiveFilterTags] =
    useState<ActiveFilterTagState>(noActiveFilterTags);

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
    <>
      {!isMobile && (
        <Collapse
          in={toolbarModal === TOOLBAR_MODAL_FILTER}
          orientation="vertical"
          timeout={{ enter: 300, appear: 0, exit: 300 }}
          mountOnEnter
          unmountOnExit
        >
          <Paper
            sx={{
              left: '32px',
              bottom: '133px',
              width: '686px',
              borderRadius: '10px',
              pointerEvents: 'auto'
            }}
          >
            <Stack
              sx={{
                position: 'relative',
                pointerEvents: 'auto',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className={styles.header}
            >
              <h1>{filters[resourceType].title}</h1>
              <IconButton
                aria-label="close"
                onClick={() => {
                  dispatch(
                    toggleInfoWindow({
                      isShown: false,
                      infoWindowClass: isMobile
                        ? 'info-window-out'
                        : 'info-window-out-desktop'
                    })
                  );
                  dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
                }}
                sx={{
                  position: 'absolute',
                  right: '20px',
                  top: '5px',
                  color: '#fff',
                  '&:hover': {
                    color: '#fff'
                  }
                }}
                size="large"
              >
                <CloseIcon
                  sx={{
                    fontSize: 34
                  }}
                />
              </IconButton>
            </Stack>

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
                onClick={clearAllTags}
              >
                <p
                  style={{
                    margin: 0,
                    width: 'fit-content',
                    position: 'relative',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    borderBottom: '2px solid #2D3748',
                    fontWeight: '500',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  Clear All
                </p>
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
          </Paper>
        </Collapse>
      )}
      {isMobile && (
        <SwipeableDrawer
          anchor="bottom"
          onClose={() => {
            dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
          }}
          onOpen={noop}
          disableSwipeToOpen
          open={toolbarModal === TOOLBAR_MODAL_FILTER}
          slotProps={{
            paper: { sx: { borderRadius: '10px' } }
          }}
        >
          <Box className={styles.header}>
            <Box sx={{ width: '100%' }}>
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
              <Button onClick={clearAllTags}>Clear All</Button>
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
      )}
    </>
  );
};

export default Filter;
