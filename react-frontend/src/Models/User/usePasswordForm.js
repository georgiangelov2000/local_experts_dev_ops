import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import apiService from '../../Services/apiService';
import { useState } from 'react';

const schema = yup.object().shape({
  current: yup.string().required('Current password is required'),
  next: yup.string().required('New password is required').min(6, 'Password must be at least 6 characters'),
  confirm: yup.string().oneOf([yup.ref('next'), null], 'Passwords must match'),
});

export function usePasswordForm() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await apiService.changePassword({
        current_password: data.current,
        password: data.next,
        password_confirmation: data.confirm,
      });
      setSuccess('Password updated successfully.');
      reset();
    } catch (e) {
      setError('Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    formState,
    onSubmit,
    loading,
    error,
    success,
  };
} 