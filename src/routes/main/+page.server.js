import { upcomingPlans, incompletePlan } from "$lib/data.js";

export function load() {
  return {
    upcoming: upcomingPlans.map((plan) => {
      return {
        ...plan,
        date: new Date(plan.date),
      }
    }),
    incomplete: incompletePlan.map((plan) => {
      return {
        ...plan,
      }
    }),
  }
}
