import { Box, Button, Collapse, Paper } from '@mui/material';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { TOOLBAR_MODAL_FILTER } from '../../actions/actions';
import styles from './Filter.module.scss';

const FilterTags = props => (
  <Box className={styles.filterTags}>
    {props.tags.map((tag, key) => (
      <Box
        key={key}
        className={
          styles.filterTag +
          (props.activeTags[props.filterType][props.index][key]
            ? ' ' + styles.filterTagSelected
            : '')
        }
        onClick={() => {
          props.handleTag(0, props.filterType, props.index, key);
          props.forceUpdate();
        }}
      >
        <p>{tag}</p>
      </Box>
    ))}
  </Box>
);

const FilterTagsExclusive = props => (
  <Box className={styles.filterTagsExclusive}>
    {props.tags.map((tag, key) => (
      <Box
        key={key}
        className={
          styles.filterTagExclusive +
          (props.activeTags[props.filterType][props.index] == key
            ? ' ' + styles.filterTagSelected
            : '')
        }
        onClick={() => {
          props.handleTag(1, props.filterType, props.index, key);
          props.forceUpdate();
        }}
      >
        <p>{tag}</p>
      </Box>
    ))}
  </Box>
);

const filterTypes = {
  WATER: 'Water Filter',
  FOOD: 'Food Filter',
  FORAGING: 'Foraging Filter',
  BATHROOM: 'Bathroom Filter'
};
export { filterTypes };

let filterType = filterTypes.WATER;

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

export default function Filter(props) {
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.toolbarModal);
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
              <h1>{props.filters[filterType].title}</h1>
            </Box>

            <Box sx={{ margin: '20px' }}>
              {props.filters[filterType].categories.map((category, index) => {
                return (
                  <>
                    <h2 className={styles.label}>{category.header}</h2>
                    {category.type == 0 ? (
                      <FilterTags
                        tags={category.tags}
                        filterType={filterType}
                        index={index}
                        handleTag={props.handleTag}
                        activeTags={props.activeTags}
                        forceUpdate={forceUpdate}
                      />
                    ) : (
                      <FilterTagsExclusive
                        tags={category.tags}
                        filterType={filterType}
                        index={index}
                        handleTag={props.handleTag}
                        activeTags={props.activeTags}
                        forceUpdate={forceUpdate}
                      />
                    )}
                  </>
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
                  onClick={props.clearAll}
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
                  onClick={props.applyTags}
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
