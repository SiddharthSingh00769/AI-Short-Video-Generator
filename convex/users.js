import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        pictureURL: v.string()
    },
    handler: async (ctx, args) => {
       //If user already exist??
       const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect();

       if(!user[0]?.email){
        const userData = {
            name: args.name,
            email: args.email,
            pictureURL: args?.pictureURL,
            credits: 3
        }
        //Create new user
        const result = await ctx.db.insert('users', userData);

        return userData;
       }

       return user[0];
    }
})

export const UpdateUserCredits = mutation({
    args: {
        uid: v.id('users'),
        credits: v.number()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args.id, {
            credits: args.credits
        });
        return result;
    }
})