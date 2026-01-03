import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IconButton, Stack, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useIsMobile from 'hooks/useIsMobile';
import { useToolbarContext } from 'contexts/ToolbarContext';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import FormMultipleChoiceField from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';
import { zodResolver } from '@hookform/resolvers/zod';
import FormImageUploadField from 'components/forms/FormImageUploadField/FormImageUploadField';
import { ResourceType } from 'hooks/useResourceType';
import FormHiddenField from 'components/forms/FormHiddenField/FormHiddenField';
import FormCheckboxListField from 'components/forms/FormCheckboxListField/FormCheckboxListField';
import FormResourceAddressField from 'components/forms/FormAddressField/FormResourceAddressField';
import type { ResourceEntry } from 'types/ResourceEntry';
import useAddResourceMutation from 'hooks/mutations/useAddResourceMutation';
import ResourceEntryTypeField from 'components/forms/ResourceEntryTypeField/ResourceEntryTypeField';
import ResourceFormLayout from '../ResourceFormLayout';
import type { WaterFormValues } from 'schemas/waterResourceSchema';
import waterResourceSchema from 'schemas/waterResourceSchema';

type AddWaterFormProps = {
  onGoBack: VoidFunction;
  onComplete: VoidFunction;
};

const defaultValues: WaterFormValues = {
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

  const methods = useForm<WaterFormValues>({
    defaultValues,
    resolver: zodResolver(waterResourceSchema)
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

  const onSubmit = (values: WaterFormValues) => {
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
    <ResourceFormLayout title="Add a water resource" onClose={onClose}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormHiddenField<WaterFormValues> name="resource_type" />
          <FormHiddenField<WaterFormValues> name="version" />
          <FormHiddenField<WaterFormValues> name="last_modifier" />
          <FormHiddenField<WaterFormValues> name="status" />
          <FormHiddenField<WaterFormValues> name="creator" />
          <Stack gap={2}>
            {isMobile || page === 1 ? (
              <Stack gap={2}>
                {isMobile && (
                  <FormImageUploadField<WaterFormValues>
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
                  <FormTextField<WaterFormValues>
                    name="name"
                    label="Name"
                    helperText="Enter a name for the resource. (Example: City Hall)"
                    required
                    fullWidth
                  />
                  <FormResourceAddressField label="Street Address" fullWidth />
                </Stack>
                <Stack
                  direction={{ sx: 'column', md: 'row' }}
                  gap={2}
                  justifyContent={{ sx: 'flex-start', md: 'center' }}
                >
                  <FormTextField<WaterFormValues>
                    name="description"
                    label="Description"
                    fullWidth
                  />
                  <ResourceEntryTypeField />
                </Stack>
                <Stack
                  direction={{ sx: 'column', md: 'row' }}
                  gap={2}
                  justifyContent={{ sx: 'flex-start', md: 'center' }}
                >
                  <FormMultipleChoiceField<WaterFormValues>
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
                    <FormImageUploadField<WaterFormValues>
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
                  <FormCheckboxListField<WaterFormValues>
                    name="tags"
                    label="Helpful info"
                    options={tagOptions}
                    labelPlacement="start"
                  />
                </Stack>
                <FormTextField<WaterFormValues>
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
      </FormProvider>
    </ResourceFormLayout>
  );
};

export default AddWaterForm;
