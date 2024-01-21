<script lang="ts">
    import Calendar from '$lib/components/Calendar_2.svelte';
    export let data;

    let selectedDates: (Date | undefined | null)[] | undefined = [];
    let availableDates: Date[] = [];

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

    availableDates = findCommonDates();
</script>

<div class="flex flex-col justify-center space-y-4 h-[100%] w-[90%]">
    <div class="relative">
        <a href="/main" class="absolute -top-8 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </a>
    </div>
    <p>Choose your availability:</p>
    <p>based on </p><p class="text-accent">4 schedules</p>
    <Calendar selectedDates={selectedDates} availableDates={availableDates} />
</div>
