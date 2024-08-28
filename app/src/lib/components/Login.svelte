<script lang="ts">
    import title from "$lib/images/title.png";
    import email_logo from "$lib/images/email_logo.png";
    import password_logo from "$lib/images/password_logo.png";
    import {postLogin} from "$lib/api";
    import {loginToken} from "$lib/stores.js";
    import {signupPage} from "$lib/stores.js";

    let email: String = '';
    let password: String = '';
    let error: String | null = null;
    let phoneError: Boolean = false;
    let passwordError: Boolean = false;

    const signIn = async (e: Event) => {
        e.preventDefault();
        const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
        let login: void | String | User = await postLogin(url, email, password);
        if (login === 'Invalid credentials') {
            phoneError = false;
            passwordError = true;
            error = 'Invalid credentials';
        } else if (login === 'User not found') {
            phoneError = true;
            passwordError = true;
            error = 'User not found';
        } else {
            loginToken.set(String(localStorage.getItem('token')));
        }
    }
</script>

<div class="my-2">
    <div class="flex items-center justify-center py-8">
        <img src={title} alt="title" />
    </div>
    <div class="flex items-center justify-center py-4 w-[100%]">
        <form class="flex flex-col items-center justify-between w-[100%]" method="POST">
            <div class="relative rounded {phoneError ? 'border-red-500 border-2' : 'border-secondary border-b-2'} drop-shadow m-4">
                <img class="absolute left-2 top-2" src={email_logo} alt="email_logo" />
                <input class="w-full outline-none border-none pl-10 pr-12 py-2 bg-background rounded" type="text"
                       placeholder="Email" bind:value={email}>
            </div>
            <div class="relative rounded {passwordError ? 'border-red-500 border-2' : 'border-secondary border-b-2'} drop-shadow m-4">
                <img class="absolute left-2 top-2" src={password_logo} alt="password_logo" />
                <input class="w-full outline-none border-none pl-10 pr-12 py-2 bg-background rounded" type="password"
                       placeholder="Password" bind:value={password}>
            </div>
            <button on:click={signIn} type="submit" class="planItem py-4 px-10 bg-primary text-lg rounded-xl inline-block">Log in</button>
        </form>
    </div>
    <div class="flex flex-col items-center justify-between py-2 w-[100%]">
        <h2 class="text-xl">No account?</h2>
        <button on:click={() => $signupPage = !$signupPage} class="planItem m-4 py-4 px-10 bg-primary bg-opacity-30 text-lg rounded-xl inline-block">Sign up</button>
    </div>
    {#if error === "Invalid credentials"}
        <p class="text-red-500">Invalid credentials</p>
    {:else if error === "User not found"}
        <p class="text-red-500">User not found</p>
    {/if}
</div>

<style>
    .planItem {
        transition: transform 0.2s ease;
    }

    .planItem:hover {
        transform: scale(1.1);
    }
</style>
