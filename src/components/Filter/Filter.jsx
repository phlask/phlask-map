import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  SwipeableDrawer
} from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectFilteredResource from 'selectors/resourceSelectors';
import {
  setToolbarModal,
  toggleInfoWindow,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE
} from 'actions/actions';
import noop from 'utils/noop';
import styles from './Filter.module.scss';

const FilterTags = ({ tags, activeTags, resourceType, index, handleTag }) => (
  <Box className={styles.filterTags}>
    {tags.map((tag, key) => (
      <Box
        key={tag}
        className={
          styles.filterTag +
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
}) => (
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

const Filter = ({ filters, resourceType, handleTag, activeTags, clearAll }) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const filteredResources = useSelector(state => selectFilteredResource(state));
  return (
    <>
      {!isMobile && (
        <Paper
          sx={{
            position: 'absolute',
            left: '32px',
            bottom: '133px',
            width: '686px',
            borderRadius: '10px'
          }}
        >
          <Collapse
            in={toolbarModal === TOOLBAR_MODAL_FILTER}
            orientation="vertical"
            timeout="auto"
          >
            <Box className={styles.header}>
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
                      activeTags={activeTags}
                    />
                  ) : (
                    <FilterTagsExclusive
                      tags={category.tags}
                      resourceType={resourceType}
                      index={index}
                      handleTag={handleTag}
                      activeTags={activeTags}
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
                onClick={clearAll}
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
          </Collapse>
        </Paper>
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
          PaperProps={{ sx: { borderRadius: '10px' } }}
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
                    activeTags={activeTags}
                  />
                ) : (
                  <FilterTagsExclusive
                    tags={category.tags}
                    resourceType={resourceType}
                    index={index}
                    handleTag={handleTag}
                    activeTags={activeTags}
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
              <Button onClick={clearAll}>Clear All</Button>
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
