<script lang="ts">
    import titleLogo from "$lib/images/main_title.png";
    import settingsIcon from "$lib/images/icons8-lines.svg";
    import Settings from "$lib/components/Settings.svelte";
    import {goto} from '$app/navigation';
    import {onMount} from "svelte";
    import {
        authenticateToken,
        deletePlan,
        getAllIncompleteByID,
        getAllPlansByID,
        getUserByID,
        postArchive
    } from "$lib/api";

    const url = "http://localhost:3000"

    let userID: String;
    let showAllUpcoming = false;
    let showAllIncomplete = false;
    let settingsOpen = false;
    let loading = true;
    let user: User;
    let plans: {upcoming: Plan[], incomplete: Incomplete[]} = {upcoming: [], incomplete: []};

    const toggleUpcoming = () => {
        showAllUpcoming = !showAllUpcoming;
    }

    const toggleUndecided = () => {
        showAllIncomplete = !showAllIncomplete;
    }

    const toggleSettings = () => {
        settingsOpen = !settingsOpen;
    }

    const handleScheduleClick = (plan: Plan) => {
        sessionStorage.setItem('plan', JSON.stringify(plan));
        goto('/plan/' + plan._id);
    }

    const handleIncompleteClick = (incompletePlan: Incomplete) => {
        sessionStorage.setItem('incomplete', JSON.stringify(incompletePlan));
        goto('/confirm/' + incompletePlan._id);
    }

    const getPlans = async () => {
        let userPlans: Plan[] = await getAllPlansByID(url, userID);
        userPlans.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        let incompletePlans = await getAllIncompleteByID(url, userID);
        plans = {
            upcoming: userPlans,
            incomplete: incompletePlans
        }
    }

    const archivePlan = (plan: Plan) => {
        postArchive(url, plan);
        deletePlan(url, plan._id);
        console.log("Plan archived")
    }

    onMount(async () => {
        const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
        const tokenResults = await authenticateToken(url, localStorage.getItem('token'));
        if (tokenResults === 'Invalid token') {
            localStorage.removeItem('token');
            goto('/');
        } else {
            userID = tokenResults.id;
            user = await getUserByID(url, userID);
        }
        await getPlans();
        for (let i = 0; i < plans.upcoming.length; i++) {
            let plan = plans.upcoming[i];
            if (new Date(plan.date).getTime() < new Date().getTime()) {
                archivePlan(plan);
                plans.upcoming = plans.upcoming.filter(p => p._id !== plan._id);
            }
        }
        loading = false;
    })
</script>

