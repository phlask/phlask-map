import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { useId, type ReactNode } from 'react';
import {
  useFormContext,
  useWatch,
  type FieldValues,
  type Path
} from 'react-hook-form';

type FormSelectFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  label: ReactNode;
  helperText?: string;
  options: { key: string; label: ReactNode; value: string }[];
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
  'data-cy'?: string;
};

const FormSelectField = <Values extends FieldValues>({
  name,
  label,
  helperText = ' ',
  options = [],
  fullWidth = false,
  required = false,
  'data-cy': dataCy,
  placeholder = 'Select...'
}: FormSelectFieldProps<Values>) => {
  const { control, register, getFieldState } = useFormContext<Values>();
  const value = useWatch<Values>({ control, name });
  const fieldState = getFieldState(name);
  const isError = fieldState.invalid;
  const id = useId();
  return (
    <FormControl error={isError} fullWidth={fullWidth}>
      <InputLabel htmlFor={id} shrink required={required}>
        {label}
      </InputLabel>
      <Select
        data-cy={dataCy}
        displayEmpty
        renderValue={value =>
          options.find(option => option.value === value)?.label || placeholder
        }
        {...register(name)}
        label={label}
        slotProps={{ input: { id } }}
        value={value}
      >
        {options.map(option => (
          <MenuItem key={option.key} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message || helperText}</FormHelperText>
    </FormControl>
  );
};

export default FormSelectField;
