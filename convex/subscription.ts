import { query } from "./_generated/server";
import {v} from "convex/values";

export const hasEntitlement=query({
  args:{userId:v.id("users")},
   handler:async(ctx, {userId})=> {
     const now=Date.now();
     for await (const subscription of ctx.db.query("subscriptions").withIndex("by_userId",(q)=>q.eq("userId",userId))){
      const status=String(subscription.status || '').toLowerCase();
      const periodEnd = subscription.currentPeriodEnd ? Number(subscription.currentPeriodEnd) : null;
      const periodOk=periodEnd == null || periodEnd > now;
      if(status == "active" && periodOk){
        return true;
      }

     }
     return false;
  },
})