import React from 'react'
import { SubscriptionEntitlementQuery } from '@/convex/query.config';
import { redirect } from 'next/navigation';
import { combinedSlug } from '@/lib/utils';
const page = async() => {
  const {entitlement,profileName} = await SubscriptionEntitlementQuery();
  if(!entitlement._valueJSON){
   // redirect(`/billing/${combinedSlug(profileName!)}`);
   redirect(`/dashboard/${combinedSlug(profileName!)}`);
  }

  redirect(`/dashboard/${combinedSlug(profileName!)}`);
}

export default page;
