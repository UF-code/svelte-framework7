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
    import axios from '../js/axios.js'
    import { store_customers } from '../js/customer_store.js'
    export let customer_id

    let first_name, last_name, email, birthdate

    const current_customer = $store_customers.find(
        (customer) => customer.id == customer_id
    )

    first_name = current_customer.first_name
    last_name = current_customer.last_name
    email = current_customer.email
    birthdate = current_customer.birthdate

    const handleEdit = () => {
        console.log('hey')
    }
</script>

<Button fill round popupOpen=".demo-popup-swipe">Edit</Button>

<Popup class="demo-popup-swipe" swipeToClose>
    <Page>
        <Navbar title="Add New Customer">
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
                value={first_name}
                onInput={(e) => (first_name = e.target.value)}
                onChange={() => {
                    console.log(first_name)
                }}
            >
                <!-- <i class="icon demo-list-icon" slot="media" /> -->
            </ListInput>

            <ListInput
                label="Last Name"
                floatingLabel
                type="text"
                placeholder="Last Name"
                clearButton
                value={last_name}
                onInput={(e) => (last_name = e.target.value)}
                onChange={() => {
                    console.log(last_name)
                }}
            >
                <!-- <i class="icon demo-list-icon" slot="media" /> -->
            </ListInput>

            <ListInput
                label="E-mail"
                floatingLabel
                type="email"
                validate
                placeholder="Your e-mail"
                clearButton
                value={email}
                onInput={(e) => (email = e.target.value)}
                onChange={() => {
                    console.log(email)
                }}
            >
                <!-- <i class="icon demo-list-icon" slot="media" /> -->
            </ListInput>

            <ListInput
                label="Birthdate"
                type="datepicker"
                placeholder="Select date"
                readonly
                value={birthdate}
                calendarParams={{
                    openIn: 'customModal',
                    header: true,
                    footer: true,
                    dateFormat: 'MM dd yyyy',
                }}
                onCalendarChange={(date_value) => {
                    birthdate = date_value
                    console.log(birthdate[0])
                }}
            />
            <Button
                fill
                round
                small
                popupClose=".demo-popup-swipe"
                on:click={() => handleEdit()}>Add Customer</Button
            >
        </List>

        <div
            style="height: 100%"
            class="display-flex justify-content-center align-items-center"
        />
    </Page>
</Popup>
