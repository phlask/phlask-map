import { ButtonGroup, Stack } from '@mui/material';
import FilterSection from './FilterSection';
import FilterButton from './FilterButton';
import DividedButtonGroup from './DividedButtonGroup';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import FilterActions from './FilterActions';

const dispenserTypes = [
  'Drinking fountain',
  'Bottle filler',
  'Sink',
  'Water cooler',
  'Soda machine',
  'Vessel'
];

const features = [
  'ADA accessible',
  'Filtered water',
  'Vessel needed',
  'ID required'
];

const entryTypes = ['Open Access', 'Restricted', 'Unsure'];

const WaterFilter = () => {
  return (
    <>
      <FilterHeader>Water Filter</FilterHeader>
      <FilterContent>
        <Stack gap="25px">
          <FilterSection label="Dispenser Type">
            <DividedButtonGroup>
              {dispenserTypes.map(type => (
                <FilterButton variant="outlined" key={type}>
                  {type}
                </FilterButton>
              ))}
            </DividedButtonGroup>
          </FilterSection>
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
            <ButtonGroup fullWidth>
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

export default WaterFilter;
