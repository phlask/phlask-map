import { TextField } from '@mui/material';
import type { ReactNode } from 'react';
import {
  useFormContext,
  useFormState,
  type FieldValues,
  type Path
} from 'react-hook-form';

type FormTextFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  label: ReactNode;
  disabled?: boolean;
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
  disabled = false,
  required = false,
  fullWidth = false,
  multiline = false,
  minRows = undefined
}: FormTextFieldProps<Values>) => {
  const { register, getFieldState } = useFormContext<Values>();
  const formState = useFormState<Values>({
    name,
    disabled
  });
  const { invalid, error } = getFieldState(name, formState);

  return (
    <TextField
      {...register(name, { required, disabled })}
      label={label}
      helperText={error?.message || helperText || ' '}
      fullWidth={fullWidth}
      required={required}
      error={invalid}
      multiline={multiline}
      minRows={minRows}
    />
  );
};

export default FormTextField;
