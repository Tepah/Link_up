import { incompletePlan } from "$lib/data.js";

export function load() {
  return {
    plan: incompletePlan[0],
  }
}
