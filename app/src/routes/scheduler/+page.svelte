<script>
    import { availableDates } from "$lib/stores.js";

    const url = process.env.PUBLIC_API_BASE_URL

    // TODO: Change temporary user ID to actual user ID with cookies
    const name = 'Pet'
    const userID = '6673b2f5e514d10c958207fd'

    const postIncompletePlan = async () => {
        event.preventDefault();
        const response = await fetch(url + '/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                planName: sessionStorage.getItem('planName'),
                planDescription: sessionStorage.getItem('planDescription'),
                schedules: $availableDates
            })
        });
        const result = await response.json();
        console.log(result);
    }

    const postSchedule = async () => {
      event.preventDefault();
      const response = await fetch(url + '/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: userID,
          name: name,
          schedules: $availableDates
        })
      });
      const result = await response.json();
      console.log(result);
    }

    const handleConfirmClick = () => {
        // This is where the selected dates are sent to the server
        console.log($availableDates, sessionStorage.getItem('planName'), sessionStorage.getItem('planDescription'));

    }
</script>

<div class="flex flex-row justify-evenly">
    <!-- Temporary link "generated" -->
    <!--<a href="/share/420" class="bg-primary py-2 px-10 rounded text-lg">Confirm</a> -->
    <button on:click={ () => handleConfirmClick() } class="bg-primary py-2 px-10 rounded text-lg">Confirm</button>
</div>
