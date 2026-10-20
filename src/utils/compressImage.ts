import Compressor from 'compressorjs';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 2048;

const renameToJpeg = (blob: Blob, original: File) => {
  const baseName = original.name.replace(/\.[^.]+$/, '') || 'image';
  return new File([blob], `${baseName}.jpeg`, {
    type: blob.type,
    lastModified: original.lastModified
  });
};

const compressToBlob = (file: File) =>
  new Promise<Blob>((resolve, reject) => {
    new Compressor(file, {
      maxWidth: MAX_IMAGE_DIMENSION,
      maxHeight: MAX_IMAGE_DIMENSION,
      mimeType: 'image/jpeg',
      convertSize: MAX_IMAGE_BYTES,
      quality: 0.8,
      success: resolve,
      error: reject
    });
  });

const compressImage = async (file: File): Promise<File> => {
  const isCompressibleImage =
    file.type.startsWith('image/') && file.type !== 'image/gif';

  if (!isCompressibleImage || file.size <= MAX_IMAGE_BYTES) {
    return file;
  }

  const compressed = await compressToBlob(file);

  return renameToJpeg(compressed, file);
};

export default compressImage;
