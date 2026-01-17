import * as z from 'zod';
import baseResourceSchema from './baseResourceSchema';
import { ResourceType } from 'hooks/useResourceType';

const foragingResourceSchema = baseResourceSchema.extend({
  resource_type: z.literal(ResourceType.FORAGE).default(ResourceType.FORAGE),
  forage: z
    .object({
      forage_type: z.array(
        z.enum(['NUT', 'FRUIT', 'LEAVES', 'BARK', 'FLOWERS'])
      ),
      tags: z.array(z.enum(['MEDICINAL', 'IN_SEASON', 'COMMUNITY_GARDEN']))
    })
    .default({ forage_type: [], tags: [] })
});

export type ForagingFormValues = z.infer<typeof foragingResourceSchema>;

export default foragingResourceSchema;
