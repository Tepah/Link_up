<script>
    import titleLogo from "$lib/images/main_title.png";
    export let data;
</script>


<div class="flex items-center justify-center">
    <img src="{titleLogo}" alt="title logo">
</div>
<div class="">
    <p>Hi, <span class="text-accent"> name</span>!</p>
    <p>Here's what's happening today.</p>
</div>
<div class="flex">
    <p class="text-start">Upcoming Plans</p>
    {#if data.upcomingPlans.length === 0}

    {/if}
</div>
<div>
    <p>Current Plans</p>
    <!-- TODO: Add a list of current plans -->
</div>
<div>
    <button>New Plan</button>
</div>
