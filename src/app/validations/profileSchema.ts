import { z } from 'zod';

export const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  description: z.string().min(1, "Description is required"),
  profession: z.string().min(1, "Profession is required"),
  category: z.string().min(1, "Category is required"),
  phone: z.string().min(1, "Phone is required"),
  country: z.string().min(1, "Country selection is required"),
  city: z.string().min(1, "City selection is required"),
  province: z.string().min(1, "Province selection is required"),
  avatar: z
    .instanceof(FileList)
    .refine(files => files.length > 0, {
      message: "You must select a profile picture",
    })
    .optional(),
})