import * as z from 'zod';
import baseResourceSchema from './baseResourceSchema';

const waterResourceSchema = baseResourceSchema.extend({
  dispenser_type: z.array(
    z.enum([
      'DRINKING_FOUNTAIN',
      'BOTTLE_FILLER',
      'SINK',
      'JUG',
      'SODA_MACHINE',
      'VESSEL',
      'WATER_COOLER'
    ])
  ),
  tags: z.array(
    z.enum(['WHEELCHAIR_ACCESSIBLE', 'FILTERED', 'BYOB', 'ID_REQUIRED'])
  )
});

export type WaterFormValues = z.infer<typeof waterResourceSchema>;

export default waterResourceSchema;
