import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from  '@/modules/Auth/lib/service'
import {SellerSchema } from "../models/types";
export function useCreateSeller() {
    return useMutation({
      mutationFn: (input: SellerSchema) => AuthService.registerSeller(input),
    });
  }