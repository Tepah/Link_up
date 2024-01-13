<script>
  import "../app.css";
</script>


<div class={"flex items-center justify-center h-screen bg-background"}>
    <div class="flex-shrink flex flex-col self-start md:self-center text-center sm:h-screen md:h-[63%] overflow-auto px-6 m-5">
        <slot />
    </div>
</div>
