import { Box, type BoxProps } from '@mui/material';
import {
  useFormContext,
  type FieldValues,
  type SubmitHandler
} from 'react-hook-form';
import type { ReactNode } from 'react';

type FormWrapperProps<Values extends FieldValues> = {
  children: ReactNode;
  onSubmit: SubmitHandler<Values>;
} & Omit<BoxProps<'form'>, 'component' | 'onSubmit'>;

const FormWrapper = <Values extends FieldValues>({
  children,
  onSubmit,
  ...boxProps
}: FormWrapperProps<Values>) => {
  const { handleSubmit } = useFormContext<Values>();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default FormWrapper;
