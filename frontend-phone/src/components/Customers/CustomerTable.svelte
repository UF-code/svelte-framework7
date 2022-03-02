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
    } from 'framework7-svelte'
    // FETCHING DATA FROM CUSTOM API
    import axios from '../../js/axios.js'
    // STORING REACTIVE DATA IN STORE CUSTOMERS
    import { store_customers } from '../../js/customer_store.js'
    // CUSTOM COMPONENTS
    import EditModal from './EditModal.svelte'
    import DeleteModal from './DeleteModal.svelte'

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
    const editCustomer = async () => {
        try {
            await axios.put(`/updateCustomer/${customer.id}`, customer)
            let current_customer = find_customer(customer.id)
            current_customer.first_name = customer.first_name
            current_customer.last_name = customer.last_name
            current_customer.email = customer.email
            current_customer.birthdate = customer.birthdate

            store_customers.set($store_customers)
        } catch (error) {
            console.error(error)
        }
    }

    // DELETING CUSTOMER
    const deleteCustomer = async () => {
        let customer_removed = $store_customers.filter(
            (customer_remove) => customer_remove.id != customer.id
        )

        try {
            await axios.delete(`/deleteCustomer/${customer.id}`)

            $store_customers = [...customer_removed]
        } catch (error) {
            console.error(error)
        }
    }
</script>

<List mediaList>
    {#each $store_customers as customer}
        <ListItem title={`Customer ID: ${customer.id}  `}>
            <p>Full Name: {customer.first_name} {customer.last_name}</p>
            <p>Email: {customer.email}</p>
            <p>Birthdate: {customer.birthdate}</p>
            <Row>
                <Fab position="right-top" color="blue" style="top:-33px">
                    <Icon
                        ios="f7:ellipsis"
                        aurora="f7:ellipsis"
                        md="material:ellipsis"
                    />
                    <Icon
                        ios="f7:ellipsis_vertical"
                        aurora="f7:ellipsis_vertical"
                        md="material:ellipsis_vertical"
                    />
                    <FabButtons position="bottom">
                        <Button
                            text="Edit"
                            popupOpen=".popup-swipe"
                            on:click={handleData(customer.id)}
                            class="fab-close"
                        />
                        <Button
                            style="width:60px; margin-left:-10px;"
                            text="Delete"
                            popupOpen=".delete-popup-swipe"
                            on:click={handleData(customer.id)}
                            class="fab-close"
                        />
                    </FabButtons>
                </Fab>
            </Row>
        </ListItem>
    {/each}
</List>

<EditModal
    {customer}
    on:edit_customer={(e) => {
        console.log(e.detail)
        editCustomer()
    }}
/>

<DeleteModal
    {customer}
    on:delete1={(e) => {
        console.log(e.detail)
        deleteCustomer()
    }}
/>
