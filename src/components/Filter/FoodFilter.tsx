import { ButtonGroup, Stack } from '@mui/material';
import FilterSection from './FilterSection';
import FilterButton from './FilterButton';
import DividedButtonGroup from './DividedButtonGroup';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import FilterActions from './FilterActions';

const foodTypes = ['Perishable', 'Non-perishable', 'Prepared foods and meals'];

const distributionTypes = ['Eat on site', 'Delivery', 'Pick up'];

const organizationTypes = ['Government', 'Business', 'Non-profit', 'Unsure'];

const FoodFilter = () => {
  return (
    <>
      <FilterHeader>Food Filter</FilterHeader>
      <FilterContent>
        <Stack gap="25px">
          <FilterSection label="Food Type">
            <DividedButtonGroup>
              {foodTypes.map(type => (
                <FilterButton variant="outlined" key={type}>
                  {type}
                </FilterButton>
              ))}
            </DividedButtonGroup>
          </FilterSection>
          <FilterSection label="Distribution Type">
            <DividedButtonGroup>
              {distributionTypes.map(type => (
                <FilterButton variant="outlined" key={type}>
                  {type}
                </FilterButton>
              ))}
            </DividedButtonGroup>
          </FilterSection>
          <FilterSection label="Organization Type">
            <ButtonGroup fullWidth>
              {organizationTypes.map(type => (
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

export default FoodFilter;
