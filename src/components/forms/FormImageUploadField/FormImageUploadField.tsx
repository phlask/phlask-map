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
import compressImage, { MAX_IMAGE_BYTES } from 'utils/compressImage';
import formatFileSize from 'utils/formatFileSize';

type FormImageUploadFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  accept?: Accept;
  maxFiles?: number;
  renderContent?: (config: RenderContentConfig) => ReactNode;
};

const defaultAccept = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif']
} satisfies Accept;

const compressionHelperText = `Images over ${formatFileSize(
  MAX_IMAGE_BYTES
)} are compressed automatically`;

const FormImageUploadField = <Values extends FieldValues>({
  name,
  accept = defaultAccept,
  maxFiles = 1,
  renderContent = () => null
}: FormImageUploadFieldProps<Values>) => {
  const { control } = useFormContext();
  const { mutate: uploadImage } = useUploadImageMutation();
  const { field } = useController({ control, name });

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles.at(0);
    if (!file) {
      return;
    }

    const image = await compressImage(file).catch(() => file);

    uploadImage(image, {
      onSuccess: data => field.onChange([data])
    });
  };

  return (
    <ImageUploader
      onDrop={onDrop}
      accept={accept}
      maxFiles={maxFiles}
      helperText={compressionHelperText}
      renderContent={renderContent}
    />
  );
};

export default FormImageUploadField;
