<script>
    import { Button, Offcanvas, Icon } from 'sveltestrap'

    let endOpen = false
    const toggleEnd = () => (endOpen = !endOpen)
</script>

<div>
    <Button outline color="light" on:click={() => (endOpen = !endOpen)}
        ><Icon name="list" /></Button
    >

    <Offcanvas
        isOpen={endOpen}
        toggle={toggleEnd}
        placement="end"
        header="uf-code"
        class="bg-light"
    >
        <div class="Container ml-2">
            <div class=" ">
                <a
                    class="text-decoration-none  fs-4 ml-5 my-2 "
                    on:click={toggleEnd}
                    href="/">Customers</a
                >
            </div>
            <div class="">
                <a
                    class="text-decoration-none  fs-4 ml-5 my-2 "
                    on:click={toggleEnd}
                    href="/about">About</a
                >
            </div>
        </div>
    </Offcanvas>
</div>
