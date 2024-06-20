<script lang="ts">
  let copiedToClipboard: boolean = false;

  const copyToClipboard = async () => {
      const textToCopy: string | null | undefined = document.querySelector('.schedule_link')?.textContent;
      if (!textToCopy) return;
      await navigator.clipboard.writeText(textToCopy);
      copiedToClipboard = true;
      setTimeout(() => {
          copiedToClipboard = false;
      }, 3000);
  }

</script>

<div class="flex flex-col space-y-6 justify-center h-[100%] w-[100%]">
    <!-- Temporary link "generated" -->
    <h1 class="text-4xl">Start linking up!</h1>
    <div class="flex flex-col pt-5 space-y-2 items-center">
        <p class="text-lg">Share this link with your friends to start planning!</p>
        <button class="schedule_link shadow shadow-accent py-1 px-4 rounded" on:click={copyToClipboard}>
            linkup.w/me/scheduler/420
        </button>
        {#if copiedToClipboard}
            <p class="copied-text text-accent">Copied to clipboard!</p>
        {/if}
    </div>
    <div class="flex flex-row justify-evenly">
        <a href="../main" class="bg-primary py-2 px-10 rounded text-lg">Home</a>
    </div>
</div>
