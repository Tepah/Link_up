import { upcomingPlans } from "$lib/data.js";

export function load() {
  return {
    plan: upcomingPlans[0]
  }
}
