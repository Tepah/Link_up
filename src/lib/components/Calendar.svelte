<script lang="ts">
    export let selectedDates: (Date | null | undefined)[] = [];
    import {onMount} from "svelte";

    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November','December'
    ];
    const currentDate = new Date();

    let today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    let year = today.getFullYear();
    let month = today.getMonth();
    let isDragging = false;
    let startIdx = null;
    let endIdx = null;

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    const checkDateSelected = (date) => {
        let selected = false;
        selectedDates.forEach(d => {
            if (d.getTime() === date.getTime()) {
                selected = true;
            }
        });
        return selected;
    }

    let firstDayOfWeek = getFirstDayOfMonth(year, month);
    let daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek;
    let daysFromNextMonth = 35 - (daysInMonth(year, month) + daysFromPrevMonth);

    let prevMonthDates = Array.from({ length: daysFromPrevMonth }, (_, index) => {
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevMonthYear = month === 0 ? year - 1 : year;
        const lastDayPrevMonth = daysInMonth(prevMonthYear, prevMonth);
        const day = lastDayPrevMonth - daysFromPrevMonth + index + 1;
        let selected = checkDateSelected(new Date(prevMonthYear, prevMonth, day));
        return { date: day, isSelected: selected, hover: false, isPrevMonth: true, isNextMonth: false };
    });

    let currentMonthDates = Array.from({ length: daysInMonth(year, month) }, (_, index) => {
        const day = index + 1;
        let selected = checkDateSelected(new Date(year, month, day));
        return { date: day, isSelected: selected, hover: false, isPrevMonth: false, isNextMonth: false };
    });

    let nextMonthDates = Array.from({ length: daysFromNextMonth }, (_, index) => {
        const nextMonth = month === 11 ? 0 : month + 1; // Adjust for December
        const nextMonthYear = month === 11 ? year + 1 : year;
        const day = index + 1;
        let selected = checkDateSelected(new Date(nextMonthYear, nextMonth, day));
        return { date: day, isSelected: selected, hover: false, isNextMonth: true, isPrevMonth: false };
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

            if (checkBeforeToday(new Date(year, month, dates[minIndex].date), dates[minIndex].isPrevMonth,
                dates[minIndex].isNextMonth)) {
                return;
            }

            if (dates[minIndex].isSelected && dates[maxIndex].isSelected) {
                for (let i = minIndex; i <= maxIndex; i++) {
                    dates[i].isSelected = false;
                }
            } else {
                for (let i = minIndex; i <= maxIndex; i++) {
                    dates[i].isSelected = true;
                }
            }
        }
    };

    const handleNextClick = () => {
        updateSelectedDates();
        month = month === 11 ? 0 : month + 1;
        year = month === 0 ? year + 1 : year;
        firstDayOfWeek = getFirstDayOfMonth(year, month);
        daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek;
        daysFromNextMonth = 35 - (daysInMonth(year, month) + daysFromPrevMonth);

        prevMonthDates = Array.from({ length: daysFromPrevMonth }, (_, index) => {
            const prevMonth = month === 0 ? 11 : month - 1;
            const prevMonthYear = month === 0 ? year - 1 : year;
            const lastDayPrevMonth = daysInMonth(prevMonthYear, prevMonth);
            const day = lastDayPrevMonth - daysFromPrevMonth + index + 1;
            const selected = checkDateSelected(new Date(prevMonthYear, prevMonth, day));
            return { date: day, isSelected: selected, hover: false, isPrevMonth: true, isNextMonth: false };
        });

        currentMonthDates = Array.from({ length: daysInMonth(year, month) }, (_, index) => {
            const day = index + 1;
            const selected = checkDateSelected(new Date(year, month, day));
            return { date: day, isSelected: selected, hover: false, isPrevMonth: false, isNextMonth: false };
        });

        nextMonthDates = Array.from({ length: daysFromNextMonth }, (_, index) => {
            const nextMonth = month === 11 ? 0 : month + 1; // Adjust for December
            const nextMonthYear = month === 11 ? year + 1 : year;
            const day = index + 1;
            const selected = checkDateSelected(new Date(nextMonthYear, nextMonth, day));
            return { date: day, isSelected: selected, hover: false, isNextMonth: true, isPrevMonth: false };
        });

        dates = [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
    }

    const handlePrevClick = () => {
        if (month <= currentDate.getMonth() && year <= currentDate.getFullYear()) return;
        updateSelectedDates();
        month = month === 0 ? 11 : month - 1;
        year = month === 11 ? year - 1 : year;
        firstDayOfWeek = getFirstDayOfMonth(year, month);
        daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek;
        daysFromNextMonth = 35 - (daysInMonth(year, month) + daysFromPrevMonth);

        prevMonthDates = Array.from({ length: daysFromPrevMonth }, (_, index) => {
            const prevMonth = month === 0 ? 11 : month - 1;
            const prevMonthYear = month === 0 ? year - 1 : year;
            const lastDayPrevMonth = daysInMonth(prevMonthYear, prevMonth);
            const day = lastDayPrevMonth - daysFromPrevMonth + index + 1;
            const selected = checkDateSelected(new Date(prevMonthYear, prevMonth, day));
            return { date: day, isSelected: selected, hover: false, isPrevMonth: true, isNextMonth: false };
        });

        currentMonthDates = Array.from({ length: daysInMonth(year, month) }, (_, index) => {
            const day = index + 1;
            const selected = checkDateSelected(new Date(year, month, day));
            return { date: day, isSelected: selected, hover: false, isPrevMonth: false, isNextMonth: false };
        });

        nextMonthDates = Array.from({ length: daysFromNextMonth }, (_, index) => {
            const nextMonth = month === 11 ? 0 : month + 1;
            const nextMonthYear = month === 11 ? year + 1 : year;
            const day = index + 1;
            const selected = checkDateSelected(new Date(nextMonthYear, nextMonth, day));
            return { date: day, isSelected: selected, hover: false, isNextMonth: true, isPrevMonth: false };
        });

        dates = [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
    }

    const checkBeforeToday = (date, prevMonth, nextMonth) => {
        if (nextMonth) return false;
        if (prevMonth) {
            if (year < currentDate.getFullYear()) return true;
            if (date.getMonth() === currentDate.getMonth()) return true;
        }
        return date.getTime() < today.getTime();
    }

    const updateSelectedDates = () => {
        dates.filter(date => date.isSelected).forEach(date => {
            const selectedMonth = date.isPrevMonth ? month === 0 ? 11 : month - 1 : date.isNextMonth ? month === 11 ? 0 : month + 1 : month;
            const selectedDate = new Date(year, selectedMonth, date.date);
            if (!selectedDates.find(d => d.getTime() === selectedDate.getTime())) {
                selectedDates.push(selectedDate);
            }
        });
        sortDates();
        console.log(selectedDates);
    }

    $: sortDates = () => {
        selectedDates.sort((a, b) => a.getTime() - b.getTime());
    }

    onMount(() => {
        window.addEventListener('mouseup', handleMouseUp);
    });
    console.log(month, year, currentDate.getMonth(), currentDate.getFullYear());
</script>

<div class="flex flex-col justify-evenly bg-secondary bg-opacity-10 rounded-2xl space-y-3 p-2">
    <div class="flex flex-row justify-evenly text-accent">
        <button on:click={handlePrevClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
        <p>{MONTHS[month]} {year}</p>
        <button on:click={handleNextClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </button>
    </div>
    <div role="button" tabindex="0" class="grid grid-cols-7 gap-4" on:mouseup={handleMouseUp}>
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
                    class:old-date={checkBeforeToday(new Date(year, month, date), isPrevMonth, isNextMonth)}
                    class:bg-secondary={hover}
                    class:bg-accent={isSelected}
                    class:range={isDragging && index >= Math.min(startIdx, endIdx) && index <= Math.max(startIdx, endIdx)}
                    class:text-black={!isPrevMonth && !isNextMonth || isSelected || hover}
                    class:text-opacity-70={!isPrevMonth && !isNextMonth}
                    class:text-accent={isPrevMonth || isNextMonth}
                    class:text-opacity-40={isPrevMonth || isNextMonth}
                    class:text-opacity-100={isSelected || hover}
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
    .old-date {
        color: #000000;
        opacity: 0.1;
    }
    .date {
        transition: background-color 0.3s ease-in-out;
    }
</style>
