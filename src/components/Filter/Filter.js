import { Box, Button, Collapse, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setToolbarModal,
  toggleInfoWindow,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE
} from '../../actions/actions';
import styles from './Filter.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import useIsMobile from 'hooks/useIsMobile';

const FilterTags = ({ tags, activeTags, resourceType, index, handleTag }) => (
  <Box className={styles.filterTags}>
    {tags.map((tag, key) => (
      <Box
        key={key}
        className={
          styles.filterTag +
          (activeTags[resourceType][index][key]
            ? ' ' + styles.filterTagSelected
            : '')
        }
        onClick={() => {
          handleTag(0, resourceType, index, key);
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
        key={key}
        className={
          styles.filterTagExclusive +
          (activeTags[resourceType][index] == key
            ? ' ' + styles.filterTagSelected
            : '')
        }
        onClick={() => {
          handleTag(1, resourceType, index, key);
        }}
        data-cy={`filter-option-${tag}`}
      >
        <p>{tag}</p>
      </Box>
    ))}
  </Box>
);

export default function Filter({
  filters,
  resourceType,
  handleTag,
  activeTags,
  clearAll,
  applyTags
}) {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
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
            in={toolbarModal == TOOLBAR_MODAL_FILTER}
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
                  dispatch(
                    setToolbarModal({ toolbarModal: TOOLBAR_MODAL_NONE })
                  );
                }}
                sx={{
                  position: 'absolute',
                  right: '20px',
                  top: 5,
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
              {filters[resourceType].categories.map((category, index) => {
                return (
                  <React.Fragment key={index}>
                    <h2 className={styles.label}>{category.header}</h2>
                    {category.type == 0 ? (
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
                );
              })}
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
                <p
                  onClick={clearAll}
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
              <Box>
                <Button
                  onClick={applyTags}
                  style={{
                    marginRight: '20px',
                    padding: '10px 20px',
                    width: 'fit-content',
                    position: 'relative',
                    float: 'right',
                    border: '1px solid #09A2E5',
                    borderRadius: '8px',
                    fontWeight: '600',
                    color: '#09A2E5'
                  }}
                  data-cy="filter-apply-button"
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Collapse>
        </Paper>
      )}
      {isMobile && <Paper></Paper>}
    </>
  );
}
