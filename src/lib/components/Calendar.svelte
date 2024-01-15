<script lang="ts">
    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November','December'
    ];
    const currentDate = new Date();
    const currentMonth = MONTHS[currentDate.getMonth()];
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();
    const cycle = [0, 1, 2, 3, 4, 5, 6]

    let month = currentMonth;
    let pickedDates: Date[] = [];
    let firstDay = new Date(currentYear, currentDate.getMonth(), 1).getDay();
    let lastDayOfCur = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
    let lastDayOfPrev = new Date(currentYear, currentDate.getMonth(), 0).getDate();
    $: sortDates = () => {
        pickedDates.sort((a, b) => a.getTime() - b.getTime());
    }
</script>

<div class="flex flex-col justify-evenly h-[40%] w-[100%] bg-secondary bg-opacity-10 rounded-2xl">
    <div class="flex flex-row justify-evenly text-accent">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <p>{currentMonth} {currentYear}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    </div>
    <div class="flex flex-row justify-evenly text-accent">
        <p class="w-5">S</p>
        <p class="w-5">M</p>
        <p class="w-5">T</p>
        <p class="w-5">W</p>
        <p class="w-5">T</p>
        <p class="w-5">F</p>
        <p class="w-5">S</p>
    </div>
    <div class="flex flex-row justify-evenly text-center">
        {#each cycle as day}
            {#if day < firstDay}
                <div>
                    <p class="text-accent text-opacity-40 w-5">{lastDayOfPrev - firstDay + day + 1}</p>
                </div>
            {:else if day >= firstDay && day < firstDay + new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()}
                {#if day === currentDay}
                    <div>
                        <p class="text-black text-opacity-70 w-5">{day - firstDay + 1}</p>
                    </div>
                {:else}
                    <div>
                        <p class="text-black text-opacity-70 w-5">{day - firstDay + 1}</p>
                    </div>
                {/if}
            {:else}
                <div>
                    <p class="text-black text-opacity-70 w-5">{day - firstDay + 1}</p>
                </div>
            {/if}
        {/each}
    </div>
    <div class="flex flex-row justify-evenly text-center">
        {#each cycle as day}
            {#if day < firstDay}
                <div>
                    <p class="text-black text-opacity-70 w-5">{lastDayOfPrev - firstDay + day + 8 - lastDayOfPrev}</p>
                </div>
            {:else if day >= firstDay && day < firstDay + new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()}
                {#if day === currentDay}
                    <div>
                        <p class="text-black text-opacity-70 w-5">{day - firstDay + 8}</p>
                    </div>
                {:else}
                    <div>
                        <p class="text-black text-opacity-70 w-5">{day - firstDay + 8}</p>
                    </div>
                {/if}
            {:else}
                <div>
                    <p class="text-black text-opacity-70 w-5">{day - firstDay + 8}</p>
                </div>
            {/if}
        {/each}
    </div>
    <div class="flex flex-row justify-evenly text-center">
        {#each cycle as day}
            {#if day < firstDay}
                <div>
                    <p class="text-black text-opacity-70 w-5">{lastDayOfPrev - firstDay + day + 15 - lastDayOfPrev}</p>
                </div>
            {:else if day >= firstDay && day < firstDay + new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()}
                {#if day === currentDay}
                    <div>
                        <p class="text-black text-opacity-70 w-5">{day - firstDay + 15}</p>
                    </div>
                {:else}
                    <div>
                        <p class="text-black text-opacity-70 w-5">{day - firstDay + 15}</p>
                    </div>
                {/if}
            {:else}
                <div>
                    <p class="text-black text-opacity-70 w-5">{day - firstDay + 15}</p>
                </div>
            {/if}
        {/each}
    </div>
    <div class="flex flex-row justify-evenly text-center">
        {#each cycle as day}
            {#if day < firstDay}
                <div>
                    <p class="text-black text-opacity-70 w-5">{lastDayOfPrev - firstDay + day + 22 - lastDayOfPrev}</p>
                </div>
            {:else if day >= firstDay && day < firstDay + new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()}
                {#if day === currentDay}
                    <div>
                        <p class="text-black text-opacity-70 w-5">{day - firstDay + 22}</p>
                    </div>
                {:else}
                    <div>
                        <p class="text-black text-opacity-70 w-5">{day - firstDay + 22}</p>
                    </div>
                {/if}
            {:else}
                <div>
                    <p class="text-black text-opacity-70 w-5">{day - firstDay + 22}</p>
                </div>
            {/if}
        {/each}
    </div>
    <div class="flex flex-row justify-evenly text-center">
        {#each cycle as day}
            {#if day < firstDay}
                <div>
                    <p class="text-black text-opacity-70 w-5">{lastDayOfPrev - firstDay + day + 29 - lastDayOfPrev}</p>
                </div>
            {:else if day - firstDay + 29 > lastDayOfCur}
                <div>
                    <p class="text-accent text-opacity-40 w-5">{day - firstDay + 29 - lastDayOfCur}</p>
                </div>
            {:else if day >= firstDay && day < firstDay + new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()}
                {#if day === currentDay}
                    <div>
                        <p class="text-black text-opacity-70 w-5">{day - firstDay + 29}</p>
                    </div>
                {:else}
                    <div>
                        <p class="text-black text-opacity-70 w-5">{day - firstDay + 29}</p>
                    </div>
                {/if}
            {:else}
                <div>
                    <p class="text-opacity-70 w-5">{day - firstDay + 29}</p>
                </div>
            {/if}
        {/each}
    </div>
</div>
