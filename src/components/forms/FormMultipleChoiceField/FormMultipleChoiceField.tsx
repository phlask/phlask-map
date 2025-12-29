import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useMemo, type ReactNode } from 'react';
import {
  useController,
  useFormContext,
  type FieldValues,
  type Path
} from 'react-hook-form';

type FormMultipleChoiceFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  label: ReactNode;
  options: { key: string; label: string; value: string }[];
  placeholder?: string;
  fullWidth?: boolean;
  open?: boolean;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FormMultipleChoiceField = <Values extends FieldValues>({
  name,
  label,
  options = [],
  fullWidth = false,
  placeholder = 'Select...',
  open
}: FormMultipleChoiceFieldProps<Values>) => {
  const { control } = useFormContext<Values>();
  const { field } = useController({ name, control });
  const value = useMemo(
    () =>
      options.filter(option => {
        return field.value.includes(option.value);
      }),
    [field.value, options]
  );

  return (
    <Autocomplete
      open={open}
      disabled={field.disabled}
      multiple
      fullWidth={fullWidth}
      disableCloseOnSelect
      onChange={(_, value) => {
        field.onChange(value.map(option => option.value));
      }}
      onBlur={field.onBlur}
      getOptionKey={option => option.key}
      getOptionLabel={option => option.label}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      value={value}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        );
      }}
      renderInput={params => (
        <TextField
          name={field.name}
          label={label}
          placeholder={placeholder}
          {...params}
        />
      )}
      limitTags={2}
      options={options}
    />
  );
};

export default FormMultipleChoiceField;
