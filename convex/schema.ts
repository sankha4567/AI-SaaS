//1:25:05
import { defineSchema,defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
 import {v} from "convex/values";
import { Inspiration } from "next/font/google";

const schema = defineSchema({
  ...authTables,
  // Your other tables...
   subscriptions:defineTable({
      userId:v.id("users"),
      polarCustomerId:v.string(),
      polarSubscriptionId:v.string(),
      productId:v.optional(v.string()),
      priceId:v.optional(v.string()),
      planCode:v.optional(v.string()),
      status:v.string(),
      currentPeriodEnd:v.optional(v.string()),
      trialEndsAt:v.optional(v.string()),
      cancelAt:v.optional(v.number()),
      canceldAt:v.optional(v.number()),
      seats:v.optional(v.number()),
      metaData:v.optional(v.any()),
      creditsBalance:v.number(),
      creditsGrantPerPeriod:v.number(),
      creditsRollOverLimit:v.number(),
      lastGrantCursor:v.optional(v.string())

   })
   .index("by_userId",["userId"])
   .index("by_polarSubscriptionId",["polarSubscriptionId"])
   .index("by_status",["status"]),
   credits_grants:defineTable({
       userId:v.id("users"),
       subscriptionId:v.id("subscriptions"),
       amount:v.number(),
       type:v.number(),
       reason:v.optional(v.string()),
       idempotencyKey:v.optional(v.string()),
       meta:v.optional(v.any())
   })
   .index("by_subscriptionId",["subscriptionId"])
   .index("by_userId",["userId"])
   .index("by_idempotencyKey",["idempotencyKey"]),

  credits_ledger:defineTable({
    userId:v.id("users"),
    subscriptionId:v.id("subscription"),
    amount:v.number(),
    type:v.string(),
    //grant | consume | adjust
    reason:v.optional(v.string()),
    idempotencyKey:v.optional(v.string()),
    meta:v.optional(v.any())


  })
   .index("by_subscriptionId",["subscriptionId"])
   .index("by_userId",["userId"])
   .index("by_idempotencyKey",["idempotencyKey"]),
  projects:defineTable({
     userId:v.id("users"),
     title:v.string(),
     description:v.optional(v.string()),
     styleGuide:v.optional(v.string()),
     sketchesData:v.any(),
     //json structure matching redux shapes
     viewportData:v.optional(v.any()),
     //json structure for viewport state
     generatedDesignData:v.optional(v.any()),
     //json structure for generated UI components
     thumbnail:v.optional(v.string()),
     //url for project thumbnail
     moodBoardImages:v.optional(v.array(v.string())),
     //Array for storage IDS for mood
     inspirationImages:v.optional(v.array(v.string())),
     //Array of  storage IDS for inspirational images
     lastmodified:v.number(),
     //project updation timestamp
     createdAt:v.number(),
     //project creation timestamp
     isPublic:v.optional(v.boolean()),

     tags:v.optional(v.array(v.string())),
     //forr categorization
     projectNumber:v.number()
     //Auto-incrementing project number per user

  }).index("by_userId",["userId"]),
  project_counters:defineTable({
    userId:v.id("users"),
    nextProjectNumber:v.number(),
  }).index("by_userId",["userId"]),

  })

export default schema;