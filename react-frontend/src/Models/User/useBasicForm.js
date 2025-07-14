import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import apiService from '../../Services/apiService';
import { useState } from 'react';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email'),
  avatar: yup.string().url('Must be a valid URL').nullable().notRequired(),
});

export function useBasicForm(user) {
  const [avatar, setAvatar] = useState(user.avatar || '');
  const { register, handleSubmit, setValue, formState, reset } = useForm({
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      avatar: user.avatar || '',
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      await apiService.profile(data);
      reset(data, { keepValues: true });
    } catch (e) {
      // Optionally handle error
    }
  };

  return {
    register,
    handleSubmit,
    formState,
    onSubmit,
    avatar,
    setValue,
  };
} 