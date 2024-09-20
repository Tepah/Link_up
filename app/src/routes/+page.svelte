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

    let loading = true;

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
            }
        }
        loading = false;
    });
</script>

{#if !loading}
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
{:else}
    <div class="flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="size-6 animate-spin">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
        </svg>
    </div>
{/if}
