import { z } from 'zod';

export const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  description: z.string().min(20, "Description must have 20 characters minimum"),
  profession: z.string().min(1, "Profession is required"),
  category: z.string().min(1, "Category is required"),
  phone: z.string().min(1, "Phone is required"),
  available: z.string().min(1, "Available is required"),
  city: z.string().min(1, "City selection is required"),
  state: z.string().min(1, "State selection is required"),
  avatar: z
    .instanceof(FileList)
    .refine(files => files.length > 0, {
      message: "You must select a profile picture",
    })
    .optional(),
})