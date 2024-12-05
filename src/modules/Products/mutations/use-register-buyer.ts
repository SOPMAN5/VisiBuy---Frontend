import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from  '@/modules/Auth/lib/service'
import {  SignupCredentials } from "../models/types";
export function useCreateBuyer() {
    return useMutation({
      mutationFn: (input: SignupCredentials) => AuthService.registerBuyer(input),
    });
  }