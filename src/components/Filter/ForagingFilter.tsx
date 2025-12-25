import { ButtonGroup, Stack } from '@mui/material';
import FilterSection from './FilterSection';
import FilterButton from './FilterButton';
import DividedButtonGroup from './DividedButtonGroup';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import FilterActions from './FilterActions';

const forageTypes = ['Nut', 'Fruit', 'Leaves', 'Bark', 'Flowers'];

const features = ['Medicinal', 'In season', 'Community garden'];

const entryTypes = ['Open Access', 'Restricted', 'Unsure'];

const ForagingFilter = () => {
  return (
    <>
      <FilterHeader>Foraging Filter</FilterHeader>
      <FilterContent>
        <Stack gap="25px">
          <FilterSection label="Forage Type">
            <DividedButtonGroup>
              {forageTypes.map(type => (
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

export default ForagingFilter;
