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
        ListInput,
    } from 'framework7-svelte'

    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let current_customer
</script>

<Sheet
    class="demo-sheet-swipe-to-step"
    style="height: auto; --f7-sheet-bg-color: #fff"
    swipeToClose
    backdrop
>
    <BlockTitle medium class="margin-top"
        >Customer ID: {$current_customer.id}</BlockTitle
    >
    <List noHairlines>
        <ListItem>
            <ListInput
                label="First Name"
                floatingLabel
                type="text"
                placeholder="First Name"
                clearButton
                disabled
                bind:value={$current_customer.first_name}
            />
        </ListItem>
        <ListItem>
            <ListInput
                label="Last Name"
                floatingLabel
                type="text"
                placeholder="Last Name"
                clearButton
                bind:value={$current_customer.last_name}
            />
        </ListItem>
        <ListItem>
            <ListInput
                label="E-mail"
                floatingLabel
                type="email"
                validate
                placeholder="Your e-mail"
                clearButton
                bind:value={$current_customer.email}
            />
        </ListItem>
        <ListItem>
            <ListInput
                label="Birthday"
                type="date"
                bind:value={$current_customer.birthdate}
            />
        </ListItem>
    </List>

    <div class="sheet-modal-swipe-step">
        <div class="padding-horizontal padding-bottom">
            <Button
                large
                fill
                sheetClose=".demo-sheet-swipe-to-step"
                on:click={() => dispatch('delete_customer', $current_customer)}
                >Delete Customer</Button
            >
        </div>
    </div>
</Sheet>
