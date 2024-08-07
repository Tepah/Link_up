<script lang="ts">
    import {postNewUser} from "$lib/api";

    let username = '';
    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
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
            console.log(error);
        }
    }
</script>

<div class="flex flex-col space-y-6 content-center items-center">
    <h1 class="text-2xl font-bold pt-20 md:pt-0">Create an account</h1>
    <form class="flex flex-col space-y-6" method="POST">
        <div>
            <input id="username" type="text" bind:value={username} placeholder="Username">
        </div>
        <div>
            <input id="name" type="text" bind:value={name} placeholder="Name">
        </div>
        <div>
            <input id="email" type="text" bind:value={email} placeholder="Email">
        </div>
        <div>
            <input id="password" type="password" bind:value={password} placeholder="Password">
        </div>
        <div>
            <input id="confirmPassword" type="password" bind:value={confirmPassword} placeholder="Confirm Password">
        </div>
        <button on:click={handleSubmit} type="submit" class="py-3 px-6 bg-primary text-lg rounded-xl inline-block">Sign up</button>
    </form>
</div>
