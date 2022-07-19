import {
  Input,
  Button,
  Textarea,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

interface FormValues {
  title: string;
  text: string;
}

const AlertPop = (props: Partial<FormValues>) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{props.title}</AlertTitle>
    </Alert>
  );
};

interface FormProps {
  onSubmit: (data: FormValues) => void;
  formData?: Partial<FormValues>;
}

export const Form = ({ onSubmit, formData }: FormProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: formData,
  });

  const handler = (data: FormValues) => {
    onSubmit(data);
  };

  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(handler)}>
      <ModalBody>
        <Input
          variant="flushed"
          type="text"
          placeholder="Title"
          {...register('title', {
            required: { value: true, message: 'Must not be empty' },
            minLength: { value: 3, message: 'Too short' },
            maxLength: { value: 1024, message: 'Too long' },
          })}
        />
        {errors.title && <AlertPop title={errors.title.message || ''} />}
        <Textarea
          variant="flushed"
          placeholder="Text"
          {...register('text', {
            required: { value: true, message: 'Must not be empty' },
            minLength: { value: 3, message: 'Too short' },
            maxLength: { value: 1024, message: 'Too long' },
          })}
        />
        {errors.text && <AlertPop title={errors.text.message || ''} />}
      </ModalBody>
      <ModalFooter>
        <Button
          borderRadius="md"
          bg="green.300"
          _hover={{ bg: 'green.400' }}
          type="submit"
        >
          Submit
        </Button>
      </ModalFooter>
    </form>
  );
};
