<script lang="ts">
    export let toggleSettings: () => void;
    import profilePic from "$lib/images/profile.jpeg";
</script>

<div class="flex flex-col justify-center items-center w-[80%] h-[70%]">
    <div class="p-2">
        <h1 class="text-2xl font-semibold h-[10%]">Settings</h1>
    </div>
    <div class="flex flex-col justify-between items-center p-2 h-[35%]">
        <img src={profilePic} alt="profile" class="rounded-full w-36 h-36"/>
        <button class="py-1 px-6 bg-primary text-lg rounded-xl">Change picture</button>
    </div>
    <div class="flex-1 flex flex-col justify-evenly w-[80%] h-[40%]">
        <div class="flex flex-row justify-between items-center">
            <label for="toggle" class="cursor-pointer">Dark Mode</label>
            <input id="toggle" type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600">
        </div>
        <button class="planItem py-1 bg-secondary bg-opacity-20 text-lg rounded-xl">Change password</button>
        <button class="planItem py-1 bg-red-300 text-lg rounded-xl">Sign out</button>
    </div>
    <div class="flex flex-row justify-evenly p-2 w-[70%] h-[10%]">
        <button class="planItem py-1 px-6 bg-secondary bg-opacity-20 text-lg rounded-xl" on:click={toggleSettings}>Close</button>
        <button class="planItem py-1 px-6 bg-primary text-lg rounded-xl" on:click={toggleSettings}>Save</button>
    </div>
</div>
