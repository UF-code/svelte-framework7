<script>
    import { value } from 'dom7'

    import {
        Navbar,
        BlockTitle,
        List,
        ListItem,
        SkeletonBlock,
        Card,
        Block,
        Row,
        Col,
        Button,
        Popup,
        Page,
        NavRight,
        Link,
        ListInput,
    } from 'framework7-svelte'
    import AddCustomer from './AddCustomer.svelte'
    import { onMount } from 'svelte'
    import axios from '../js/axios.js'
    import { store_customers } from '../js/customer_store.js'

    onMount(() => {
        axios
            .get(`/getAllCustomers`)
            .then((res) => {
                console.log(res)
                store_customers.set(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    })

    let padToTwo = (number) => (number <= 99 ? `0${number}`.slice(-2) : number)
    let test_date = new Date('2/1/22').getDate()
    console.log(test_date)
    let first_name, last_name, email, birthdate, id

    // let test_customer = {
    //     first: '',
    //     last: '',
    // }

    // $: test_store = {
    //     first: first_name,
    //     last: last_name,
    // }
    // $: {
    //     console.log(first + ' ** ' + last)
    // }

    // console.log(test_customer)
    // test_customer.first = 'igor'
    // test_customer.last = 'testikov'
    // console.log(test_customer)

    // let fullname = ''

    // $: {
    //     fullname = first_name + ' ' + last_name
    //     console.log('Full Name', fullname)
    // }
    let filter_same_id = (customer_id_) =>
        $store_customers.filter((customer) => customer.id == customer_id_)[0]

    const handleEdit = (id_) => {
        let current_customer = filter_same_id(id_)
        id = current_customer.id
        first_name = current_customer.first_name
        last_name = current_customer.last_name
        email = current_customer.email
        birthdate = current_customer.birthdate

        console.log(`Handle Edit ID: ${id_}`)
    }

    const editCustomer = () => {
        axios
            .put(`/updateCustomer/${id}`, {
                first_name: first_name,
                last_name: last_name,
                email: email,
                birthdate: birthdate,
            })
            .then((res) => {
                let current_customer = filter_same_id(id)
                current_customer.first_name = first_name
                current_customer.last_name = last_name
                current_customer.email = email
                current_customer.birthdate = `${birthdate.getFullYear()}-${padToTwo(
                    birthdate.getMonth() + 1
                )}-${padToTwo(birthdate.getDate())}`

                // console.log(`${birthdate.getFullYear()}`)
                // console.log(`${padToTwo(birthdate.getMonth() + 1)}`)
                // console.log(`${padToTwo(birthdate.getDate())}`)

                store_customers.set($store_customers)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const handleDelete = (id_) => {
        let current_customer = filter_same_id(id_)
        id = current_customer.id
        first_name = current_customer.first_name
        last_name = current_customer.last_name
        email = current_customer.email
        birthdate = current_customer.birthdate
    }
    const deleteCustomer = () => {
        let newlist = $store_customers.filter((customer) => customer.id != id)
        console.log(newlist)

        axios
            .delete(`/deleteCustomer/${id}`)
            .then((res) => {
                console.log(res)
                console.log(res.data)

                store_customers.set(newlist)
            })
            .catch((err) => {
                console.error(err)
            })
    }
</script>

<AddCustomer />

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
                bind:value={first_name}
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
                bind:value={last_name}
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
                bind:value={email}
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
                            birthdate = v.value[0]
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
                bind:value={first_name}
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
                bind:value={last_name}
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
                bind:value={email}
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
