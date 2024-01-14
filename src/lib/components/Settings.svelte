<script lang="ts">
    export let toggleSettings: () => void;
    import profilePic from "$lib/images/profile.jpeg";
</script>

<div class="flex flex-col justify-center items-center w-[100%]">
    <div>
        <h1 class="text-2xl font-semibold">Settings</h1>
    </div>
    <div>
        <img src={profilePic} alt="profile" class="rounded-full w-24 h-24"/>
    </div>
    <div>
        <p>Dark Mode</p>
        <p>Change name</p>
        <p>Change email</p>
        <p>Change phone number</p>
        <p>Change password</p>
        <p>Sign out</p>
    </div>
    <div class="flex flex-row justify-evenly p-2 w-[90%]">
        <button class="planItem py-1 px-6 bg-primary text-lg rounded-xl" on:click={toggleSettings}>Close</button>
    </div>
</div>
