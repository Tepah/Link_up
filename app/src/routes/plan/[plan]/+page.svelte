<script lang="ts">
  import { onMount } from 'svelte';
  import profilePic from "$lib/images/profile.jpeg";

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
      'November', 'December'];

  let plan: Plan;
  let date: Date;


  onMount(() => {
    plan = JSON.parse(String(sessionStorage.getItem('plan')));
    console.log(plan);
    date = new Date(plan.date);
  });
</script>

<div class="flex flex-col space-y-6 w-[100%] h-[100%]">
    <div class="relative">
        <a href="/main" class="absolute top-0 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </a>
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
                    {#each plan.attending as attendee}
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
