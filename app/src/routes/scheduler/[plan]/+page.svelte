<script lang="ts">
    import {onMount} from "svelte";
    import {
        authenticateToken,
        getIncompletePlan,
        getUserByID,
        postIncompletePlan,
        postSchedule,
        updateIncompletePlan
    } from "$lib/api.js";
    import {availableDates} from "$lib/stores.js";

    const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
    const incompletePlanID = window.location.pathname.split('/')[2];

    let userID: String;
    let user: User;
    let incompletePlan: Incomplete;

    const handleConfirmClick = async () => {
        // TODO: Change to actual error
        if (!$availableDates || $availableDates.length === 0) {
            alert('Please select at least one date');
            return;
        }
        const scheduleId = await postSchedule(url, userID, availableDates);
        await updateIncompletePlan(url, {
            ...incompletePlan,
            schedules: [...incompletePlan.schedules, scheduleId]
        });

        // TODO: Change to confirm page
        window.location.href = `/`;
    }


    onMount(async () => {
      const token = localStorage.getItem('token');
      incompletePlan = await getIncompletePlan(url, incompletePlanID);
      if (token) {
        const tokenResults = await authenticateToken(url, token);
        userID = tokenResults.id;
      } else {
        window.location.href = '/';
      }
    });
</script>

<div class="flex flex-row justify-evenly">
    <!-- Temporary link "generated" -->
    <button on:click={ () => handleConfirmClick() } class="bg-primary py-2 px-10 rounded text-lg">Confirm</button>
</div>
