import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser  = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        pictureURL: v.string()
    },
    handler: async (ctx, args) => {
        try {
            const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect();

            if (user.length === 0) {
                const userData = {
                    name: args.name,
                    email: args.email,
                    pictureURL: args.pictureURL || null,
                    credits: 3
                };

                const result = await ctx.db.insert('users', userData);
                return userData;
            }

            return user[0];
        } catch (error) {
            console.error('Error creating new user:', error);
            throw new Error('Failed to create new user. Please try again later.');
        }
    }
});

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