{#if loading}
    <div class="flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="size-6 animate-spin">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
        </svg>
    </div>
{:else}
    {#if !settingsOpen}
        <div class="flex flex-col w-[94%]">
            <div class="relative items-end">
                <button class="absolute accent-accent top-4 right-0 md:right-6" on:click={toggleSettings}>
                    <img src={settingsIcon} alt="settings" class="h-8">
                </button>
            </div>
            <div class="flex flex-col items-center content-center">
                <div class="flex-shrink flex flex-col">
                    <div class="flex items-center justify-center p-1">
                        <img src="{titleLogo}" alt="title logo">
                    </div>
                    <div class="p-1">
                        <p>Hi, <span class="text-accent"> {user.name}</span>!</p>
                    </div>
                </div>
                {#if plans.upcoming.length > 0 || plans.incomplete.length > 0}
                    {#if !showAllIncomplete}
                        <div class="flex-shrink flex flex-col p-1.5">
                            <div class="flex flex-row">
                                <p class="text-start text-lg">Upcoming Plans</p>
                                {#if plans.upcoming.length > 3}
                                    <button class="font-bold flex items-center justify-center p-1"
                                            class:show-list={showAllUpcoming} class:hide-list={!showAllUpcoming}
                                            on:click={toggleUpcoming}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                        </svg>
                                    </button>
                                {/if}
                            </div>
                            {#if !showAllUpcoming}
                                <div class="flex flex-col my-3">
                                    {#each plans.upcoming.slice(0, 3) as plan}
                                        <button on:click={() => handleScheduleClick(plan)}
                                                class="planItem flex flex-row justify-between w-72 h-20 py-3 pl-3 pr-4 my-1.5 bg-primary bg-opacity-50 rounded-xl">
                                            <div class="flex flex-col items-start pl-1 pr-7">
                                                <p class="text-lg font-semibold">{plan.title}</p>
                                                <p class="">{plan.attending.length} going</p>
                                            </div>
                                            <div class="flex p-2 items-start">
                                                <p class="text-lg">{new Date(plan.date).toLocaleDateString('en-US', {
                                                  month: 'short',
                                                  day: 'numeric'
                                                })}</p>
                                            </div>
                                        </button>
                                    {/each}
                                    {#if plans.upcoming.length > 3}
                                        <button on:click={toggleUpcoming}
                                                class="text-lg font-bold flex flex-row items-center justify-center">...
                                        </button>
                                    {/if}
                                </div>
                            {:else}
                                <div class="flex flex-col my-3 h-96">
                                    {#each plans.upcoming as plan}
                                        <button on:click={() => handleScheduleClick(plan)}
                                                class="planItem flex flex-row justify-between w-72 h-20 py-3 pl-3 pr-4 my-1.5 bg-primary bg-opacity-50 rounded-xl">
                                            <div class="flex flex-col items-start pl-1 pr-7">
                                                <p class="text-lg font-semibold">{plan.title}</p>
                                                <p class="">{plan.attending.length} going</p>
                                            </div>
                                            <div class="flex p-2 items-start">
                                                <p class="text-lg">{plan.date.toLocaleDateString('en-US', {
                                                  month: 'short',
                                                  day: 'numeric'
                                                })}</p>
                                            </div>
                                        </button>
                                    {/each}
                                    <button on:click={toggleUpcoming}
                                            class="text-lg font-bold flex flex-row items-center justify-center"></button>
                                </div>
                            {/if}
                        </div>
                    {/if}
                    {#if plans.incomplete.length > 0}
                        <div class="flex-shrink flex flex-col p-1.5">
                            <div class="flex flex-row">
                                <p class="text-start text-lg">Pending Plans</p>
                                {#if plans.incomplete.length > 2}
                                    <button class="font-bold flex items-center justify-center p-1"
                                            class:show-list={showAllIncomplete} class:hide-list={!showAllIncomplete}
                                            on:click={toggleUndecided}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                        </svg>
                                    </button>
                                {/if}
                            </div>
                            {#if !showAllIncomplete}
                                {#if plans.incomplete.length > 0}
                                    <div class="flex flex-col my-3">
                                        {#each plans.incomplete.slice(0, 2) as plan}
                                            <button on:click={() => handleIncompleteClick(plan)}
                                                    class="planItem flex flex-row justify-between h-20 w-72 py-3 pl-3 pr-4 my-1.5 bg-secondary bg-opacity-20 rounded-xl">
                                                <div class="flex flex-col items-start pl-1 pr-7">
                                                    <p class="text-lg font-semibold">{plan.title}</p>
                                                    <p class=""><span class="text-accent">{plan.schedules.length}</span>
                                                        schedules</p>
                                                </div>
                                            </button>
                                        {/each}
                                        {#if plans.incomplete.length > 2}
                                            <button class="flex flex-row items-center justify-center text-lg font-bold"
                                                    on:click={toggleUndecided}>...
                                            </button>
                                        {/if}
                                    </div>
                                {/if}
                            {:else}
                                <div class="flex flex-col my-3">
                                    {#each plans.incomplete as plan}
                                        <button on:click={() => handleIncompleteClick(plan)}
                                                class="planItem flex flex-row justify-between h-20 w-72 py-3 pl-3 pr-4 my-1.5 bg-secondary bg-opacity-20 rounded-xl">
                                            <div class="flex flex-col items-start pl-1 pr-7">
                                                <p class="text-lg font-semibold">{plan.title}</p>
                                                <p class=""><span class="text-accent">{plan.schedules.length}</span>
                                                    schedules</p>
                                            </div>
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {/if}
                {:else if plans.upcoming.length === 0 && plans.incomplete.length === 0}
                    <div class="my-44">
                        <p class="text-lg">Nothing yet... <br>Start making some plans!</p>
                    </div>
                {/if}
                <div class="p-2">
                    <a href="/create" class="planItem py-3 px-8 bg-primary text-lg rounded-xl inline-block">New Plan</a>
                </div>
            </div>
        </div>
    {:else}
        <Settings toggleSettings={toggleSettings}/>
    {/if}
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
