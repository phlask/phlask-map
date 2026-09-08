import { DevTool } from '@hookform/devtools';
import { useFormContext } from 'react-hook-form';

const FormDevtools = () => {
  const { control } = useFormContext();
  return <DevTool control={control} />;
};

export default FormDevtools;
