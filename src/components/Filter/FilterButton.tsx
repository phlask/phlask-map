import { useId } from 'react';
import {
  useFormContext,
  type FieldValues,
  type Path,
  type FieldValue
} from 'react-hook-form';
import formatTag from 'utils/formatTag';

type FilterButtonProps<F extends FieldValues> = {
  name: Path<F>;
  value?: FieldValue<F> | string;
  isSelected?: boolean;
  type?: 'checkbox' | 'radio';
};

const FilterButton = <F extends FieldValues>({
  name,
  value,
  isSelected = false,
  type = 'checkbox'
}: FilterButtonProps<F>) => {
  const { register } = useFormContext<F>();
  const id = useId();

  return (
    <label
      role="button"
      style={{
        cursor: 'pointer',
        font: 'inherit',
        fontSize: '0.875rem',
        userSelect: 'none',
        color: isSelected ? 'white' : '#2D3748',
        border: '1px solid #2D3748',
        borderRadius: 3,
        textTransform: 'capitalize',
        fontWeight: 500,
        paddingBlock: '10px',
        paddingInline: '15px',
        background: isSelected ? '#2D3748' : 'white',
        transition: '0.2s background, 0.2s color'
      }}
      htmlFor={id}
    >
      <input
        id={id}
        radioGroup={name}
        type={type}
        hidden
        value={value}
        {...register(name)}
      />
      {formatTag(value) || 'All'}
    </label>
  );
};

export default FilterButton;
