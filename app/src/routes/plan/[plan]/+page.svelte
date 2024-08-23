<script lang="ts">
    import {onMount} from 'svelte';
    import profilePic from "$lib/images/profile.jpeg";
    import {deletePlan, getUserByID, updatePlan} from "$lib/api";

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December'];

    let loading: Boolean = true;
    let editMode: Boolean = false;
    let titleMissingError: Boolean = false;
    let plan: Plan;
    let date: Date;
    let attendees: string[] = [];

    const handleDeleteClick = async () => {
        const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
        await deletePlan(url, plan._id);

        window.location.href = '/main';
    }

    const editModeToggle = () => {
        editMode = !editMode;
    }

    const getAllFirstNamesFromAttending = async () => {
        const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;

        let names = [];
        for (const uid of plan.attending) {
            const user: User = await getUserByID(url, uid);
            names.push(user.name.split(' ')[0]);
        }
        return names;
    }


    onMount(async () => {
        plan = JSON.parse(String(sessionStorage.getItem('plan')));
        if (!plan) {
            // Add a plan getter function
        }
        console.log(plan);
        date = new Date(plan.date);
        attendees = await getAllFirstNamesFromAttending();
        console.log(attendees);
        loading = false;
    });

    const handleSaveClick = async () => {
        const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
        console.log(plan.title)
        if (plan.title === '') {
            titleMissingError = true;
            setTimeout(() => {
                titleMissingError = false;
            }, 3000);
            return;
        }
        loading = true;
        await updatePlan(url, plan);
        loading = false;
        editMode = false;
    }
</script>

<div class="flex flex-col space-y-6 w-[100%] h-[100%]">
    <div class="relative">
        <a href="/" class="absolute top-0 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
            </svg>
        </a>
        {#if !loading}
            <button class="absolute top-0 right-0" on:click={editModeToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
            </button>
        {/if}
        <!--        <button class="absolute top-0 right-0" on:click={handleDeleteClick}>-->
        <!--            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">-->
        <!--                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26-->
        <!--                9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244-->
        <!--                2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12-->
        <!--                .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964-->
        <!--                51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />-->
        <!--            </svg>-->
        <!--        </button>-->
    </div>
    {#if !loading}
        {#if !editMode}
            <div class="flex-shrink flex flex-col pt-20 md:pt-0 space-y-4">
                {#if plan}
                    <h1 class="text-2xl font-bold pt-20 md:pt-0">{plan.title}</h1>
                    <div class="flex flex-col px-8 space-y-4">
                        {#if plan.description}
                            <div class="flex flex-col items-start text-start">
                                <p class="text-xl">Description</p>
                                <p class="">{plan.description}</p>
                            </div>
                        {/if}
                        <div class="flex flex-col items-start text-start">
                            <h4 class="text-xl">When</h4>
                            <p class="">{days[date.getDay()]} {months[date.getMonth()]} {date.getDate()}
                                , {date.getFullYear()}</p>
                        </div>
                        <div class="flex flex-col items-start text-start">
                            <h4 class="text-xl">Who's coming</h4>
                            <div class="flex flex-row flex-wrap items-start">
                                {#each attendees as attendee, index (attendee)}
                                    <div class="flex flex-col items-center w-24 h-32 p-2 m-2 bg-accent bg-opacity-40 rounded-xl">
                                        <img src={profilePic} alt="user" class="rounded-full w-16 h-16 m-3">
                                        <p>{attendee}</p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                {:else}
                    <h1 class="text-4xl">Plan not found</h1>
                {/if}
            </div>
        {:else}
            <div class="flex flex-col space-y-4">
                <h1 class="text-2xl font-bold pt-20 md:pt-0">Edit Plan</h1>
                <form class="flex flex-col space-y-4 text-left px-8">
                    <label for="title" class="text-lg">Title</label>
                    <input type="text" id="title" name="title" bind:value={plan.title}
                           class="rounded-lg p-2 shadow shadow-accent">
                    <label for="description" class="text-lg">Description</label>
                    <textarea id="description" name="description" style="resize:None" rows="6"
                              class="rounded-lg p-2 shadow shadow-accent" bind:value={plan.description}></textarea>
                </form>
                <div class="flex flex-row justify-evenly">
                    <button type="submit" class="bg-primary py-2 px-10 rounded-lg text-lg"
                            on:click={() => handleSaveClick()}>Save
                    </button>
                    <button type="submit" class="bg-red-400 py-2 px-10 rounded-lg text-lg"
                            on:click={() => handleDeleteClick()}>Delete</button>
                </div>
            </div>

            {#if titleMissingError}
                <p class="titleMissingError text-red-500">Please enter a title for your plan</p>
            {/if}
        {/if}
    {:else}
        <div class="flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-6 animate-spin">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
            </svg>
        </div>
    {/if}
</div>

<style>
    #title:focus, #description:focus {
        outline: none;
    }

    .titleMissingError {
        animation: fadeOut 3s ease forwards;
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        75% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>
