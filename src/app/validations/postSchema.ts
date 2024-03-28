import { z } from 'zod';

const basePostSchema = z.object({
title : z.string().min(10, "Title must have 10 characters min.").max(40, 'Title can only have max 40 characters'),
category : z.string().min(1, "Category is required"),
description : z.string().min(25, "Description must have 25 characters min").max(350, "Description must have max 350 characters."),
remote : z.string().min(1, "Select an option"),
price_min: z.string().min(1, "Enter a valid price range").max(6, "Enter a valid price range"),
price_max: z.string().min(1, "Enter a valid price range").max(6, "Enter a valid price range"),
  images: z.any().optional()
});

// Extiende el esquema base con validaciones específicas del cliente
export const postSchema = typeof window !== 'undefined'
  ? basePostSchema.extend({
      images: z.instanceof(FileList)
        .refine(files => files.length > 0, {
          message: "You must select a profile picture",
        })
    })
  : basePostSchema;
