import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { Upload } from 'icons';

export type RenderContentConfig = {
  isDragActive?: boolean;
};

type ImageUploaderProps = Pick<
  DropzoneOptions,
  'accept' | 'maxFiles' | 'onDrop'
> & {
  helperText?: ReactNode;
  renderContent?: (config: RenderContentConfig) => ReactNode;
};

const ImageUploader = ({
  onDrop,
  accept,
  maxFiles,
  helperText,
  renderContent = () => null
}: ImageUploaderProps) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept,
      maxFiles
    });
  return (
    <Stack alignItems="center" gap={2} {...getRootProps()}>
      <input {...getInputProps()} />
      <Upload fontSize={55} />
      <Stack>
        {helperText ? (
          <Typography fontSize={14} color="#60718C">
            {helperText}
          </Typography>
        ) : null}
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
