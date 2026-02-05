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
  const { register, setValue } = useFormContext<Values>();
  const field = register(name);
  const currentValues: string[] = useWatch({ name }) ?? [];

  const handleChange = (optionValue: string, checked: boolean) => {
    const updated = checked
      ? [...currentValues, optionValue]
      : currentValues.filter(v => v !== optionValue);
    setValue(name, updated as never);
  };

  return (
    <FormControl fullWidth={fullWidth}>
      <FormLabel component="legend" required={field.required}>
        {label}
      </FormLabel>
      <FormGroup>
        {options.map(option => (
          <FormControlLabel
            key={option.key}
            control={
              <Checkbox
                checked={currentValues.includes(option.value)}
                onChange={(_e, checked) =>
                  handleChange(option.value, checked)
                }
                name={field.name}
              />
            }
            label={option.label}
            labelPlacement={labelPlacement}
            sx={{ justifyContent: 'space-between' }}
          />
        ))}
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default FormCheckboxListField;
