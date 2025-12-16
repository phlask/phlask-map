import { Box, Button, SwipeableDrawer } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import React from 'react';
import {
  setToolbarModal,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE
} from 'actions/actions';
import noop from 'utils/noop';
import styles from './Filter.module.scss';
import useAppSelector from 'hooks/useSelector';
import filters from 'fixtures/filters';
import useAppDispatch from 'hooks/useDispatch';
import useResourceType from 'hooks/useResourceType';

type FilterTagsProps = {
  tags?: string[];
};

const FilterTags = ({ tags = [] }) => (
  <Box className={styles.filterTags}>
    {tags.map(tag => (
      <Box
        key={tag}
        className={styles.filterTag}
        onClick={noop}
        data-cy={`filter-option-${tag}`}
      >
        <p>{tag}</p>
      </Box>
    ))}
  </Box>
);

const FilterTagsExclusive = ({ tags = [] }: FilterTagsProps) => (
  <Box className={styles.filterTagsExclusive}>
    {tags.map(tag => (
      <Box
        key={tag}
        className={styles.filterTagExclusive}
        onClick={noop}
        data-cy={`filter-option-${tag}`}
      >
        <p>{tag}</p>
      </Box>
    ))}
  </Box>
);

const Filter = () => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { resourceType, setResourceType } = useResourceType();

  const toolbarModal = useAppSelector(
    state => state.filterMarkers.toolbarModal
  );

  if (!filters[resourceType]) {
    return null;
  }

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
        {filters[resourceType].categories.map(category => (
          <React.Fragment key={category.header}>
            <h2 className={styles.label}>{category.header}</h2>
            {category.type === 0 ? <FilterTags /> : <FilterTagsExclusive />}
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
          <Button
            onClick={() => {
              setResourceType(resourceType);
            }}
            data-cy="button-clear-all-mobile"
          >
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
            Resources: 0
          </p>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default Filter;
