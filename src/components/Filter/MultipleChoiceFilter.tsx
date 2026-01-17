import {
  useFormContext,
  useWatch,
  type FieldValue,
  type FieldValues,
  type Path
} from 'react-hook-form';
import DividedButtonGroup from './DividedButtonGroup';
import FilterButton from './FilterButton';
import FilterSection from './FilterSection';

type MultipleChoiceFilterProps<F extends FieldValues> = {
  name: Path<F>;
  label?: string;
  items: FieldValue<F>[];
};

const MultipleChoiceFilter = <F extends FieldValues>({
  name,
  label = 'Filter',
  items = []
}: MultipleChoiceFilterProps<F>) => {
  const { control } = useFormContext<F>();
  const value = useWatch<F>({ control, name });

  return (
    <FilterSection label={label}>
      <DividedButtonGroup>
        {items.map(item => {
          value.includes(item);
          return (
            <FilterButton<F>
              key={item}
              name={name}
              value={item}
              isSelected={value.includes(item)}
            />
          );
        })}
      </DividedButtonGroup>
    </FilterSection>
  );
};

export default MultipleChoiceFilter;
