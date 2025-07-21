import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';

interface User {
  id: number;
  name: string;
  email: string;
}


// hear are some examples of api integrated using apiClient 

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => apiClient('/users'),
  });
};

export const useUser = (id: number) => {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => apiClient(`/users/${id}`),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: { name: string; email: string }) =>
      apiClient('/users', {
        method: 'POST',
        body: data,
      }),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: { id: number; name: string; email: string }) =>
      apiClient(`/users/${data.id}`, {
        method: 'PUT',
        body: data,
      }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      apiClient(`/users/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
