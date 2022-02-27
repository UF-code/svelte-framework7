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

    let padToTwo = (number) => (number <= 99 ? `0${number}`.slice(-2) : number)
    let first_name, last_name, email, birthdate, id

    // CUSTOMER
    $: customer = {
        id: '',
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
                            customer_.birthdate = customer.birthdate
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

    const handleDelete = (id_) => {
        let current_customer = filter_same_id(id_)
        customer.id = current_customer.id
        customer.first_name = current_customer.first_name
        customer.last_name = current_customer.last_name
        customer.email = current_customer.email
        customer.birthdate = current_customer.birthdate
    }
    const deleteCustomer = () => {
        let newlist = $store_customers.filter(
            (customer_) => customer_.id != customer.id
        )
        console.log(newlist)

        axios
            .delete(`/deleteCustomer/${customer.id}`)
            .then((res) => {
                console.log(res)
                console.log(res.data)

                $store_customers = [...newlist]
            })
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
                        on:click={handleEdit(customer.id)}>Edit</Button
                    >
                </Col>
                <Col>
                    <Button
                        fill
                        round
                        popupOpen=".delete-popup-swipe"
                        on:click={handleDelete(customer.id)}>Delete</Button
                    >
                </Col>
            </Row>
        </ListItem>
    {/each}
</List>

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
            >
                <!-- <i class="icon edit-list-icon" slot="media" /> -->
            </ListInput>
            <!-- onInput={(e) => (first_name = e.target.value)} -->
            <!-- value={first_name} -->
            <ListInput
                label="Last Name"
                floatingLabel
                type="text"
                placeholder="Last Name"
                clearButton
                bind:value={customer.last_name}
            >
                <!-- <i class="icon edit-list-icon" slot="media" /> -->
            </ListInput>

            <ListInput
                label="E-mail"
                floatingLabel
                type="email"
                validate
                placeholder="Your e-mail"
                clearButton
                bind:value={customer.email}
            >
                <!-- <i class="icon edit-list-icon" slot="media" /> -->
            </ListInput>

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
                        calendarInit: () => {
                            console.log(birthdate)
                        },
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
            <!-- 
            <ListInput
                label="Birthday"
                type="date"
                value={birthdate}
                placeholder="Please choose..."
            >
                <i class="icon demo-list-icon" slot="media" />
            </ListInput> -->

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
            >
                <!-- <i class="icon edit-list-icon" slot="media" /> -->
            </ListInput>
            <!-- onInput={(e) => (first_name = e.target.value)}
                onChange={() => {
                    console.log(first_name)
                }} -->

            <ListInput
                label="Last Name"
                floatingLabel
                type="text"
                placeholder="Last Name"
                clearButton
                bind:value={customer.last_name}
            >
                <!-- <i class="icon edit-list-icon" slot="media" /> -->
            </ListInput>

            <ListInput
                label="E-mail"
                floatingLabel
                type="email"
                validate
                placeholder="Your e-mail"
                clearButton
                bind:value={customer.email}
            >
                <!-- <i class="icon edit-list-icon" slot="media" /> -->
            </ListInput>

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
