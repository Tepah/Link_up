<script lang="ts">
    export let toggleSettings: () => void;
    import profilePic from "$lib/images/profile.jpeg";

    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
</script>

<div class="flex flex-col justify-center items-center w-[80%] space-y-4">
    <h1 class="text-2xl font-semibold">Settings</h1>
    <div class="flex flex-col justify-center space-y-4 items-center p-2">
        <img src={profilePic} alt="profile" class="rounded-full w-40 h-40"/>
    </div>
    <div class="flex-1 flex flex-col justify-between w-[80%] space-y-4">
        <div class="flex flex-row justify-between items-center">
            <label for="toggle" class="cursor-pointer">Dark Mode</label>
            <input id="toggle" type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600">
        </div>
        <button on:click={()=> handleSignOut()} class="planItem py-3 bg-red-300 text-lg rounded-xl">Sign out</button>
    </div>
    <div class="flex-1 flex flex-row justify-evenly w-[100%]">
        <button class="planItem py-3 px-8 bg-primary text-lg rounded-xl inline-block" on:click={toggleSettings}>Close</button>
        <button class="planItem py-3 px-8 bg-primary text-lg rounded-xl inline-block" on:click={toggleSettings}>Save</button>
    </div>
</div>

<style>
    .planItem {
        transition: transform 0.2s ease;
    }

    .planItem:hover {
        transform: scale(1.1);
    }
</style>

