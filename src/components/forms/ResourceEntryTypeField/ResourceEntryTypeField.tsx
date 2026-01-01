import { FormHelperText, Stack } from '@mui/material';
import FormSelectField from 'components/forms/FormSelectField/FormSelectField';

const entryTypeOptions = [
  {
    key: 'OPEN',
    label: (
      <Stack>
        Open access
        <FormHelperText>Public site, open to all</FormHelperText>
      </Stack>
    ),
    value: 'OPEN'
  },
  {
    key: 'RESTRICTED',
    label: (
      <Stack>
        Restricted
        <FormHelperText>May not be open to all</FormHelperText>
      </Stack>
    ),
    value: 'RESTRICTED'
  },
  { key: 'UNSURE', label: 'Unsure', value: 'UNSURE' }
];

const ResourceEntryTypeField = () => {
  return (
    <FormSelectField
      name="entry_type"
      label="Entry Type"
      options={entryTypeOptions}
      fullWidth
      required
    />
  );
};

export default ResourceEntryTypeField;
