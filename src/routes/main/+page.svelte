<script>
    import titleLogo from "$lib/images/main_title.png";
    import settingsIcon from "$lib/images/icons8-lines.svg";
    import Settings from "$lib/components/Settings.svelte";
    export let data;

    // Using this to create a toggle for a list to show all upcoming plans. Will use for animation.
    let showAllUpcoming = false;
    let showAllIncomplete = false;
    let settingsOpen = false;

    const toggleUpcoming = () => {
      showAllUpcoming = !showAllUpcoming;
    }
    const toggleUndecided = () => {
      showAllIncomplete = !showAllIncomplete;
    }

    const toggleSettings = () => {
        settingsOpen = !settingsOpen;
    }
</script>

{#if !settingsOpen}
    <div class="relative">
        <button class="absolute accent-accent top-3 -right-5 p-1" on:click={toggleSettings}>
            <img src={settingsIcon} alt="settings" class="h-8">
        </button>
    </div>
    <div class="flex flex-col items-center">
        <div class="flex-shrink flex flex-col">
            <div class="flex items-center justify-center p-1">
                <img src="{titleLogo}" alt="title logo">
            </div>
            <div class="p-1">
                <p>Hi, <span class="text-accent"> name</span>!</p>
            </div>
        </div>
        {#if !showAllIncomplete}
        <div class="flex-shrink flex flex-col p-1.5">
            <div class="flex flex-row">
                <p class="text-start text-lg">Upcoming Plans</p>
                {#if data.upcoming.length > 3}
                    <button class="font-bold flex items-center justify-center p-1" class:show-list={showAllUpcoming} class:hide-list={!showAllUpcoming} on:click={toggleUpcoming}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                {/if}
            </div>
            {#if data.upcoming.length === 0}
                <div class="my-3">
                    <p class="text-sm">Nothing yet...</p>
                </div>
            {:else if !showAllUpcoming}
                <div class="flex flex-col my-3">
                    {#each data.upcoming.slice(0, 3) as plan}
                        <div class="planItem flex flex-row justify-between w-72 h-20 py-3 pl-3 pr-4 my-1.5 bg-primary bg-opacity-50 rounded-xl">
                            <div class="flex flex-col items-start pl-1 pr-7">
                                <p class="text-lg font-semibold">{plan.title}</p>
                                <p class="">{plan.attending.length} going</p>
                            </div>
                            <div class="flex p-2 items-start">
                                <p class="text-lg">{plan.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                            </div>
                        </div>
                    {/each}
                    {#if data.upcoming.length > 3}
                        <button on:click={toggleUpcoming} class="text-lg font-bold flex flex-row items-center justify-center">...</button>
                    {/if}
                </div>
            {:else}
                <div class="flex flex-col my-3 h-96">
                    {#each data.upcoming as plan}
                        <div class="planItem flex flex-row justify-between w-72 h-20 py-3 pl-3 pr-4 my-1.5 bg-primary bg-opacity-50 rounded-xl">
                            <div class="flex flex-col items-start pl-1 pr-7">
                                <p class="text-lg font-semibold">{plan.title}</p>
                                <p class="">{plan.attending.length} going</p>
                            </div>
                            <div class="flex p-2 items-start">
                                <p class="text-lg">{plan.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                            </div>
                        </div>
                    {/each}
                    <button on:click={toggleUpcoming} class="text-lg font-bold flex flex-row items-center justify-center"></button>
                </div>
            {/if}
        </div>
        {/if}
        {#if !showAllUpcoming || data.incomplete.length < 0}
        <div class="flex-shrink flex flex-col p-1.5">
            <div class="flex flex-row">
                <p class="text-start text-lg">Undecided Plans</p>
                {#if data.incomplete.length > 2}
                    <button class="font-bold flex items-center justify-center p-1" class:show-list={showAllIncomplete} class:hide-list={!showAllIncomplete} on:click={toggleUndecided}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                {/if}
            </div>
            {#if !showAllIncomplete}
                {#if data.incomplete.length !== 0}
                    <div class="flex flex-col my-3">
                        {#each data.incomplete.slice(0, 2) as plan}
                            <div class="planItem flex flex-row justify-between h-20 w-72 py-3 pl-3 pr-4 my-1.5 bg-secondary bg-opacity-20 rounded-xl">
                                <div class="flex flex-col items-start pl-1 pr-7">
                                    <p class="text-lg font-semibold">{plan.title}</p>
                                    <p class=""><span class="text-accent">{plan.schedules.length}</span> schedules</p>
                                </div>
                            </div>
                        {/each}
                        {#if data.incomplete.length > 2}
                            <button class="flex flex-row items-center justify-center text-lg font-bold" on:click={toggleUndecided}>...</button>
                        {/if}
                    </div>
                {/if}
            {:else}
                <div class="flex flex-col my-3">
                    {#each data.incomplete as plan}
                        <div class="planItem flex flex-row justify-between h-20 w-72 py-3 pl-3 pr-4 my-1.5 bg-secondary bg-opacity-20 rounded-xl">
                            <div class="flex flex-col items-start pl-1 pr-7">
                                <p class="text-lg font-semibold">{plan.title}</p>
                                <p class=""><span class="text-accent">{plan.schedules.length}</span> schedules</p>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
        <div class="p-2">
            <button class="planItem py-2 px-8 bg-primary text-lg rounded-xl">New Plan</button>
        </div>
        {/if}
    </div>
{:else}
    <Settings toggleSettings={toggleSettings} />
{/if}

<style>
    .planItem {
        transition: transform 0.2s ease;
    }

    .planItem:hover {
        transform: scale(1.1);
    }

    .show-list {
        transition: transform 0.2s ease;
        transform: rotate(90deg);
    }

    .hide-list {
        transition: transform 0.2s ease;
        transform: rotate(0deg);
    }
</style>
