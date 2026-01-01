import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Box,
  CardContent,
  Typography,
  IconButton,
  Stack,
  FormHelperText,
  Button
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useIsMobile from 'hooks/useIsMobile';
import CloseButton from '../CloseButton/CloseButton';
import { useToolbarContext } from 'contexts/ToolbarContext';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import FormSelectField from 'components/forms/FormSelectField/FormSelectField';
import FormMultipleChoiceField from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormDevtools from 'components/forms/FormDevtools/FormDevtools';
import FormImageUploadField from 'components/forms/FormImageUploadField/FormImageUploadField';
import { ResourceType } from 'hooks/useResourceType';
import FormHiddenField from 'components/forms/FormHiddenField/FormHiddenField';
import FormCheckboxListField from 'components/forms/FormCheckboxListField/FormCheckboxListField';
import FormResourceAddressField from 'components/forms/FormAddressField/FormResourceAddressField';
import type { ResourceEntry } from 'types/ResourceEntry';
import useAddResourceMutation from 'hooks/mutations/useAddResourceMutation';

type AddWaterFormProps = {
  onGoBack: VoidFunction;
  onComplete: VoidFunction;
};

const schema = z.object({
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
  ),
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

type AddWaterFormValues = z.infer<typeof schema>;

const defaultValues: AddWaterFormValues = {
  version: 1,
  last_modifier: 'phlask_app',
  name: '',
  address: '',
  description: '',
  entry_type: 'OPEN',
  gp_id: '',
  city: '',
  state: '',
  zip_code: '',
  latitude: Number.NaN,
  longitude: Number.NaN,
  dispenser_type: [],
  images: [],
  guidelines: '',
  tags: [],
  resource_type: ResourceType.WATER,
  status: 'OPERATIONAL',
  creator: 'phlask_app'
};

const entryTypeOptions = [
  {
    key: 'OPEN',
    label: (
      <Stack>
        Open access
        <FormHelperText>Public site, open to all</FormHelperText>
      </Stack>
    ),
    value: 'OPEN'
  },
  {
    key: 'RESTRICTED',
    label: (
      <Stack>
        Restricted
        <FormHelperText>May not be open to all</FormHelperText>
      </Stack>
    ),
    value: 'RESTRICTED'
  },
  { key: 'UNSURE', label: 'Unsure', value: 'UNSURE' }
];

const waterDispenserTypeOptions = [
  {
    key: 'DRINKING_FOUNTAIN',
    label: 'Drinking fountain',
    value: 'DRINKING_FOUNTAIN'
  },
  {
    key: 'BOTTLE_FILLER',
    label: 'Bottle filler and fountain',
    value: 'BOTTLE_FILLER'
  },
  {
    key: 'SINK',
    label: 'Sink',
    value: 'SINK'
  },
  {
    key: 'JUG',
    label: 'Water jug',
    value: 'JUG'
  },
  {
    key: 'SODA_MACHINE',
    label: 'Soda Machine',
    value: 'SODA_MACHINE'
  },
  {
    key: 'VESSEL',
    label: 'Pitcher',
    value: 'VESSEL'
  },
  {
    key: 'WATER_COOLER',
    label: 'Water Cooler',
    value: 'WATER_COOLER'
  }
];

const tagOptions = [
  {
    key: 'WHEELCHAIR_ACCESSIBLE',
    label: 'Wheelchair accessible',
    value: 'WHEELCHAIR_ACCESSIBLE'
  },
  {
    key: 'FILTERED',
    label: 'Filtered water',
    value: 'FILTERED'
  },
  {
    key: 'BYOB',
    label: 'Bring your own container',
    value: 'BYOB'
  },
  {
    key: 'ID_REQUIRED',
    label: 'ID required',
    value: 'ID_REQUIRED'
  }
];

const AddWaterForm = ({ onGoBack, onComplete }: AddWaterFormProps) => {
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  const { setToolbarModal } = useToolbarContext();
  const { mutate: addResource, isPending } = useAddResourceMutation();

  const methods = useForm<AddWaterFormValues>({
    defaultValues,
    resolver: zodResolver(schema)
  });
  const { handleSubmit } = methods;

  const onClose = () => {
    onGoBack();
    setToolbarModal(null);
  };
  const onPageChange = (update: (prev: number) => number) => {
    return setPage(prev => {
      const newValue = Math.max(0, update(prev));
      if (newValue === 0) {
        onGoBack();
      }
      return newValue;
    });
  };

  const onSubmit = (values: AddWaterFormValues) => {
    const shouldGoToNextPage = !isMobile && page < 2;
    if (shouldGoToNextPage) {
      return onPageChange(prev => prev + 1);
    }

    const now = new Date().toISOString();
    const resource: ResourceEntry = {
      version: values.version,
      name: values.name,
      address: values.address,
      date_created: now,
      images: values.images,
      last_modified: now,
      last_modifier: values.last_modifier,
      latitude: values.latitude,
      longitude: values.longitude,
      entry_type: values.entry_type,
      guidelines: values.guidelines,
      zip_code: values.zip_code,
      state: values.state,
      resource_type: values.resource_type,
      water: {
        dispenser_type: values.dispenser_type,
        tags: values.tags
      },
      source: { type: 'MANUAL' },
      verification: {
        last_modified: now,
        verified: false,
        verifier: ''
      },
      creator: values.creator,
      status: values.status,
      gp_id: values.gp_id,
      description: values.description,
      city: values.city
    };

    addResource(resource, { onSuccess: onComplete });
  };

  return (
    <Box justifyContent="center" overflow="none">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: isMobile ? null : 'center',
          padding: isMobile ? '0px 20px 10px' : '20px 0',
          height: isMobile ? '88px' : '64px',
          backgroundColor: '#5286E9',
          position: 'relative'
        }}
      >
        <Typography
          sx={{
            color: 'common.white',
            ...(isMobile
              ? {}
              : {
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 20.16
                })
          }}
        >
          Add a Water Resource
        </Typography>
        <CloseButton onClick={onClose} color="white" />
      </Box>
      <CardContent
        sx={{
          maxHeight: isMobile ? undefined : '500px',
          overflow: 'auto'
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormHiddenField<AddWaterFormValues> name="resource_type" />
            <FormHiddenField<AddWaterFormValues> name="version" />
            <FormHiddenField<AddWaterFormValues> name="last_modifier" />
            <FormHiddenField<AddWaterFormValues> name="status" />
            <FormHiddenField<AddWaterFormValues> name="creator" />
            <Stack gap={2}>
              {isMobile || page === 1 ? (
                <Stack gap={2}>
                  {isMobile && (
                    <FormImageUploadField<AddWaterFormValues>
                      name="images"
                      renderContent={() => (
                        <Button
                          sx={{
                            color: 'white',
                            borderRadius: '8px',
                            background: '#5286E9',
                            textTransform: 'capitalize'
                          }}
                        >
                          Choose Image
                        </Button>
                      )}
                    />
                  )}
                  <Stack
                    direction={{ sx: 'column', md: 'row' }}
                    gap={2}
                    justifyContent={{ sx: 'flex-start', md: 'center' }}
                  >
                    <FormTextField<AddWaterFormValues>
                      name="name"
                      label="Name"
                      helperText="Enter a name for the resource. (Example: City Hall)"
                      required
                      fullWidth
                    />
                    <FormResourceAddressField
                      label="Street Address"
                      fullWidth
                    />
                  </Stack>
                  <Stack
                    direction={{ sx: 'column', md: 'row' }}
                    gap={2}
                    justifyContent={{ sx: 'flex-start', md: 'center' }}
                  >
                    <FormTextField<AddWaterFormValues>
                      name="description"
                      label="Description"
                      fullWidth
                    />
                    <FormSelectField<AddWaterFormValues>
                      name="entry_type"
                      label="Entry Type"
                      options={entryTypeOptions}
                      fullWidth
                      required
                    />
                  </Stack>
                  <Stack
                    direction={{ sx: 'column', md: 'row' }}
                    gap={2}
                    justifyContent={{ sx: 'flex-start', md: 'center' }}
                  >
                    <FormMultipleChoiceField<AddWaterFormValues>
                      name="dispenser_type"
                      label="Dispenser Type"
                      options={waterDispenserTypeOptions}
                      fullWidth
                    />
                  </Stack>
                </Stack>
              ) : null}
              {isMobile || page === 2 ? (
                <Stack gap={2}>
                  <Stack
                    direction={{ sx: 'column', md: 'row' }}
                    gap={3}
                    justifyContent={{ sx: 'flex-start', md: 'space-evenly' }}
                  >
                    {!isMobile && (
                      <FormImageUploadField<AddWaterFormValues>
                        name="images"
                        renderContent={() => (
                          <Button
                            sx={{
                              color: 'white',
                              borderRadius: '8px',
                              background: '#5286E9',
                              textTransform: 'capitalize'
                            }}
                          >
                            Choose Image
                          </Button>
                        )}
                      />
                    )}
                    <FormCheckboxListField<AddWaterFormValues>
                      name="tags"
                      label="Helpful info"
                      options={tagOptions}
                      labelPlacement="start"
                    />
                  </Stack>
                  <FormTextField<AddWaterFormValues>
                    name="guidelines"
                    label="Guidelines"
                    helperText="Share tips on respectful PHLASKing at this location."
                    fullWidth
                    multiline
                    minRows={2}
                  />
                </Stack>
              ) : null}
              {isMobile ? (
                <Button
                  loading={isPending}
                  sx={{ background: '#5286E9' }}
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              ) : null}
            </Stack>
            {!isMobile ? (
              <div
                style={{
                  margin: '0 auto',
                  paddingTop: '1.5rem',
                  textAlign: 'center'
                }}
              >
                <IconButton
                  type="button"
                  color="primary"
                  aria-label="Go to previous page"
                  onClick={() => {
                    onPageChange(prev => prev - 1);
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                  type="submit"
                  color="primary"
                  aria-label="Go to next page"
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            ) : null}
          </form>
          <FormDevtools />
        </FormProvider>
      </CardContent>
    </Box>
  );
};

export default AddWaterForm;
