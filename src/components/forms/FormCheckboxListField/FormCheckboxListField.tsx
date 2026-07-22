import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel
} from '@mui/material';
import { type ReactNode } from 'react';
import {
  useFormContext,
  useWatch,
  type FieldValues,
  type Path
} from 'react-hook-form';

type FormCheckboxListFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  label: ReactNode;
  helperText?: string;
  options: { key: string; label: ReactNode; value: string }[];
  labelPlacement: 'bottom' | 'end' | 'start' | 'top';
  fullWidth?: boolean;
  required?: boolean;
};

const FormCheckboxListField = <Values extends FieldValues>({
  name,
  label,
  fullWidth,
  helperText,
  labelPlacement = 'end',
  options = []
}: FormCheckboxListFieldProps<Values>) => {
  const { register, control } = useFormContext<Values>();
  const field = register(name);
  const watchedValue = useWatch({ name, control });

  return (
    <FormControl fullWidth={fullWidth}>
      <FormLabel component="legend" required={field.required}>
        {label}
      </FormLabel>
      <FormGroup>
        {options.map(option => (
          <FormControlLabel
            {...field}
            key={option.key}
            control={
              <Checkbox defaultChecked={watchedValue?.includes(option.value)} />
            }
            label={option.label}
            labelPlacement={labelPlacement}
            value={option.value}
            sx={{ justifyContent: 'space-between' }}
          />
        ))}
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default FormCheckboxListField;
