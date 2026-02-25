import * as z from 'zod';
import { ResourceType } from 'hooks/useResourceType';

const baseResourceSchema = z.object({
  version: z.number().optional().default(1),
  name: z.string().nonempty('Name is required').default(''),
  address: z.string().nonempty('Address is required').default(''),
  gp_id: z.string().nonempty('Google Places ID is required').default(''),
  city: z.string().default(''),
  state: z.string().default(''),
  zip_code: z.string().default(''),
  latitude: z.number().default(Number.NaN),
  longitude: z.number().default(Number.NaN),
  date_created: z.iso.datetime().default(() => new Date().toISOString()),
  last_modifier: z.string().default('phlask_app'),
  last_modified: z.iso.datetime().default(() => new Date().toISOString()),
  creator: z.string().default('phlask_app'),
  description: z.string().default(''),
  entry_type: z
    .enum(['OPEN', 'RESTRICTED', 'UNSURE'], {
      message: 'Entry type is required'
    })
    .default('OPEN'),
  source: z
    .object({
      type: z.enum(['MANUAL', 'WEB_SCRAPE']).default('MANUAL'),
      url: z.string().optional()
    })
    .default({ type: 'MANUAL' }),
  verification: z
    .object({
      verified: z.boolean().default(false),
      last_modified: z.iso.datetime().default(() => new Date().toISOString()),
      verifier: z.string().default('')
    })
    .default(() => ({
      verified: false,
      last_modified: new Date().toISOString(),
      verifier: ''
    })),
  images: z.array(z.string()).default([]),
  guidelines: z.string().default(''),
  resource_type: z.enum(
    [
      ResourceType.WATER,
      ResourceType.FOOD,
      ResourceType.FORAGE,
      ResourceType.BATHROOM
    ],
    { message: 'Resource type is required' }
  ),
  status: z
    .enum(['OPERATIONAL', 'TEMPORARILY_CLOSED', 'PERMANENTLY_CLOSED', 'HIDDEN'])
    .default('OPERATIONAL')
});

export type BaseResourceSchema = z.infer<typeof baseResourceSchema>;

export default baseResourceSchema;
