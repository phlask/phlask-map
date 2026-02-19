import { TextField, type TextFieldProps } from '@mui/material';
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
  placeholder?: string;
  disabled?: boolean;
  helperText?: ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  multiline?: boolean;
  minRows?: number;
  slotProps?: TextFieldProps['slotProps'];
  sx?: TextFieldProps['sx'];
};

const FormTextField = <Values extends FieldValues>({
  name,
  label,
  placeholder,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  multiline = false,
  minRows = undefined,
  slotProps,
  sx
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
      placeholder={placeholder}
      helperText={error?.message || helperText || ' '}
      fullWidth={fullWidth}
      slotProps={{
        ...slotProps,
        inputLabel: {
          required,
          ...slotProps?.inputLabel
        }
      }}
      error={invalid}
      multiline={multiline}
      minRows={minRows}
      sx={sx}
    />
  );
};

export default FormTextField;
