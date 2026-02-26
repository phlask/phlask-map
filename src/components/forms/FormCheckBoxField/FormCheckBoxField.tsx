import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';

type FormCheckboxFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  label: string;
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
};

const FormCheckboxField = <Values extends FieldValues>({
  name,
  label,
  labelPlacement = 'end'
}: FormCheckboxFieldProps<Values>) => {
  const { register } = useFormContext<Values>();
  const field = register(name);

  return (
    <FormControl>
      <FormControlLabel
        {...field}
        control={<Checkbox />}
        label={label}
        labelPlacement={labelPlacement}
      />
    </FormControl>
  );
};

export default FormCheckboxField;
