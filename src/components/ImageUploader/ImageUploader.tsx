import type { ReactNode } from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import fileSizePretty from 'utils/formatFileSize';

type RenderContentConfig = { isDragActive?: boolean };

type ImageUploaderProps = Pick<
  DropzoneOptions,
  'accept' | 'maxSize' | 'maxFiles' | 'onDrop'
> & {
  renderContent: ({ isDragActive }: RenderContentConfig) => ReactNode;
};

const ImageUploader = ({
  onDrop,
  accept,
  maxSize,
  maxFiles,
  renderContent
}: ImageUploaderProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        {maxSize ? `Max file size: ${fileSizePretty(maxSize)}` : null},{' '}
        {accept
          ? `accepted: ${Object.values(accept)
              .flatMap(value => value.join(' | ').replaceAll('.', ''))
              .join(' | ')}`
          : null}
      </p>
      {renderContent({ isDragActive })}
    </div>
  );
};

export default ImageUploader;
