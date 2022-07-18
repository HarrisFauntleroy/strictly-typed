import { Debug } from './Debug';
import { VStack, Input, useToast, Box, Button } from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React, { useState } from 'react';
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
  const toast = useToast();
  // Only used for debug
  const [debugData, setDebugData] = useState<FormValues>();

  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: formData,
  });

  const handler = (data: FormValues) => {
    toast({
      title: 'Submitted!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setDebugData(data);
    onSubmit(data);
  };

  const { errors } = formState;

  return (
    <VStack gap={2}>
      <Box>
        <form onSubmit={handleSubmit(handler)}>
          <VStack>
            <Input
              type="text"
              placeholder="Title"
              {...register('title', {
                required: { value: true, message: 'Must not be empty' },
                minLength: { value: 3, message: 'Too short' },
                maxLength: { value: 128, message: 'Too long' },
              })}
            />
            {errors.title && <AlertPop title={errors.title.message || ''} />}
            <Input
              type="text"
              placeholder="Text"
              {...register('text', {
                required: { value: true, message: 'Must not be empty' },
                minLength: { value: 3, message: 'Too short' },
                maxLength: { value: 128, message: 'Too long' },
              })}
            />
            {errors.text && <AlertPop title={errors.text.message || ''} />}
            <Button
              borderRadius="md"
              bg="green.300"
              _hover={{ bg: 'green.400' }}
              type="submit"
            >
              Submit
            </Button>
          </VStack>
        </form>
        {debugData && <Debug data={debugData} />}
      </Box>
    </VStack>
  );
};
