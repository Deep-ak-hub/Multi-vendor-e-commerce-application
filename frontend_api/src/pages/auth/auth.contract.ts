import * as z from "zod"
import { allowedImageTypes, passwordRegex, phoneRegex } from "../../constants/Regex";

export interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  image: FileList;
}

export const credentialsDTO = z
  .object({
    name: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters"),
    email: z.email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(phoneRegex, "Invalid phone number format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain uppercase, lowercase, numbers, and special characters (!@#$%^&*)",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    image: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, "Please select at least one images")
      .refine((files) => files.length <= 10, "Maximum 10 images allowed")
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= 5 * 1024 * 1024),
        "Each images must be less than 5MB",
      )
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            allowedImageTypes.includes(file.type),
          ),
        "Only JPG, PNG and WEBP images are allowed",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterCredentials = z.infer<typeof credentialsDTO>;
