<script lang="ts">
  import { onMount } from 'svelte';

  let plan: Plan;
  onMount(() => {
    plan = JSON.parse(String(sessionStorage.getItem('plan')));
    console.log(plan);
  });
</script>

<div>
    {#if plan}
        <h1>{plan.title}</h1>
        {#if plan.description}
            <p>{plan.description}</p>
        {/if}
        <p>{plan.date}</p>
        {#each plan.attending as attendee}
            <p>{attendee}</p>
        {/each}
    {:else}
        <h1>Plan not found</h1>
    {/if}
</div>
