import * as z from 'zod';
import baseResourceSchema from './baseResourceSchema';
import { ResourceType } from 'hooks/useResourceType';

const foodResourceSchema = baseResourceSchema.extend({
  resource_type: z.literal(ResourceType.FOOD).default(ResourceType.FOOD),
  food: z
    .object({
      food_type: z.array(z.enum(['PERISHABLE', 'NON_PERISHABLE', 'PREPARED'])),
      distribution_type: z.array(z.enum(['EAT_ON_SITE', 'DELIVERY', 'PICKUP'])),
      organization_name: z.string(),
      organization_url: z.string(),
      organization_type: z.enum([
        'GOVERNMENT',
        'BUSINESS',
        'NON_PROFIT',
        'UNSURE'
      ])
    })
    .default({
      food_type: [],
      distribution_type: [],
      organization_name: '',
      organization_url: '',
      organization_type: 'BUSINESS'
    })
});

export type FoodFormValues = z.infer<typeof foodResourceSchema>;

export default foodResourceSchema;
