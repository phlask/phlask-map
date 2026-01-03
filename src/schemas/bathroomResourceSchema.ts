import * as z from 'zod';
import baseResourceSchema from './baseResourceSchema';

const bathroomResourceSchema = baseResourceSchema.extend({
  tags: z.array(
    z.enum([
      'WHEELCHAIR_ACCESSIBLE',
      'GENDER_NEUTRAL',
      'CHANGING_TABLE',
      'SINGLE_OCCUPANCY',
      'HAS_FOUNTAIN',
      'FAMILY'
    ])
  )
});

export type BathroomFormValues = z.infer<typeof bathroomResourceSchema>;

export default bathroomResourceSchema;
