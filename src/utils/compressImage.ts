import imageCompression from 'browser-image-compression';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 2048;

const renameToJpeg = (file: File) => {
  const baseName = file.name.replace(/\.[^.]+$/, '') || 'image';
  return new File([file], `${baseName}.jpeg`, {
    type: file.type,
    lastModified: file.lastModified
  });
};

const compressImage = async (file: File): Promise<File> => {
  const isCompressibleImage =
    file.type.startsWith('image/') && file.type !== 'image/gif';

  if (!isCompressibleImage || file.size <= MAX_IMAGE_BYTES) {
    return file;
  }

  const compressed = await imageCompression(file, {
    maxSizeMB: MAX_IMAGE_BYTES / (1024 * 1024),
    maxWidthOrHeight: MAX_IMAGE_DIMENSION,
    fileType: 'image/jpeg',
    useWebWorker: true
  });

  return renameToJpeg(compressed);
};

export default compressImage;
