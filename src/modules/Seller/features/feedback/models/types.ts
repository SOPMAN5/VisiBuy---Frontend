import {
  VALIDATION_INVALID_FIELD,
  VALIDATION_MAX_LENGTH,
  VALIDATION_MIN_LENGTH,
  VALIDATION_REQUIRED,
} from "@/lib/systemConfig";
import { z, ZodType } from "zod";

export interface FeedbackDto {
  fullName: string;
  email: string;
  message: string;
}

export const FeedbackSchema: ZodType<FeedbackDto> = z.object({
  email: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Email"),
    })
    .email({
      message: VALIDATION_INVALID_FIELD.replace("{{FIELD}}", "Email"),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Email"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Email"),
    }),
  fullName: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Firstname"),
      invalid_type_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Full Name"),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Firstname"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Firstname"),
    }),
  message: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Firstname"),
      invalid_type_error: VALIDATION_INVALID_FIELD.replace(
        "{{FIELD}}",
        "Firstname"
      ),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Firstname"),
    })
    .max(200, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Firstname"),
    }),
});
