import { TextField } from '@mui/material';
import type { ReactNode } from 'react';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';

type FormTextFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  label: ReactNode;
  helperText?: ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  multiline?: boolean;
  minRows?: number;
};

const FormTextField = <Values extends FieldValues>({
  name,
  label,
  helperText,
  required = false,
  fullWidth = false,
  multiline = false,
  minRows = undefined
}: FormTextFieldProps<Values>) => {
  const { register, getFieldState } = useFormContext<Values>();
  const fieldState = getFieldState(name);
  const isError = Boolean(fieldState.error);
  return (
    <TextField
      {...register(name, { required })}
      label={`${label}${required ? '*' : ''}`}
      helperText={fieldState.error?.message || helperText || ' '}
      fullWidth={fullWidth}
      error={isError}
      multiline={multiline}
      minRows={minRows}
    />
  );
};

export default FormTextField;
