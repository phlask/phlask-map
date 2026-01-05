import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import CloseButton from './CloseButton/CloseButton';
import { useState, type ReactNode } from 'react';
import noop from 'utils/noop';
import {
  useFormContext,
  type FieldValues,
  type SubmitHandler
} from 'react-hook-form';
import ResourceDefaultFields from './ResourceDefaultFields/ResourceDefaultFields';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormDevtools from 'components/forms/FormDevtools/FormDevtools';

type RenderFormPageFnConfig = {
  imageElement: ReactNode;
  shouldShowImageElement: boolean;
};

type EnderFormPageFn = (config: RenderFormPageFnConfig) => ReactNode;

type ResourceFormLayoutProps<Values extends FieldValues> = {
  onClose?: VoidFunction;
  title?: string;
  debug?: boolean;
  renderPageOne: EnderFormPageFn;
  renderPageTwo: EnderFormPageFn;
  imageElement: ReactNode;
  isSubmitting?: boolean;
  onSubmit?: SubmitHandler<Values>;
  onGoBack?: VoidFunction;
};

const ResourceForm = <Values extends FieldValues>({
  title = 'Add Resource',
  debug = false,
  renderPageOne,
  renderPageTwo,
  imageElement,
  isSubmitting = false,
  onSubmit: submitForm = noop,
  onClose = noop,
  onGoBack = noop
}: ResourceFormLayoutProps<Values>) => {
  const [page, setPage] = useState<1 | 2>(1);
  const isMobile = useIsMobile();

  const { handleSubmit } = useFormContext<Values>();

  const onPageChange = (update: (prev: number) => number) => {
    return setPage(prev => {
      const newValue = Math.max(0, update(prev));
      if (newValue === 0) {
        onGoBack();
      }
      if (newValue !== 1 && newValue !== 2) {
        return prev;
      }

      return newValue;
    });
  };

  const onSubmit = (resource: Values) => {
    const shouldGoToNextPage = !isMobile && page < 2;
    if (shouldGoToNextPage) {
      return onPageChange(prev => prev + 1);
    }

    submitForm(resource);
  };

  const shouldShowPageOne = isMobile || page === 1;
  const shouldShowPageTwo = isMobile || page === 2;
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
          {title}
        </Typography>
        <CloseButton onClick={onClose} color="white" />
      </Box>
      <Box
        sx={{
          maxHeight: isMobile ? undefined : '500px',
          overflow: 'auto',
          padding: '20px'
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
            <ResourceDefaultFields />

            <Stack gap={2}>
              {shouldShowPageOne ? (
                <Stack gap={2}>
                  {renderPageOne({
                    shouldShowImageElement: isMobile,
                    imageElement
                  })}
                </Stack>
              ) : null}
              {shouldShowPageTwo ? (
                <Stack gap={2}>
                  {renderPageTwo({
                    shouldShowImageElement: !isMobile,
                    imageElement
                  })}
                </Stack>
              ) : null}
              {isMobile ? (
                <Button
                  loading={isSubmitting}
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
              <Stack direction="row" justifyContent="center" gap={1}>
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
                  loading={isSubmitting}
                  type="submit"
                  color="primary"
                  aria-label="Go to next page"
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Stack>
            ) : null}
          </Stack>
        </form>
      </Box>
      {debug ? <FormDevtools /> : null}
    </Box>
  );
};

export default ResourceForm;
