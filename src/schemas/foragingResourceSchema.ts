import * as z from 'zod';
import baseResourceSchema from './baseResourceSchema';

const foragingResourceSchema = baseResourceSchema.extend({
  forage_type: z.array(z.enum(['NUT', 'FRUIT', 'LEAVES', 'BARK', 'FLOWERS'])),
  tags: z.array(z.enum(['MEDICINAL', 'IN_SEASON', 'COMMUNITY_GARDEN']))
});

export type ForagingFormValues = z.infer<typeof foragingResourceSchema>;

export default foragingResourceSchema;
