import {
  useFormContext,
  useWatch,
  type FieldValue,
  type FieldValues,
  type Path
} from 'react-hook-form';
import FilterButton from './FilterButton';
import FilterSection from './FilterSection';
import { ButtonGroup } from '@mui/material';

type SingleChoiceFilterProps<F extends FieldValues> = {
  name: Path<F>;
  label?: string;
  items: FieldValue<F>[];
};

const SingleChoiceFilter = <F extends FieldValues>({
  name,
  label = 'Filter',
  items = []
}: SingleChoiceFilterProps<F>) => {
  const { control } = useFormContext<F>();
  const value = useWatch<F>({ control, name });

  return (
    <FilterSection label={label}>
      <ButtonGroup fullWidth>
        <FilterButton<F>
          name={name}
          value=""
          isSelected={value === ''}
          type="radio"
        />
        {items.map(type => (
          <FilterButton<F>
            key={type}
            name={name}
            value={type}
            isSelected={value === type}
            type="radio"
          />
        ))}
      </ButtonGroup>
    </FilterSection>
  );
};

export default SingleChoiceFilter;
