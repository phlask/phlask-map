import * as z from 'zod';
import baseResourceSchema from './baseResourceSchema';
import { ResourceType } from 'hooks/useResourceType';

const bathroomResourceSchema = baseResourceSchema.extend({
  resource_type: z
    .literal(ResourceType.BATHROOM)
    .default(ResourceType.BATHROOM),
  bathroom: z
    .object({
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
    })
    .default({ tags: [] })
});

export type BathroomFormValues = z.infer<typeof bathroomResourceSchema>;

export default bathroomResourceSchema;
