import FormHiddenField from 'components/forms/FormHiddenField/FormHiddenField';
import type { BaseResourceSchema } from 'schemas/baseResourceSchema';

const ResourceDefaultFields = () => {
  return (
    <>
      <FormHiddenField<BaseResourceSchema> name="resource_type" />
      <FormHiddenField<BaseResourceSchema> name="version" />
      <FormHiddenField<BaseResourceSchema> name="last_modifier" />
      <FormHiddenField<BaseResourceSchema> name="last_modified" />
      <FormHiddenField<BaseResourceSchema> name="source.type" />
      <FormHiddenField<BaseResourceSchema> name="status" />
      <FormHiddenField<BaseResourceSchema> name="creator" />
      <FormHiddenField<BaseResourceSchema> name="date_created" />
      <FormHiddenField<BaseResourceSchema> name="verification.last_modified" />
      <FormHiddenField<BaseResourceSchema> name="verification.verified" />
      <FormHiddenField<BaseResourceSchema> name="verification.verifier" />
    </>
  );
};

export default ResourceDefaultFields;
