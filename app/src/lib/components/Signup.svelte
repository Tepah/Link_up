<script lang="ts">
    import {postNewUser} from "$lib/api";

    let username = '';
    let usernameError = false;
    let name = '';
    let nameError = false;
    let email = '';
    let emailError = false;
    let password = '';
    let passwordError = false;
    let confirmPassword = '';
    let confirmPasswordError = false;
    let error: String | null | any = null;

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            error = 'passwordMismatch'
        } else {
            const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
            const user: User = {
                username: username,
                name: name,
                email: email,
                password: password,
            };
            error = await postNewUser(url, user);
        }
    }

    $: {
        if (error) {
            setTimeout(() => {
                error = null;
            }, 3000);
        }
    }
</script>

<div class="flex flex-col space-y-6 content-center items-center ">
    <h1 class="text-2xl font-bold pt-20 md:pt-0">Create an account</h1>
    <form class="flex flex-col" method="POST">
        <div class="relative border-b-2 border-secondary drop-shadow m-4">
            <input class="w-full outline-none border-none p-10 py-2 bg-background rounded" id="username" type="text" bind:value={username} placeholder="Username">
        </div>
        <div class="relative border-b-2 border-secondary drop-shadow m-4">
            <input class:text-red-500={nameError} class="w-full outline-none border-none p-10 py-2 bg-background rounded" id="name" type="text" bind:value={name} placeholder="Name">
        </div>
        <div class="relative border-b-2 border-secondary drop-shadow m-4">
            <input class="w-full outline-none border-none p-10 py-2 bg-background rounded" id="email" type="text" bind:value={email} placeholder="Email">
        </div>
        <div class="relative border-b-2 border-secondary drop-shadow m-4">
            <input class="w-full outline-none border-none p-10 py-2 bg-background rounded" id="password" type="password" bind:value={password} placeholder="Password">
        </div>
        <div class="relative border-b-2 border-secondary drop-shadow m-4">
            <input class="w-full outline-none border-none p-10 py-2 bg-background rounded" id="confirmPassword" type="password" bind:value={confirmPassword} placeholder="Confirm Password">
        </div>
        <button on:click={handleSubmit} type="submit" class="m-10 py-3 px-6 bg-primary text-lg rounded-xl inline-block">Sign up</button>
    </form>
    {#if error === 'passwordMismatch'}
        <p class="text-red-500">Passwords do not match</p>
    {:else if error === 'user_exists'}
        <p class="text-red-500">User already exists</p>
    {:else if error === 'bad_request'}
        <p class="text-red-500">User not found</p>
    {:else if error === 'Invalid credentials'}
        <p class="text-red-500">Invalid credentials</p>
    {:else if error === "error"}
        <p class="text-red-500">Please fill in all fields</p>
    {/if}
</div>
