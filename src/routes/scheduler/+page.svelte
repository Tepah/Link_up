<script lang="ts">
  import Calendar from "$lib/components/Calendar.svelte";

  let selectedDates: Date[] = [];

  const handleSubmit = () => {
    console.log(selectedDates);
  };
</script>


<div class="flex flex-col justify-center space-y-4 h-[100%] w-[90%]">
    <div class="relative">
        <a href="/main" class="absolute -top-8 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </a>
    </div>
    <p class="">Choose your availability:</p>
    <Calendar selectedDates={selectedDates} />
    <div class="flex flex-row justify-evenly">
        <button class="bg-primary py-2 px-4 rounded-xl">Submit</button>
    </div>
</div>
