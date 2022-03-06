<script>
    // FRAMEWORK7 COMPONENTS
    import {
        List,
        ListItem,
        Row,
        Button,
        Fab,
        Icon,
        FabButtons,
        BlockTitle,
        Sheet,
    } from 'framework7-svelte'
</script>

<Sheet
    class="demo-sheet-swipe-to-step"
    style="height: auto; --f7-sheet-bg-color: #fff"
    swipeToClose
    backdrop
>
    <div class="sheet-modal-swipe-step">
        <div
            class="display-flex padding justify-content-space-between align-items-center"
        >
            <div style="font-size: 18px"><b>Total:</b></div>
            <div style="font-size: 22px"><b>$500</b></div>
        </div>
        <div class="padding-horizontal padding-bottom">
            <Button large fill>Make Payment</Button>
            <!-- <div class="margin-top text-align-center">
                Swipe up for more details
            </div> -->
        </div>
    </div>
    <BlockTitle medium class="margin-top">Your order:</BlockTitle>
    <List noHairlines>
        <ListItem title="Item 1">
            <b slot="after" class="text-color-black">$200</b>
        </ListItem>
        <ListItem title="Item 2">
            <b slot="after" class="text-color-black">$180</b>
        </ListItem>
        <ListItem title="Delivery">
            <b slot="after" class="text-color-black">$120</b>
        </ListItem>
    </List>
</Sheet>
