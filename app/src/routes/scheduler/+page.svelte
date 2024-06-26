<script>
    import { availableDates } from "$lib/stores.js";

    const handleConfirmClick = () => {
        // This is where the selected dates are sent to the server
        console.log($availableDates);
    }
</script>

<div class="flex flex-row justify-evenly">
    <!-- Temporary link "generated" -->
    <!--<a href="/share/420" class="bg-primary py-2 px-10 rounded text-lg">Confirm</a> -->
    <button on:click={ () => handleConfirmClick() } class="bg-primary py-2 px-10 rounded text-lg">Confirm</button>
</div>
