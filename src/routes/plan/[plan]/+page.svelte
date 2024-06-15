<script>
  export let data;
</script>

<div>
    <h1>{data.plan.date}</h1>
    <p>{data.plan.description}</p>
    <p>{data.plan.date}</p>
    <p>{data.plan.id}</p>
    <div>
        {#each data.plan.attending as attendee}
            <p>{attendee}</p>
        {/each}
    </div>
</div>
