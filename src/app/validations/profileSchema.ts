import { z } from 'zod';

export const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  description: z.string().min(40, "Description must have 20 characters minimum").max(350, "Description must have max 350 characters"),
  profession: z.string().min(1, "Profession is required"),
  category: z.string().min(1, "Category is required"),
  phone: z.string().min(10, "Phone is required").max(25, "Enter a valid phone number"),
  available: z.string().min(1, "Available is required"),
  city: z.string().min(3, "City is required"),
  country : z.string().min(1, "Country selection is required"),
  hiring : z.string().min(1, "This field is required"),
  looking_for: z.string().min(1, "This field is required"),
  company : z.string().min(1, "This field is required"),
  role: z.string().min(1, "This field is required"),
  experience: z.string(),
  avatar: z
    .instanceof(FileList)
    .refine(files => files.length > 0, {
      message: "You must select a profile picture",
    })
    .optional(),
})