<script lang="ts">
    import { onMount } from 'svelte';
    import Cookies from 'js-cookie';

    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

    let plan: Plan
    let copiedToClipboard = false;
    let planDate: Date

    onMount(() => {
        plan = JSON.parse(String(sessionStorage.getItem('plan')));
        planDate = new Date(plan.date);
    });

    const copyToClipboard = async () => {
      const textToCopy: string | null | undefined = document.querySelector('.schedule_link')?.textContent;
      await navigator.clipboard.writeText(textToCopy);
      copiedToClipboard = true;
      setTimeout(() => {
        copiedToClipboard = false;
      }, 3000);
    }

    // TODO: Move this to a global component
    // if (Cookies.get('darkmode') === 'true') {
    //     document.documentElement.classList.add('dark');
    // } else {
    //     document.documentElement.classList.remove('dark');
    // }
</script>

<div class="flex flex-col space-y-10 justify-center h-[100%]">
    {#if plan}
    <h1 class="text-4xl">Let's link up!</h1>
    <p class="px-5">Your plan for <span class="text-accent underline">{plan.title}</span> on
        <span class="text-accent underline">{DAYS[planDate.getDay()]}, {MONTHS[planDate.getMonth()]} {planDate.getDate()}</span>
        has been made! Let your friends know! We'll also add it to everyone's schedules.</p>

    <div class="flex flex-col space-y-4 items-center h-[10%]">
        <p class="px-5">Here's the link to your plan:</p>
        <button class="schedule_link shadow shadow-accent py-1 px-12 rounded" on:click={copyToClipboard}>
            linkup.w/plan/{plan._id}
        </button>
        {#if copiedToClipboard}
            <p class="copied-text text-accent">Copied to clipboard!</p>
        {/if}
    </div>
    <div class="flex flex-col space-y-6 justify-evenly items-center">
        <button on:click={() => {}} class="bg-secondary py-2 px-10 rounded-xl text-lg">View plan details</button>
        <a href="../../main" class="bg-primary py-2 px-10 rounded-xl text-lg">Go home</a>
    </div>
    {:else}
    <h1 class="text-4xl">Loading...</h1>
    {/if}
</div>


<style>
    .copied-text {
        animation: fadeOut 2.5s ease-in forwards;
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: rotate(0deg) translateY(0px);
        }
        50% {
            opacity: 1;
            transform: rotate(0deg) translateY(0px);
        }
        75% {
            opacity: 0.5;
            transform: rotate(5deg) translateY(15px);
        }
        100% {
            opacity: 0;
            transform: rotate(-5deg) translateY(30px);
        }
    }
</style>

