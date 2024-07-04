<script lang="ts">
  import { onMount } from 'svelte';
  import profilePic from "$lib/images/profile.jpeg";
  import {deletePlan, getUserByID} from "$lib/api";

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
      'November', 'December'];

  let plan: Plan;
  let date: Date;
  let attendees: string[] = [];

  const handleDeleteClick = async () => {
      const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
      await deletePlan(url, plan._id);

      window.location.href = '/main';
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
  });
</script>

<div class="flex flex-col space-y-6 w-[100%] h-[100%]">
    <div class="relative">
        <a href="/main" class="absolute top-0 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </a>
        <button class="absolute top-0 right-0" on:click={handleDeleteClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26
                9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244
                2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12
                .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964
                51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>
    </div>
    <div class="flex-shrink flex flex-col pt-20 md:pt-0 space-y-4">
        {#if plan}
            <h1 class="text-2xl">{plan.title}</h1>
            {#if plan.description}
                <div class="flex flex-col items-start text-start">
                    <p class="text-xl">Description</p>
                    <p class="">{plan.description}</p>
                </div>
            {/if}
            <div class="flex flex-col items-start text-start">
                <h4 class="text-xl">When</h4>
                <p class="">{days[date.getDay()]} {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
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
        {:else}
            <h1 class="text-4xl">Plan not found</h1>
        {/if}
    </div>
</div>
