<script lang="ts">
    import Calendar from '$lib/components/Calendar_2.svelte';
    import {selectedDate} from '$lib/stores.js';
    import {deleteIncompletePlan, getAllIDsOnSchedules, getAllSchedules, postPlan} from "$lib/api";
    import {onMount} from "svelte";

    const incompletePlan: Incomplete = JSON.parse(String(sessionStorage.getItem('incomplete')));
    const originalDate = $selectedDate;
    const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;

    let availableDates: Date[];
    let copiedToClipboard: boolean = false;
    let noSelectedDate: boolean = false;

    const copyToClipboard = async () => {
        const textToCopy: string | null | undefined = document.querySelector('.schedule_link')?.textContent;
        if (!textToCopy) return;
        await navigator.clipboard.writeText(textToCopy);
        copiedToClipboard = true;
        setTimeout(() => {
            copiedToClipboard = false;
        }, 3000);
    }

    const handleScheduleClick = async () => {
        if ($selectedDate === originalDate) {
            noSelectedDate = true;
            setTimeout(() => {
                noSelectedDate = false;
            }, 3000);
            return;
        }
        sessionStorage.setItem('selectedDate', $selectedDate.toString());
        const attending: [String] = await getAllIDsOnSchedules(url, incompletePlan.schedules);

        let plan = {
            title: incompletePlan.title,
            description: incompletePlan.description,
            date: $selectedDate,
            attending: attending,
            host: incompletePlan.host,
        }

        const returnPlan = await postPlan(url, plan);
        await deleteIncompletePlan(url, incompletePlan._id);
        sessionStorage.removeItem('incomplete');
        sessionStorage.setItem('plan', JSON.stringify(returnPlan));
        window.location.href = '/confirm/420/created'
    }

    onMount(async () => {
        const incompletePlan = JSON.parse(String(sessionStorage.getItem('incomplete')));
        const allSchedules = await getAllSchedules(url, incompletePlan.schedules);
        const availableDatesStrings = allSchedules.map(schedule => schedule.dates).flat();
        availableDates = availableDatesStrings.map(date => new Date(date));
        console.log(availableDates);
    })
</script>

<div class="flex flex-col space-y-6 h-[100%] w-[100%]">
    <div class="relative">
        <a href="/" class="absolute top-0 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </a>
    </div>
    <div class="flex flex-col pt-20 md:pt-0">
        <p class="text-lg">Choose a time for the plan: </p>
        <p>based on <span class="text-accent">{incompletePlan.schedules.length} schedules</span></p>
        {#if availableDates}
            <Calendar availableDates={availableDates} />
        {/if}
    </div>
    <div class="flex flex-row justify-evenly">
        <button on:click={() => handleScheduleClick()} class="bg-primary py-2 px-10 rounded text-lg">Schedule</button>
        {#if noSelectedDate}
            <p class="absolute null-date-error text-accent pt-14">Please select a date</p>
        {/if}
    </div>
    <div class="flex flex-col pt-5 space-y-2 items-center">
        <p class="text-lg">Share link for more availability</p>
        <button class="schedule_link shadow shadow-accent py-1 px-4 rounded" on:click={copyToClipboard}>
            linkup.w/scheduler/{incompletePlan._id}
        </button>
        {#if copiedToClipboard}
            <p class="copied-text text-accent">Copied to clipboard!</p>
        {/if}
    </div>
</div>

<style>
    .copied-text {
        animation: exitAnimation 2.5s ease-in forwards;
    }

    .null-date-error {
        animation: fadeOut 3s ease-in forwards;
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        75% {
            opacity: 0.5;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes exitAnimation {
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
            transform: rotate(5deg) translateY(12px);
        }
        100% {
            opacity: 0;
            transform: rotate(-5deg) translateY(20px);
        }
    }
</style>
