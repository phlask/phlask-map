import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  type TextFieldProps
} from '@mui/material';
import {
  useFormContext,
  Controller,
  type FieldValues,
  type Path
} from 'react-hook-form';
import { type ReactNode } from 'react';

type FormCheckboxFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  label: ReactNode;
  helperText?: string;
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
  sx?: TextFieldProps['sx'];
};

const FormCheckboxField = <Values extends FieldValues>({
  name,
  label,
  labelPlacement = 'end',
  sx
}: FormCheckboxFieldProps<Values>) => {
  const { control } = useFormContext<Values>();

  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={e => onChange(e.target.checked)}
                sx={sx}
              />
            }
            label={label}
            labelPlacement={labelPlacement}
            slotProps={{
              typography: {
                sx: { color: '#2d3748', fontSize: 14, lineHeight: '24px' }
              }
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default FormCheckboxField;
