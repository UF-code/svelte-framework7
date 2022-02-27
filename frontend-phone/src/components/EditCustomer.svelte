<script>
    // FRAMEWORK7 COMPONENTS
    import {
        Navbar,
        List,
        ListItem,
        Row,
        Col,
        Button,
        Popup,
        Page,
        NavRight,
        Link,
        ListInput,
    } from 'framework7-svelte'
    // FETCHING DATA FROM CUSTOM API
    import axios from '../js/axios.js'
    // STORING REACTIVE DATA IN STORE CUSTOMERS
    import { store_customers } from '../js/customer_store.js'

    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    let padToTwo = (number) => (number <= 99 ? `0${number}`.slice(-2) : number)

    $: customer = {
        first_name: '',
        last_name: '',
        email: '',
        birthdate: '',
    }

    let filter_same_id = (customer_id_) =>
        $store_customers.filter((customer) => customer.id == customer_id_)[0]

    // let update_customer =

    const handleEdit = (id_) => {
        let current_customer = filter_same_id(id_)
        customer.id = current_customer.id
        customer.first_name = current_customer.first_name
        customer.last_name = current_customer.last_name
        customer.email = current_customer.email
        customer.birthdate = current_customer.birthdate

        console.log(`Handle Edit ID: ${id_}`)
    }

    const editCustomer = () => {
        axios
            .put(`/updateCustomer/${customer.id}`, customer)
            .then(() => {
                store_customers.update((currentCustomers) => {
                    currentCustomers.map((customer_) => {
                        if (customer_.id == customer.id) {
                            customer_.first_name = customer.first_name
                            customer_.last_name = customer.last_name
                            customer_.email = customer.email
                            customer_.birthdate = `${customer.birthdate.getFullYear()}-${padToTwo(
                                customer.birthdate.getMonth() + 1
                            )}-${padToTwo(customer.birthdate.getDate())}`
                        }
                    })

                    console.log(currentCustomers)

                    return [...currentCustomers]
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }
</script>

<Popup class="edit-popup-swipe" swipeToClose>
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
                            console.log(v)
                            customer.birthdate = v.value[0]
                            console.log(v.value)
                        },
                    },
                    monthNames: [
                        'Ocak',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ],
                }}
            />

            <Button
                fill
                round
                small
                popupClose=".edit-popup-swipe"
                on:click={editCustomer}>Edit Customer</Button
            >
        </List>

        <div
            style="height: 100%"
            class="display-flex justify-content-center align-items-center"
        />
    </Page>
</Popup>
