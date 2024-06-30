<script lang="ts">
    import { availableDates } from "$lib/stores.js";
    import { postSchedule, postIncompletePlan } from "$lib/api.ts";

    const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;

    // TODO: Change temporary user ID to actual user ID with cookies
    const name = 'Pet'
    const userID = '6673b2f5e514d10c958207fd'


    const handleConfirmClick = async () => {
        if (!$availableDates || $availableDates.length === 0) {
            alert('Please select at least one date');
            return;
        }
        // This is where the selected dates are sent to the server
        const scheduleId = await postSchedule(url, userID, name, availableDates);
        await postIncompletePlan(url,
            userID,
            sessionStorage.getItem('planName'),
            sessionStorage.getItem('planDescription'),
            [scheduleId]);
        console.log($availableDates, sessionStorage.getItem('planName'), sessionStorage.getItem('planDescription'));
    }
</script>

<div class="flex flex-row justify-evenly">
    <!-- Temporary link "generated" -->
    <!--<a href="/share/420" class="bg-primary py-2 px-10 rounded text-lg">Confirm</a> -->
    <button on:click={ () => handleConfirmClick() } class="bg-primary py-2 px-10 rounded text-lg">Confirm</button>
</div>
