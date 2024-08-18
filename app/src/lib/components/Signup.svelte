<script lang="ts">
    import {postNewUser} from "$lib/api";
    import {loginToken} from "$lib/stores.js";

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
        usernameError = false;
        nameError = false;
        emailError = false;
        passwordError = false;
        confirmPasswordError = false;
        if (username === '' || name === '' || email === '' || password === '' || confirmPassword === '') {
            error = 'error';
            if (name === '') nameError = true;
            if (username === '') usernameError = true;
            if (email === '') emailError = true;
            if (password === '') passwordError = true;
            if (confirmPassword === '') confirmPasswordError = true;
        }
        else if (password !== confirmPassword) {
            error = 'passwordMismatch';
            passwordError = true;
            confirmPasswordError = true;
        } else if (!email.includes('@') || !email.includes('.')) {
            error = 'emailError';
            emailError = true;
        } else {
            const url = import.meta.env.VITE_PUBLIC_API_BASE_URL;
            const user: User = {
                username: username,
                name: name,
                email: email,
                password: password,
            };
            error = await postNewUser(url, user);
            if (error === 'user_exists') {
                emailError = true;
                console.log("User already exists");
            } else if (error === 'password_error') {
                passwordError = true;
                confirmPasswordError = true;
                console.log("Password error");
            } else {
                loginToken.set(String(localStorage.getItem('token')));
                console.log("User created");
            }
        }
    }

    $: {
        if (error) {
            setTimeout(() => {
                error = null;
            }, 5000);
        }
    }
</script>

<div class="flex flex-col space-y-6 content-center items-center ">
    <h1 class="text-2xl font-bold pt-20 md:pt-0">Create an account</h1>
    <form class="flex flex-col" method="POST">
        <div  class="relative drop-shadow m-4 {usernameError ? 'border-red-500 border-2' : 'border-secondary border-b-2'} rounded">
            <input class="w-full outline-none border-none p-10 py-2 bg-background rounded" id="username" type="text" bind:value={username} placeholder="Username">
        </div>
        <div class="relative {nameError ? 'border-red-500 border-2' : 'border-secondary border-b-2'} rounded drop-shadow m-4">
            <input  class="w-full outline-none border-none p-10 py-2 bg-background rounded" id="name" type="text" bind:value={name} placeholder="Name">
        </div>
        <div class="relative {emailError ? 'border-red-500 border-2' : 'border-secondary border-b-2'} rounded drop-shadow m-4">
            <input class="w-full outline-none border-none p-10 py-2 bg-background rounded" id="email" type="text" bind:value={email} placeholder="Email">
        </div>
        <div class="relative {passwordError ? 'border-red-500 border-2' : 'border-secondary border-b-2'} rounded drop-shadow m-4">
            <input class="w-full outline-none border-none p-10 py-2 bg-background rounded" id="password" type="password" bind:value={password} placeholder="Password">
        </div>
        <div class="relative {confirmPasswordError ? 'border-red-500 border-2' : 'border-secondary border-b-2'} rounded drop-shadow m-4">
            <input class="w-full outline-none border-none p-10 py-2 bg-background rounded" id="confirmPassword" type="password" bind:value={confirmPassword} placeholder="Confirm Password">
        </div>
        <button on:click={handleSubmit} type="submit" class="m-10 py-3 px-6 bg-primary text-lg rounded-xl inline-block">Sign up</button>
    </form>
    {#if error === 'passwordMismatch'}
        <p class="text-red-500">Passwords do not match</p>
    {:else if error === 'password_error'}
        <p class="text-red-500">Password must be longer than 6 characters and contain at least one uppercase letter, one
            lowercase letter, and one number</p>
    {:else if error === 'user_exists'}
        <p class="text-red-500">User already exists</p>
    {:else if error === "error"}
        <p class="text-red-500">Please fill in all fields</p>
    {:else if error === 'emailError'}
        <p class="text-red-500">Please enter a valid email</p>
    {/if}
</div>
