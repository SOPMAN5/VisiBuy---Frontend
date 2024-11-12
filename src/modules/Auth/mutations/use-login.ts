import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from  '@/modules/Auth/lib/service'
import { LoginCredentials } from "@/modules/Auth/models/types";
import { getMeQueryKey } from "@/modules/Auth/queries/queries";
import { useAppDispatch } from "@/hooks/app-hooks";
import { useNavigate } from "react-router-dom";
import { setCredentials, setError } from "../features/slices";
export function useLogin() {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return useMutation({
      mutationFn: (credentials: LoginCredentials) => AuthService.login(credentials),
      onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: getMeQueryKey() });
      dispatch(setCredentials(data));
      dispatch(setError(null));
      navigate('/dashboard');
      },
    });
  }

  