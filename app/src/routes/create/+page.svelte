<script>
    import Cookies from 'js-cookie';

    let name = '';
    let description = '';
    let nameMissingError = false;

    const createCookie = () => {
        if (name === '') {
            nameMissingError = true;
            setTimeout(() => {
                nameMissingError = false;
            }, 3000);
            return;
        }
        Cookies.set('planName', name, { expires: 1 });
        Cookies.set('planDescription', description, { expires: 1 });
        let token = Cookies.get('planName')
        console.log(token);
        window.location.href = '/scheduler'
    };

    // TODO: use this for future LOGIN
    // $: if (Cookies.get('token') === undefined) {
    //     window.location.href = '/main';
    // }
</script>

<div class="flex flex-col space-y-6 w-[100%]">
    <div class="relative">
        <a href="/main" class="absolute top-0 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </a>
    </div>
    <h1 class="text-2xl font-bold pt-20 md:pt-0">Create a new plan</h1>
    <form class="flex flex-col space-y-4 text-left px-8">
        <label class="text-lg" for="name">Name:</label>
        <input class="rounded-lg p-2 shadow shadow-accent" id="name" bind:value={name} type="text" placeholder="Plan name">

        <label class="text-lg" for="description">Description:</label>
        <textarea class="rounded-lg p-2 shadow shadow-accent" style="resize:none;" rows="6" id="description" bind:value={description} placeholder="Describe what fun things you're planning!"></textarea>
    </form>
    <div class="flex flex-row justify-evenly">
        <button class="bg-primary py-2 px-10 rounded-lg text-lg" type="submit" on:click={createCookie}>Submit</button>
    </div>
    {#if nameMissingError}
        <p class="nameMissingError text-red-500">Please enter a name for your plan</p>
    {/if}
</div>

<style>
    #name:focus, #description:focus {
        outline: none;
    }
    .nameMissingError {
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
