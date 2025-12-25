import { Chip, Divider, Stack } from '@mui/material';
import type { ResourceEntry } from 'types/ResourceEntry';
import getTagsFromResource from 'utils/getTagsFromResource';
import toTitleCase from 'utils/toTitleCase';

type SelectedResourceTagsProps = {
  resource: ResourceEntry;
};

const SelectedResourceTags = ({ resource }: SelectedResourceTagsProps) => {
  const tags = getTagsFromResource(resource);
  return (
    <Stack gap="15px">
      <Divider />
      <Stack flexWrap="wrap" direction="row" gap="10px">
        {tags.map(tag => (
          <Chip
            variant="outlined"
            key={tag}
            label={toTitleCase(tag.replaceAll('_', ' '))}
            sx={{
              borderRadius: '3px',
              border: '1px solid #2D3748',
              color: '#2D3748',
              paddingBlock: '5px',
              paddingInline: '7px',
              fontWeight: 500
            }}
            // overrides any undesirable label styling defaults
            slots={{ label: 'span' }}
          />
        ))}
      </Stack>
      {tags.length > 0 && <Divider />}
    </Stack>
  );
};

export default SelectedResourceTags;
