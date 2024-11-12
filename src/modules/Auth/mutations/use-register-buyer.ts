import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from  '@/modules/Auth/lib/service'
import { BuyerSchema } from "../models/types";
export function useCreateBuyer() {
    return useMutation({
      mutationFn: (input: BuyerSchema) => AuthService.registerBuyer(input),
    });
  }