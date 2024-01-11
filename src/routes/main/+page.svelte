<script>
    import titleLogo from "$lib/images/main_title.png";
    export let data;
</script>


<div class="flex items-center justify-center p-1">
    <img src="{titleLogo}" alt="title logo">
</div>
<div class="p-1">
    <p>Hi, <span class="text-accent"> name</span>!</p>
</div>
<div class="flex flex-col p-1.5">
    <p class="text-start text-lg">Upcoming Plans</p>
    {#if data.upcoming.length === 0}
        <div class="my-3">
            <p class="text-sm">Nothing yet...</p>
        </div>
    {:else}
        <div class="flex flex-col my-3">
            {#each data.upcoming.slice(0, 3) as plan}
                <div class="flex flex-row justify-between w-72 h-20 py-3 pl-3 pr-4 my-1.5 bg-primary bg-opacity-50 rounded-xl">
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
                <div class="flex flex-row items-center justify-center">
                    <p class="text-lg font-bold">...</p>
                </div>
            {/if}
        </div>
    {/if}
</div>
<div class="flex flex-col p-1.5">
    <p class="text-start text-lg">Undecided Plans</p>
    {#if data.incomplete.length !== 0}
        <div class="flex flex-col my-3">
            {#each data.incomplete.slice(0, 2) as plan}
                <div class="flex flex-row justify-between h-20 w-72 py-3 pl-3 pr-4 my-1.5 bg-secondary bg-opacity-20 rounded-xl">
                    <div class="flex flex-col items-start pl-1 pr-7">
                        <p class="text-lg font-semibold">{plan.title}</p>
                        <p class=""><span class="text-accent">{plan.schedules.length}</span> schedules</p>
                    </div>
                </div>
            {/each}
            {#if data.incomplete.length > 2}
                <div class="flex flex-row items-center justify-center">
                    <p class="text-lg font-bold">...</p>
                </div>
            {/if}
        </div>
    {/if}

</div>
<div class="p-5">
    <button class="py-2 px-8 bg-primary text-lg rounded-xl">New Plan</button>
</div>
