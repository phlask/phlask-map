import { ButtonGroup, Stack } from '@mui/material';
import FilterSection from './FilterSection';
import DividedButtonGroup from './DividedButtonGroup';
import FilterButton from './FilterButton';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import FilterActions from './FilterActions';

const features = [
  'ADA accessible',
  'Gender neutral',
  'Changing table',
  'Single occupancy',
  'Family bathroom',
  'Has water fountain'
];

const entryTypes = ['Open Access', 'Restricted', 'Unsure'];

const BathroomFilter = () => {
  return (
    <>
      <FilterHeader>Foraging Filter</FilterHeader>
      <FilterContent>
        <Stack gap="25px">
          <FilterSection label="Features">
            <DividedButtonGroup>
              {features.map(feature => (
                <FilterButton variant="outlined" key={feature}>
                  {feature}
                </FilterButton>
              ))}
            </DividedButtonGroup>
          </FilterSection>
          <FilterSection label="Entry Type">
            <ButtonGroup>
              {entryTypes.map(type => (
                <FilterButton key={type}>{type}</FilterButton>
              ))}
            </ButtonGroup>
          </FilterSection>
        </Stack>
        <FilterActions />
      </FilterContent>
    </>
  );
};

export default BathroomFilter;
