<script>
    import title from '$lib/images/title.png';
    import email_logo from '$lib/images/email_logo.png';
    import password_logo from '$lib/images/password_logo.png';
</script>

<div class="my-2">
    <div class="flex items-center justify-center py-8">
        <img src={title} alt="title" />
    </div>
    <div class="flex items-center justify-center py-4 w-[100%]">
        <form class="flex flex-col items-center justify-between w-[100%]" method="POST">
            <div class="relative border-b-2 border-secondary drop-shadow m-4">
                <img class="absolute left-2 top-2" src={email_logo} alt="email_logo" />
                <input class="w-full outline-none border-none pl-10 pr-12 py-2 bg-background rounded" type="text" placeholder="Email">
            </div>
            <div class="relative border-b-2 border-secondary drop-shadow m-4">
                <img class="absolute left-2 top-2" src={password_logo} alt="password_logo" />
                <input class="w-full outline-none border-none pl-10 pr-12 py-2 bg-background rounded" type="password" placeholder="Password">
            </div>
            <button class="flex-1 m-4 p-5 rounded-lg bg-primary w-1/2">Log in</button>
        </form>
    </div>
    <div class="flex flex-col items-center justify-between py-2 w-[100%]">
        <h2 class="text-xl">No account?</h2>
        <button class="flex-1 m-4 p-5 rounded-lg bg-primary bg-opacity-30 w-1/2">Sign up</button>
        <a href="/main" class="flex-1 m-4 p-5 rounded-lg bg-primary w-1/2">Plan as a Guest</a>
    </div>
</div>
