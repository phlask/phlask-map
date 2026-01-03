import { ResourceType } from 'hooks/useResourceType';
import * as z from 'zod';

const baseResourceSchema = z.object({
  version: z.number().min(1).max(1),
  name: z.string().nonempty('Name is required'),
  address: z.string().nonempty('Address is required'),
  gp_id: z.string().nonempty('Google Places ID is required'),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  last_modifier: z.string().default('phlask_app'),
  creator: z.string().default('phlask_app'),
  description: z.string(),
  entry_type: z.enum(['OPEN', 'RESTRICTED', 'UNSURE'], {
    message: 'Entry type is required'
  }),
  images: z.array(z.string()),
  guidelines: z.string(),
  resource_type: z.enum(
    [
      ResourceType.WATER,
      ResourceType.FOOD,
      ResourceType.FORAGE,
      ResourceType.BATHROOM
    ],
    { message: 'Resource type is required' }
  ),
  status: z.enum([
    'OPERATIONAL',
    'TEMPORARILY_CLOSED',
    'PERMANENTLY_CLOSED',
    'HIDDEN'
  ])
});

export default baseResourceSchema;
