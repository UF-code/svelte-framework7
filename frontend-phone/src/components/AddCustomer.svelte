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
    } from 'framework7-svelte'
    export let test_store_customers
    import axios from '../js/axios.js'
    import { store_customers } from '../js/customer_store.js'

    let first_name, last_name, email, birthdate
    let customer

    console.log('test_store_customers')
    console.log(test_store_customers)
    console.log('test_store_customers')

    const handleSubmit = () => {
        axios
            .post('/addCustomer', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                birthdate: birthdate,
            })
            .then((res) => {
                customer = res.data

                store_customers.update((currentCustomers) => {
                    return [
                        ...currentCustomers,
                        {
                            id: customer.id,
                            first_name: customer.first_name,
                            last_name: customer.last_name,
                            email: customer.email,
                            birthdate: customer.birthdate,
                        },
                    ]
                })

                test_store_customers = [
                    ...test_store_customers,
                    {
                        id: customer.id,
                        first_name: customer.first_name,
                        last_name: customer.last_name,
                        email: customer.email,
                        birthdate: customer.birthdate,
                    },
                ]
                console.log(test_store_customers)
            })
            .then(() => {
                first_name = ''
                last_name = ''
                email = ''
                birthdate = ''
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
                bind:value={first_name}
            />

            <ListInput
                label="Last Name"
                floatingLabel
                type="text"
                placeholder="Last Name"
                clearButton
                bind:value={last_name}
            />

            <ListInput
                label="E-mail"
                floatingLabel
                type="email"
                validate
                placeholder="Your e-mail"
                clearButton
                bind:value={email}
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
                        opened: function () {
                            console.log(birthdate)
                        },
                        calendarChange: (v) => {
                            birthdate = v.value[0]
                            console.log(v.value)
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
                on:click={() => {
                    console.log(first_name)
                    console.log(last_name)
                    console.log(email)
                    console.log(birthdate)
                    handleSubmit()
                }}>Add Customer</Button
            >
        </List>

        <div
            style="height: 100%"
            class="display-flex justify-content-center align-items-center"
        />
    </Page>
</Popup>
