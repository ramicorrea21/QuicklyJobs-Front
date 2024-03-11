import {z} from 'zod'

export const postSchema = z.object({
    title : z.string().min(10, "Title must have 10 characters min."),
    category : z.string().min(1, "Category is required"),
    description : z.string().min(25, "Description must have 25 characters min").max(250, "Description must have max 250 characters."),
    remote : z.string().min(1, "Select an option"),
    price_min: z.string().min(1, "Enter a valid price range").max(6, "Enter a valid price range"),
    price_max: z.string().min(1, "Enter a valid price range").max(6, "Enter a valid price range"),
    images: z
    .instanceof(FileList)
    .refine(files => files.length > 0, {
      message: "You must select a profile picture",
    })
    .optional(),
})