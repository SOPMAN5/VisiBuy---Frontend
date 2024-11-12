import {
  RESPONSE_ERROR_INVALID_DETAILS,
  VALIDATION_MAX_LENGTH,
  VALIDATION_MIN_LENGTH,
  VALIDATION_REQUIRED,
} from "@/lib/systemConfig";
import { ErrorResponse } from "@/types/error";
import { z, ZodType } from "zod";
export interface SignupCredentials{
  email: string;
  password: string;
  confirmPassword:string;
  phone:string;
  role:Role;
}
export interface LoginCredentials {
  email: string;
  password: string;
  role:Role;
  isRemeberChecked?:boolean
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
export interface LoginResponse {
  msg: string;
  token: string;
}
export interface LoginErrorResponse extends ErrorResponse{
}
export type Role = "buyer" | "seller";

export type RegisterResponse = {
  userId: string;
  token: string;
};

export type newUser = {
  fn: string;
  ln: string;
  mn?: string;
  address: string;
  email: string;
  password: string;
  phone: string;
};
export const LoginSchema:ZodType<LoginCredentials> = z.object({
  email: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Email"),

    })
    .email({message:RESPONSE_ERROR_INVALID_DETAILS.replace(
      "{{FIELD}}",
      "Email")})
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Email"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Email"),
    }),
  password: z
  .string({
    required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Password"),

  })
  .min(2, {
    message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Password"),
  }),
  isRememberChecked: z
  .boolean({
    required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Remember"),

  }).optional(),
  role:z.enum(['buyer','seller'],{required_error:VALIDATION_REQUIRED.replace("{{FIELD}}", "Role")})
})
export const UserSchema: ZodType<newUser> = z.object({
  fn: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Firstname"),
      invalid_type_error: RESPONSE_ERROR_INVALID_DETAILS.replace(
        "{{FIELD}}",
        "Firstname"
      ),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Firstname"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Firstname"),
    }),
  ln: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Lastname"),
      invalid_type_error: RESPONSE_ERROR_INVALID_DETAILS.replace(
        "{{FIELD}}",
        "Lastname"
      ),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Lastname"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Lastname"),
    }),
  mn: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Middlename"),
      invalid_type_error: RESPONSE_ERROR_INVALID_DETAILS.replace(
        "{{FIELD}}",
        "Middlename"
      ),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Middlename"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Middlename"),
    })
    .optional(),
  
  address: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Address"),
      invalid_type_error: RESPONSE_ERROR_INVALID_DETAILS.replace(
        "{{FIELD}}",
        "Address"
      ),
    })
    .min(8, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Address"),
    })
    .max(200, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Address"),
    }),
  
  phone: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Phone"),
      invalid_type_error: RESPONSE_ERROR_INVALID_DETAILS.replace(
        "{{FIELD}}",
        "Phone"
      ),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Phone"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Phone"),
    }),
  
  email: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Email"),

    })
    .email({message:RESPONSE_ERROR_INVALID_DETAILS.replace(
      "{{FIELD}}",
      "Email")})
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Email"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Email"),
    }),
  password: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Password"),

    })
    .min(8, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Password"),
    })
   
  
});

export type BuyerSchema = z.infer<typeof UserSchema>;
export type SellerSchema = z.infer<typeof UserSchema>;