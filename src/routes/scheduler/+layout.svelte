<script lang="ts">
  import Calendar from "$lib/components/Calendar_1.svelte";

  let selectedDates: Date[] = [];

</script>


<div class="flex flex-col space-y-6 h-[100%] w-[100%]">
    <div class="relative">
        <a href="/main" class="absolute top-0 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </a>
    </div>
    <div class="flex flex-col">
        <p class="text-lg pb-6 pt-20 md:pt-0">Choose your availability:</p>
        <Calendar selectedDates={selectedDates} />
    </div>
    <slot />
</div>
