import { useForm as useRHF, useFormContext, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';

export function useForm(schema, defaultValues = {}) {
  const methods = useRHF({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, reset, setValue, getValues, watch, formState: { errors, isSubmitting, isValid, isDirty } } = methods;

  const onSubmit = useCallback((onValid) => handleSubmit(onValid), [handleSubmit]);

  const validateField = useCallback(async (name) => {
    await methods.trigger(name);
  }, [methods]);

  const setFieldValue = useCallback((name, value, options) => {
    methods.setValue(name, value, options);
  }, [methods]);

  const getFieldValue = useCallback((name) => {
    return methods.getValues(name);
  }, [methods]);

  const watchField = useCallback((name) => {
    return methods.watch(name);
  }, [methods]);

  return {
    ...methods,
    handleSubmit: onSubmit,
    reset,
    errors,
    isSubmitting,
    isValid,
    isDirty,
    validateField,
    setFieldValue,
    getFieldValue,
    watchField,
    Controller,
  };
}

export function useFormContextWrapper() {
  const methods = useFormContext();
  if (!methods) {
    throw new Error('useFormContextWrapper must be used within a FormProvider');
  }
  return methods;
}

export { Controller };