<script lang="ts">
    export let selectedDates: Date[] = [];
    import {onMount} from "svelte";

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let isDragging = false;
    let startIdx = null;
    let endIdx = null;

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const firstDayOfWeek = getFirstDayOfMonth(year, month);
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek;
    const daysFromNextMonth = 35 - (daysInMonth(year, month) + daysFromPrevMonth);

    let prevMonthDates = Array.from({ length: daysFromPrevMonth }, (_, index) => {
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevMonthYear = month === 0 ? year - 1 : year;
        const lastDayPrevMonth = daysInMonth(prevMonthYear, prevMonth);
        const day = lastDayPrevMonth - daysFromPrevMonth + index + 1;
        return { date: day, isSelected: false, hover: false, isPrevMonth: true };
    });

    let currentMonthDates = Array.from({ length: daysInMonth(year, month) }, (_, index) => {
        const day = index + 1;
        return { date: day, isSelected: false, hover: false, isPrevMonth: false };
    });

    let nextMonthDates = Array.from({ length: daysFromNextMonth }, (_, index) => {
        const nextMonth = month === 11 ? 0 : month + 1; // Adjust for December
        const nextMonthYear = month === 11 ? year + 1 : year;
        const day = index + 1;
        return { date: day, isSelected: false, hover: false, isNextMonth: true };
    });

    let dates = [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];


    const handleDateClick = (index) => {
        updateSelectedRange();
    };

    const handleMouseDown = (index) => {
        isDragging = true;
        startIdx = index;
        endIdx = index;
        highlightHover();
    };

    const handleMouseEnter = (index) => {
        if (isDragging) {
            endIdx = index;
            highlightHover();
        }
    };

    const handleMouseUp = () => {
        updateSelectedRange();
        dates.forEach((date) => {
            date.hover = false;
        });
        isDragging = false;
        startIdx = null;
        endIdx = null;
    };

    const highlightHover = () => {
        if (startIdx !== null && endIdx !== null) {
            const minIndex = Math.min(startIdx, endIdx);
            const maxIndex = Math.max(startIdx, endIdx);

            for (let i = 0; i < dates.length; i++) {
                if (i >= minIndex && i <= maxIndex) {
                    dates[i].hover = true;
                } else {
                    dates[i].hover = false;
                }
            }
        }
    }

    const updateSelectedRange = () => {
        if (startIdx !== null && endIdx !== null) {
            const minIndex = Math.min(startIdx, endIdx);
            const maxIndex = Math.max(startIdx, endIdx);

            if (dates[minIndex].isSelected) {
                for (let i = minIndex; i <= maxIndex; i++) {
                    dates[i].isSelected = false;
                }
            } else {
                for (let i = minIndex; i <= maxIndex; i++) {
                    dates[i].isSelected = true;
                }
            }
            console.log(dates)
        }
    };

    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November','December'
    ];
    const currentDate = new Date();
    const currentMonth = MONTHS[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    $: sortDates = () => {
        selectedDates.sort((a, b) => a.getTime() - b.getTime());
    }

    onMount(() => {
        window.addEventListener('mouseup', handleMouseUp);
    });
</script>

<div class="flex flex-col justify-evenly bg-secondary bg-opacity-10 rounded-2xl space-y-3 p-2">
    <div class="flex flex-row justify-evenly text-accent">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <p>{currentMonth} {currentYear}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    </div>
    <div class="grid grid-cols-7 gap-4" on:mouseup={handleMouseUp}>
        <p class="w-5 text-accent">S</p>
        <p class="w-5 text-accent">M</p>
        <p class="w-5 text-accent">T</p>
        <p class="w-5 text-accent">W</p>
        <p class="w-5 text-accent">T</p>
        <p class="w-5 text-accent">F</p>
        <p class="w-5 text-accent">S</p>
        {#each dates as { date, isSelected, hover, isPrevMonth, isNextMonth }, index}
            <button
                    class="date p-2 rounded-2xl bg-opacity-70"
                    class:bg-secondary={hover}
                    class:bg-accent={isSelected}
                    class:text-opacity-100={isSelected || hover}
                    class:range={isDragging && index >= Math.min(startIdx, endIdx) && index <= Math.max(startIdx, endIdx)}
                    class:text-black={!isPrevMonth && !isNextMonth}
                    class:text-opacity-70={!isPrevMonth && !isNextMonth}
                    class:text-accent={isPrevMonth || isNextMonth}
                    class:text-opacity-40={isPrevMonth || isNextMonth}
                    on:click={()=>handleDateClick(index)}
                    on:mousedown={() => handleMouseDown(index)}
                    on:mouseenter={() => handleMouseEnter(index)}
            >
            {date}
            </button>
        {/each}
    </div>
</div>

<style>
    .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
    }

    .date {
        transition: background-color 0.4s ease-in-out;
    }
</style>
