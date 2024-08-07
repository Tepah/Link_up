<script lang="ts">
    import title from '$lib/images/title.png';
    import email_logo from '$lib/images/email_logo.png';
    import password_logo from '$lib/images/password_logo.png';
    import Signup from '$lib/components/Signup.svelte';
    import {postLogin} from '$lib/api';

    let email: String = '';
    let password: String = '';
    let error: String | null = null;
    let signupPage: Boolean = false;

    const signIn = async (e: Event) => {
        e.preventDefault();
        const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
        let login: void | String | User = await postLogin(url, email, password);
        if (login === 'Invalid credentials') {
            error = 'Invalid credentials';
        } else if (login === 'User not found') {
            error = 'User not found';
        } else {

        }
    }
</script>

{#if !signupPage}
    <div class="my-2">
        <div class="flex items-center justify-center py-8">
            <img src={title} alt="title" />
        </div>
        <div class="flex items-center justify-center py-4 w-[100%]">
            <form class="flex flex-col items-center justify-between w-[100%]" method="POST">
                <div class="relative border-b-2 border-secondary drop-shadow m-4">
                    <img class="absolute left-2 top-2" src={email_logo} alt="email_logo" />
                    <input class="w-full outline-none border-none pl-10 pr-12 py-2 bg-background rounded" type="text"
                           placeholder="Email" bind:value={email}>
                </div>
                <div class="relative border-b-2 border-secondary drop-shadow m-4">
                    <img class="absolute left-2 top-2" src={password_logo} alt="password_logo" />
                    <input class="w-full outline-none border-none pl-10 pr-12 py-2 bg-background rounded" type="password"
                           placeholder="Password" bind:value={password}>
                </div>
                <button on:click={signIn} type="submit" class="flex-1 m-4 p-5 rounded-lg bg-primary w-1/2">Log in</button>
            </form>
        </div>
        <div class="flex flex-col items-center justify-between py-2 w-[100%]">
            <h2 class="text-xl">No account?</h2>
            <button on:click={() => signupPage = !signupPage} class="flex-1 m-4 p-5 rounded-lg bg-primary bg-opacity-30 w-1/2">Sign up</button>
        </div>
        {#if error === "Invalid credentials"}
            <p class="text-red-500">Invalid credentials</p>
        {:else if error === "User not found"}
            <p class="text-red-500">User not found</p>
        {/if}
    </div>
{:else}
    <div class="flex flex-col space-y-6 w-[100%]">
        <div class="relative">
            <button on:click={() => signupPage = !signupPage} class="absolute top-0 left-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
        </div>
        <Signup />
    </div>
{/if}
