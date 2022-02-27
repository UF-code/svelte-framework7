<script>
    import {
        Block,
        Button,
        Popup,
        Page,
        Navbar,
        NavRight,
        Link,
        List,
        ListInput,
        Fab,
        Icon,
        Toolbar,
    } from 'framework7-svelte'

    // FETCHING DATA FROM CUSTOM API
    import axios from '../js/axios.js'
    // STORING REACTIVE DATA IN STORE CUSTOMERS
    import { store_customers } from '../js/customer_store.js'

    $: customer = {
        first_name: '',
        last_name: '',
        email: '',
        birthdate: '',
    }

    const addCustomer = () => {
        axios
            .post('/addCustomer', customer)
            .then((res) => {
                store_customers.update((currentCustomers) => {
                    return [...currentCustomers, res.data]
                })
            })
            .then(() => {
                customer.first_name = ''
                customer.last_name = ''
                customer.email = ''
                customer.birthdate = ''
            })
            .catch((err) => {
                console.error(err)
            })
    }
</script>

<Block strong>
    <Button fill round popupOpen=".add-popup-swipe">Add Customer</Button>
</Block>

<Popup class="add-popup-swipe" swipeToClose>
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
                bind:value={customer.first_name}
            />

            <ListInput
                label="Last Name"
                floatingLabel
                type="text"
                placeholder="Last Name"
                clearButton
                bind:value={customer.last_name}
            />

            <ListInput
                label="E-mail"
                floatingLabel
                type="email"
                validate
                placeholder="Your e-mail"
                clearButton
                bind:value={customer.email}
            />

            <ListInput
                label="Birthdate"
                type="datepicker"
                placeholder="Select date"
                readonly
                calendarParams={{
                    openIn: 'customModal',
                    header: true,
                    footer: true,
                    dateFormat: 'MM dd yyyy',
                    on: {
                        calendarChange: (v) => {
                            customer.birthdate = v.value[0]
                        },
                    },
                }}
            />
            <!-- <ListInput
                label="Birthday"
                type="date"
                value={birthdate}
                placeholder="Please choose..."
            >
                <i class="icon add-list-icon" slot="media" />
            </ListInput> -->
            <Button
                fill
                round
                small
                popupClose=".add-popup-swipe"
                on:click={addCustomer}>Add Customer</Button
            >
        </List>

        <div
            style="height: 100%"
            class="display-flex justify-content-center align-items-center"
        />
    </Page>
</Popup>
