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

    export let customer
</script>

<Sheet
    class="add-customer"
    style="height: auto; --f7-sheet-bg-color: #fff"
    swipeToClose
    backdrop
>
    <List noHairlines>
        <ListItem>
            <ListInput
                label="First Name"
                floatingLabel
                type="text"
                placeholder="First Name"
                bind:value={customer.first_name}
            />
        </ListItem>
        <ListItem>
            <ListInput
                label="Last Name"
                floatingLabel
                type="text"
                placeholder="Last Name"
                bind:value={customer.last_name}
            />
        </ListItem>
        <ListItem>
            <ListInput
                label="E-mail"
                floatingLabel
                type="email"
                validate
                placeholder="Your e-mail"
                bind:value={customer.email}
            />
        </ListItem>
        <ListItem>
            <ListInput
                label="Birthday"
                type="date"
                bind:value={customer.birthdate}
            />
        </ListItem>
    </List>

    <div class="sheet-modal-swipe-step">
        <div class="padding-horizontal padding-bottom">
            <Button
                fill
                round
                small
                sheetClose=".add-customer"
                on:click={() => dispatch('add_customer', customer)}
                >Add Customer</Button
            >
        </div>
    </div>
</Sheet>
