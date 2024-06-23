
export async function load() {
  // TODO: Use cookies to save current User ID
  const userID = "6673b2f5e514d10c958207fd"
  let response = await fetch(`http://localhost:3000/plans/user/${userID}`);
  const userPlans = await response.json();

  response = await fetch(`http://localhost:3000/incomplete/user/${userID}`);
  const incompletePlans = await response.json();

  console.log(userPlans);
  return {
    upcoming: userPlans,
    incomplete: incompletePlans
  }
}
