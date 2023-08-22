import { Box, Collapse, Paper } from '@mui/material';
import { React } from 'react';
import { isMobile } from 'react-device-detect';
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

export default function Filter(props) {
  return (
    <>
      {true && (
        <>
          {!isMobile && (
            <>
              <Paper
                sx={{
                  position: 'absolute',
                  left: '32px',
                  bottom: '133px',
                  width: '526.25px',
                  borderRadius: '10px'
                }}
              >
                <Collapse in={props.open} orientation="vertical" timeout="auto">
                  {
                    <>
                      <Box className={styles.header}>
                        <h1>{props.filters[filterType].title}</h1>
                      </Box>

                      <Box sx={{ margin: '20px' }}>
                        {props.filters[filterType].categories.map(
                          (category, index) => {
                            if (category.type == 0) {
                              return (
                                <>
                                  <h2 className={styles.label}>
                                    {category.header}
                                  </h2>
                                  <FilterTags
                                    tags={category.tags}
                                    filterType={filterType}
                                    index={index}
                                    handleTag={props.handleTag}
                                    activeTags={props.activeTags}
                                  />
                                </>
                              );
                            } else if (category.type == 1) {
                              return (
                                <>
                                  <h2 className={styles.label}>
                                    {category.header}
                                  </h2>
                                  <FilterTagsExclusive
                                    tags={category.tags}
                                    filterType={filterType}
                                    index={index}
                                    handleTag={props.handleTag}
                                    activeTags={props.activeTags}
                                  />
                                </>
                              );
                            }
                          }
                        )}
                      </Box>
                    </>
                  }
                </Collapse>
              </Paper>
            </>
          )}
          {isMobile && <Paper></Paper>}
        </>
      )}
    </>
  );
}
