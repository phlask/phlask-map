import * as z from 'zod';
import baseResourceSchema from './baseResourceSchema';
import { ResourceType } from 'hooks/useResourceType';

const waterResourceSchema = baseResourceSchema.extend({
  resource_type: z.literal(ResourceType.WATER).default(ResourceType.WATER),
  water: z
    .object({
      dispenser_type: z
        .array(
          z.enum([
            'DRINKING_FOUNTAIN',
            'BOTTLE_FILLER',
            'SINK',
            'JUG',
            'SODA_MACHINE',
            'VESSEL',
            'WATER_COOLER'
          ])
        )
        .default([]),
      tags: z
        .array(
          z.enum(['WHEELCHAIR_ACCESSIBLE', 'FILTERED', 'BYOB', 'ID_REQUIRED'])
        )
        .default([])
    })
    .default({ dispenser_type: [], tags: [] })
});

export type WaterFormValues = z.infer<typeof waterResourceSchema>;

export default waterResourceSchema;
