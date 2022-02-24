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
    import { beforeUpdate } from 'svelte'
    import axios from '../js/axios.js'
    import { onMount } from 'svelte'
    import { store_customers } from '../js/customer_store.js'
    export let customer_id
    let flag = false
    let first_name, last_name, email, birthdate
    let test_id = 0

    // beforeUpdate(() => {
    //     console.log(customer_id)
    //     console.log(customer_id)
    //     console.log(customer_id)
    //     console.log(customer_id)
    //     console.log(customer_id)
    // })

    // // onMount(() => {
    //     const hey = filter_same_id(customer_id)
    //     console.log(hey)
    //     // console.log('object')
    //     // console.log(customer_id)

    //     // console.log($store_customers)
    //     // console.log('object')
    //     // let current_customer = filter_same_id(customer_id)

    //     // console.log(current_customer)

    //     // first_name = current_customer.first_name
    //     // last_name = current_customer.last_name
    //     // email = current_customer.email
    //     // birthdate = current_customer.birthdate

    //     // console.log(first_name, last_name, email, birthdate)
    // })

    // let find_customer = (customer_id_) => {
    //     $store_customers.find((customer) => customer.id === customer_id_)
    // }

    let filter_same_id = (customer_id_) =>
        $store_customers.filter((customer) => customer.id == customer_id_)[0]

    const openEdit = () => {
        console.log(customer_id)
        console.log(customer_id)
        // test_id = id_
    }

    const handleEdit = (t_id) => {
        console.log(t_id)
        // axios
        //     .put(`/updateCustomer/${customer_id}`, {
        //         first_name: first_name,
        //         last_name: last_name,
        //         email: email,
        //         birthdate: birthdate,
        //     })
        //     .then((res) => {
        //         store_customers.set($store_customers)
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //     })
    }
</script>

<Button fill round on:click={openEdit} popupOpen=".demo-popup-swipe"
    >Edit</Button
>

<Popup class="demo-popup-swipe" swipeToClose>
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
                on:click={handleEdit(test_id)}>Edit Customer</Button
            >
        </List>

        <div
            style="height: 100%"
            class="display-flex justify-content-center align-items-center"
        />
    </Page>
</Popup>
