import { useFormContext, type Path, type FieldValues } from 'react-hook-form';

type FormHiddenFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
};

const FormHiddenField = <Values extends FieldValues>({
  name
}: FormHiddenFieldProps<Values>) => {
  const { register } = useFormContext();
  return <input hidden {...register(name)} />;
};

export default FormHiddenField;
