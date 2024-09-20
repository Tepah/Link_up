<script lang="ts">
    import { availableDates } from "$lib/stores.js";
    import {
        postSchedule,
        postIncompletePlan,
        authenticateToken,
        getIncompletePlan
    } from "$lib/api";
    import {onMount} from "svelte";

    const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;

    let userID: String;

    const handleConfirmClick = async () => {
        if (!$availableDates || $availableDates.length === 0) {
            alert('Please select at least one date');
            return;
        }
        // This is where the selected dates are sent to the server
        const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
        const scheduleId = await postSchedule(url, userID, availableDates);
        const incompletePlanID = await postIncompletePlan(url,
            userID,
            sessionStorage.getItem('planName'),
            sessionStorage.getItem('planDescription'),
            [scheduleId]);

        sessionStorage.removeItem('planName');
        sessionStorage.removeItem('planDescription');
        sessionStorage.setItem('incompletePlanID', incompletePlanID);
        window.location.href = `/share/${incompletePlanID}`;
    }

    onMount (async () => {
        const token = localStorage.getItem('token');
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
    <!--<a href="/share/420" class="bg-primary py-2 px-10 rounded text-lg">Confirm</a> -->
    <button on:click={ () => handleConfirmClick() } class="bg-primary py-2 px-10 rounded text-lg">Confirm</button>
</div>
