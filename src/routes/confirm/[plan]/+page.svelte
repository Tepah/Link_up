<script lang="ts">
    import Calendar from '$lib/components/Calendar_2.svelte';
    export let data;

    let selectedDate: Date | null = null;
    let availableDates: Date[] = [];
    let copiedToClipboard: boolean = false;

    const findCommonDates = () => {
        let firstArray = data.plan.schedules[0].available.map(date => new Date(date));
        const allSchedules = data.plan.schedules.map(schedule => schedule.available).map(schedule => schedule.map(date => new Date(date)));

        return firstArray.filter(date1 =>
            allSchedules.every(array =>
                array.some(date2 =>
                    date1.getTime() === date2.getTime()
                )
            )
        );
    };

    const copyToClipboard = async () => {
        const textToCopy: string | null | undefined = document.querySelector('.schedule_link')?.textContent;
        await navigator.clipboard.writeText(textToCopy);
        copiedToClipboard = true;
        setTimeout(() => {
            copiedToClipboard = false;
        }, 3000);
    }

    const handleScheduleClick = () => {
        window.location.href = '/confirm/420/created'
    }

    availableDates = findCommonDates();
</script>

<div class="flex flex-col space-y-6 h-[100%] w-[100%]">
    <div class="relative">
        <a href="/scheduler" class="absolute top-0 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </a>
    </div>
    <div class="flex flex-col pt-20 md:pt-0">
        <p class="text-lg">Choose a time for the plan: </p>
        <p>based on <span class="text-accent">{data.plan.schedules.length} schedules</span></p>
        <Calendar selectedDate={selectedDate} availableDates={availableDates} />
    </div>
    <div class="flex flex-row justify-evenly">
        <button on:click={() => handleScheduleClick()} class="bg-primary py-2 px-10 rounded text-lg">Schedule</button>
    </div>
    <div class="flex flex-col pt-5 space-y-2 items-center">
        <p class="text-lg">Share link for more availability</p>
        <button class="schedule_link shadow shadow-accent py-1 px-4 rounded" on:click={copyToClipboard}>
            linkup.w/me/scheduler/420
        </button>
        {#if copiedToClipboard}
            <p class="copied-text text-accent">Copied to clipboard!</p>
        {/if}
    </div>
</div>

<style>
    .copied-text {
        animation: fadeOut 2.5s ease-in forwards;
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: rotate(0deg) translateY(0px);
        }
        50% {
            opacity: 1;
            transform: rotate(0deg) translateY(0px);
        }
        75% {
            opacity: 0.5;
            transform: rotate(5deg) translateY(15px);
        }
        100% {
            opacity: 0;
            transform: rotate(-5deg) translateY(30px);
        }
    }
</style>
