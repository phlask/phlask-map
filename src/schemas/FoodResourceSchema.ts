import * as z from 'zod';
import baseResourceSchema from './baseResourceSchema';

const foodResourceSchema = baseResourceSchema.extend({
  food_type: z.array(z.enum(['PERISHABLE', 'NON_PERISHABLE', 'PREPARED'])),
  distribution_type: z.array(z.enum(['EAT_ON_SITE', 'DELIVERY', 'PICKUP'])),
  organization_name: z.string(),
  organization_url: z.string(),
  organization_type: z.enum(['GOVERNMENT', 'BUSINESS', 'NON_PROFIT', 'UNSURE'])
});

export type FoodFormValues = z.infer<typeof foodResourceSchema>;

export default foodResourceSchema;
