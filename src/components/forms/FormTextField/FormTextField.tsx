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
  const { register, formState } = useFormContext<Values>();
  const isError = Boolean(formState.errors[name]);
  return (
    <TextField
      {...register(name, { required })}
      label={`${label}${required ? '*' : ''}`}
      helperText={
        (formState.errors[name]?.message as string) || helperText || ' '
      }
      fullWidth={fullWidth}
      error={isError}
      multiline={multiline}
      minRows={minRows}
    />
  );
};

export default FormTextField;
