import ImageUploader, {
  type RenderContentConfig
} from 'components/ImageUploader/ImageUploader';
import useUploadImageMutation from 'hooks/mutations/useUploadImageMutation';
import type { ReactNode } from 'react';
import type { Accept } from 'react-dropzone';
import {
  useController,
  useFormContext,
  type FieldValues,
  type Path
} from 'react-hook-form';

type FormImageUploadFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
  renderContent?: (config: RenderContentConfig) => ReactNode;
};

const defaultAccept = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif']
} satisfies Accept;

const FormImageUploadField = <Values extends FieldValues>({
  name,
  accept = defaultAccept,
  maxSize = 5242880,
  maxFiles = 1,
  renderContent = () => null
}: FormImageUploadFieldProps<Values>) => {
  const { control } = useFormContext();
  const { mutate: uploadImage } = useUploadImageMutation();
  const { field } = useController({ control, name });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles.at(0);
    if (!file) {
      return;
    }
    uploadImage(file, {
      onSuccess: data => field.onChange('images', [data]),
      onError: error => console.log(error)
    });
  };

  return (
    <ImageUploader
      onDrop={onDrop}
      accept={accept}
      maxSize={maxSize}
      maxFiles={maxFiles}
      renderContent={renderContent}
    />
  );
};

export default FormImageUploadField;
