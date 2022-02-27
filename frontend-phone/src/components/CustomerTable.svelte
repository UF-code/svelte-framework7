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

    // CUSTOMER
    $: customer = {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        birthdate: '',
    }

    // USEFUL METHODS //
    let padToTwo = (number) => (number <= 99 ? `0${number}`.slice(-2) : number)

    let find_customer = (customer_id) =>
        $store_customers.find((customer) => customer.id === customer_id)
    // USEFUL METHODS //

    // SETTING POPUP VARIABLES
    const handleData = (id_) => {
        let current_customer = find_customer(id_)
        customer.id = current_customer.id
        customer.first_name = current_customer.first_name
        customer.last_name = current_customer.last_name
        customer.email = current_customer.email
        customer.birthdate = current_customer.birthdate
    }

    // EDITING CUSTOMER
    const editCustomer = () => {
        axios
            .put(`/updateCustomer/${customer.id}`, customer)
            .then(() => {
                let current_customer = find_customer(customer.id)
                current_customer.first_name = customer.first_name
                current_customer.last_name = customer.last_name
                current_customer.email = customer.email
                current_customer.birthdate = `${customer.birthdate.getFullYear()}-${padToTwo(
                    customer.birthdate.getMonth() + 1
                )}-${padToTwo(customer.birthdate.getDate())}`

                store_customers.set($store_customers)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    // DELETING CUSTOMER
    const deleteCustomer = () => {
        let customer_removed = $store_customers.filter(
            (customer_remove) => customer_remove.id != customer.id
        )
        axios
            .delete(`/deleteCustomer/${customer.id}`)
            .then(($store_customers = [...customer_removed]))
            .catch((err) => {
                console.error(err)
            })
    }
</script>

<List mediaList>
    {#each $store_customers as customer}
        <ListItem title={`Customer ID: ${customer.id}  `}>
            <p>Full Name: {customer.first_name} {customer.last_name}</p>
            <p>Email: {customer.email}</p>
            <p>Birthdate: {customer.birthdate}</p>
            <Row>
                <Col>
                    <Button
                        fill
                        round
                        popupOpen=".edit-popup-swipe"
                        on:click={handleData(customer.id)}>Edit</Button
                    >
                </Col>
                <Col>
                    <Button
                        fill
                        round
                        popupOpen=".delete-popup-swipe"
                        on:click={handleData(customer.id)}>Delete</Button
                    >
                </Col>
            </Row>
        </ListItem>
    {/each}
</List>

<!-- EDIT CUSTOMER -->
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

<!-- DELETE CUSTOMER -->
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
                }}
            />
            <Button
                fill
                round
                small
                popupClose=".delete-popup-swipe"
                on:click={deleteCustomer}>Delete Customer</Button
            >
        </List>

        <div
            style="height: 100%"
            class="display-flex justify-content-center align-items-center"
        />
    </Page>
</Popup>
