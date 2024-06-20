<script>
  import "../app.css";
</script>


<div class={"flex items-center justify-center h-screen bg-background overflow-auto"}>
    <div class="flex flex-col content-center items-center self-start md:self-center text-center h-[100%] md:h-[63%] w-[100%]
    md:w-96 overflow-auto p-9 md:p-0">
        <slot />
    </div>
</div>
