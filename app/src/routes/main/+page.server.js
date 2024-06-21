import { incompletePlan } from "$lib/data.js";

export async function load() {
  // TODO: Use cookies to save current User ID
  const userID = "6673b2f5e514d10c958207fd"
  const response = await fetch(`http://localhost:3000/plans/host/${userID}`);
  const userPlans = await response.json();

  console.log(userPlans);
  return {
    upcoming: userPlans,
    incomplete: incompletePlan.map((plan) => {
      return {
        ...plan,
      }
    }),
  }
}
