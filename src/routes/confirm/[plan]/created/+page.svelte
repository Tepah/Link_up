<script lang="ts">
    import Cookies from 'js-cookie';

    const planName = Cookies.get('planName');
    const planDescription = Cookies.get('planDescription');
    // Temporary Plan Date, but get it with
    // const planDate = Cookies.get('planDate')
    let planDateCookie = 'Thu Feb 01 2024 00:00:00 GMT-0800 (Pacific Standard Time)';
    const planDate = new Date(planDateCookie);
    const dateFormat = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };

    let copiedToClipboard = false;

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
    <h1 class="text-4xl">Let's link up!</h1>
    <p class="px-5">Your plan for <span class="text-accent underline">{planName}</span> on
        <span class="text-accent underline">{planDate.toLocaleString('en-US', dateFormat)}</span>
        has been made! Let your friends know! We'll also add it to everyone's schedules.</p>

    <div class="flex flex-col space-y-4 items-center h-[10%]">
        <p class="px-5">Here's the link to your plan:</p>
        <button class="schedule_link shadow shadow-accent py-1 px-12 rounded" on:click={copyToClipboard}>
            linkup.w/me/scheduler/420
        </button>
        {#if copiedToClipboard}
            <p class="copied-text text-accent">Copied to clipboard!</p>
        {/if}
    </div>
    <div class="flex flex-col space-y-6 justify-evenly items-center">
        <button on:click={() => {}} class="bg-accent py-2 px-10 rounded text-lg">View plan details</button>
        <a href="../../main" class="bg-primary py-2 px-10 rounded text-lg">Go home</a>
    </div>
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

