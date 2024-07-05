
export async function load() {
  // TODO: Use cookies to save current User ID
  const userID = "6673b2f5e514d10c958207fd"
  let response = await fetch(`http://localhost:3000/plans/user/${userID}`);
  const userPlans: [Plan] = await response.json();
  userPlans.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  response = await fetch(`http://localhost:3000/incomplete/user/${userID}`);
  const incompletePlans: [Incomplete] = await response.json();

  return {
    upcoming: userPlans,
    incomplete: incompletePlans
  }
}
