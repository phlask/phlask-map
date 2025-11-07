type FormatFileSizeOptions = {
  standard?: 'binary' | 'si';
};

const formatFileSize = (
  bytes: number,
  decimals = 1,
  options: FormatFileSizeOptions = {}
) => {
  if (bytes === 0) return '0 B';

  const { standard = 'binary' } = options;
  const k = standard === 'si' ? 1000 : 1024;
  const sizes =
    standard === 'si'
      ? ['B', 'kB', 'MB', 'GB', 'TB', 'PB']
      : ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
  return `${size} ${sizes[i]}`;
};

export default formatFileSize;
