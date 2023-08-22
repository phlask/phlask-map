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
          (props.value && props.value.includes(key)
            ? ' ' + styles.filterTagSelected
            : '')
        }
        onClick={() => {
          if (props.activeTags[props.fitlerType][props.index].includes(key)) {
            props.setValue(props.value.filter(t => t != key));
          } else {
            props.setActiveTags.setValue([...props.value, key]);
          }
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
          (props.value == key ? ' ' + styles.filterTagSelected : '')
        }
        onClick={() => {
          if (props.value != key) {
            props.setValue(key);
          } else {
            props.setValue();
          }
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
