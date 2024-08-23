<script lang="ts">
    import title from '$lib/images/title.png';
    import email_logo from '$lib/images/email_logo.png';
    import password_logo from '$lib/images/password_logo.png';
    import Signup from '$lib/components/Signup.svelte';
    import {authenticateToken, getUserByID, postLogin} from '$lib/api';
    import {onMount} from "svelte";
    import {loginToken} from '$lib/stores.js';
    import {signupPage} from '$lib/stores.js';
    import Login from "$lib/components/Login.svelte";
    import Main from "$lib/components/Main.svelte";

    console.log($signupPage);

    $: console.log($loginToken);

    onMount(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            $loginToken = token;
            const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
            const tokenResult = await authenticateToken(url, token);
            if (tokenResult === 'Invalid token') {
                localStorage.removeItem('token');
                $loginToken = null;
            } else {
                const userID = tokenResult.id;
            }
        }
    });
</script>

{#if !$loginToken}
    {#if !$signupPage}
        <Login />
    {:else}
        <div class="flex flex-col space-y-6 w-[100%]">
            <div class="relative">
                <button on:click={() => $signupPage = !$signupPage} class="absolute top-0 left-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>
            <Signup />
        </div>
    {/if}
{:else}
    <Main />
{/if}
