import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Card, FormControl, TextField, Button } from '@mui/material';

const AddBathroomV2 = props => {
  const { handleSubmit, register } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Modal visible={true} title={'Title'} footer={'Footer'}>
        <Card></Card>
      </Modal> */}

      <FormControl>
        <TextField
          label="First Name"
          variant="outlined"
          {...register('firstName')}
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Last Name"
          variant="outlined"
          {...register('lastName')}
        />
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AddBathroomV2;
