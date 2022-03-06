<script>
    import {
        Popup,
        Page,
        Navbar,
        NavRight,
        Link,
        List,
        ListInput,
        Button,
    } from 'framework7-svelte'

    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let current_customer
</script>

<Popup class="delete-popup-swipe" swipeToClose>
    <Page>
        <Navbar title="Edit Customer Hey">
            <NavRight>
                <Link popupClose>Close</Link>
            </NavRight>
        </Navbar>

        <List noHairlinesMd>
            <ListInput
                label="First Name"
                floatingLabel
                type="text"
                placeholder="First Name"
                clearButton
                bind:value={$current_customer.first_name}
            />

            <ListInput
                label="Last Name"
                floatingLabel
                type="text"
                placeholder="Last Name"
                clearButton
                bind:value={$current_customer.last_name}
            />

            <ListInput
                label="E-mail"
                floatingLabel
                type="email"
                validate
                placeholder="Your e-mail"
                clearButton
                bind:value={$current_customer.email}
            />

            <ListInput
                label="Birthday"
                type="date"
                bind:value={$current_customer.birthdate}
            />

            <Button
                fill
                round
                small
                popupClose=".delete-popup-swipe"
                on:click={() => dispatch('delete1', $current_customer)}
                >Delete Customer</Button
            >
        </List>

        <div
            style="height: 100%"
            class="display-flex justify-content-center align-items-center"
        />
    </Page>
</Popup>
