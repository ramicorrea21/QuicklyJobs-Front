import {z} from 'zod'

export const userSchema = z.object({
    user_email : z.string().email({
        message : "Please enter a valid email"
    }),
    password: z.string().min(6, {
        message : "Password must be at least 6 characters long"
    }),
    confirm_password: z.string().min(6, {
        message : "Password must be at least 6 characters long"
    }),
    user_handle: z.string().min(5,{
        message: "Username must have min 5 characters"
    }).max(20,{
        message : "Username must be less than 20 characters long"
    })
}).refine(data => data.password === data.confirm_password, {
    message: "Passwords must match", 
    path : ["confirm_password"]
})