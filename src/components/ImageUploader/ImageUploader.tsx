import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import fileSizePretty from 'utils/formatFileSize';
import { Upload } from 'icons';

export type RenderContentConfig = {
  isDragActive?: boolean;
};

type ImageUploaderProps = Pick<
  DropzoneOptions,
  'accept' | 'maxSize' | 'maxFiles' | 'onDrop'
> & {
  renderContent?: (config: RenderContentConfig) => ReactNode;
};

const ImageUploader = ({
  onDrop,
  accept,
  maxSize,
  maxFiles,
  renderContent = () => null
}: ImageUploaderProps) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      maxFiles
    });
  return (
    <Stack alignItems="center" gap={2} {...getRootProps()}>
      <input {...getInputProps()} />
      <Upload fontSize={55} />
      <Stack>
        <Typography fontSize={14} color="#60718C">
          {maxSize ? `Max file size: ${fileSizePretty(maxSize)}` : null}
        </Typography>
        <Typography fontSize={14} color="#60718C">
          {accept
            ? `accepted: ${Object.values(accept)
                .flatMap(value => value.join(' | ').replaceAll('.', ''))
                .join(' | ')}`
            : null}
        </Typography>
        <Typography
          maxWidth={'22ch'}
          textOverflow="ellipsis"
          noWrap
          fontSize={14}
          color="#60718C"
        >
          {acceptedFiles.length
            ? `File: ${acceptedFiles.map(file => file.name).join('\n')}`
            : null}
        </Typography>
      </Stack>
      <Box>{renderContent({ isDragActive })}</Box>
    </Stack>
  );
};

export default ImageUploader;
