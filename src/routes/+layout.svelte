<script>
  import "../app.css";
</script>


<div class={"flex items-center justify-center h-screen bg-background overflow-auto"}>
    <div class="flex-shrink flex flex-col content-center self-start md:self-center text-center sm:h-screen md:h-[63%] w-80 overflow-auto px-6 m-5">
        <slot />
    </div>
</div>
