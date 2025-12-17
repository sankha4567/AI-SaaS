import { getAuthUserId } from "@convex-dev/auth/server";
import { query, QueryCtx } from "./_generated/server";

export const getCurrentUser=query({
 args:{},
 handler:async(ctx:QueryCtx)=>{
   const userId=await getAuthUserId(ctx);
   if(!userId){
    return null;
   }
   const user=await ctx.db.get(userId);
   return user;
 }
});