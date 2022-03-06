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
    // SVELTE STORE
    // STORING REACTIVE DATA IN STORE CUSTOMERS
    import { store_customers } from '../../js/customer_store.js'
    // STORING CURRENT CUSTOMER AS REACTIVE DATA
    import { current_customer } from '../../js/current_customer_store.js'
    // CUSTOM COMPONENTS
    import EditModal from './EditModal.svelte'
    import DeleteModal from './DeleteModal.svelte'
    // import NewDeleteModal from './NewDeleteModal.svelte'

    // USEFUL METHODS //
    // let padToTwo = (number) => (number <= 99 ? `0${number}`.slice(-2) : number)

    let find_customer = (customer_id) =>
        $store_customers.find((customer) => customer.id === customer_id)
    // USEFUL METHODS //

    // SETTING POPUP VARIABLES
    const handleData = (id_) => {
        let customer_found = find_customer(id_)
        $current_customer = customer_found
    }

    // EDITING CUSTOMER
    const editCustomer = async (customer) => {
        try {
            await axios.put(`/updateCustomer/${customer.id}`, customer)
            let customer_found = find_customer(customer.id)

            $current_customer = customer_found

            store_customers.set($store_customers)
        } catch (error) {
            console.error(error)
        }
    }

    // DELETING CUSTOMER
    const deleteCustomer = async (id_) => {
        let customer_removed = $store_customers.filter(
            (customer_remove) => customer_remove.id != id_
        )

        try {
            await axios.delete(`/deleteCustomer/${id_}`)

            $store_customers = [...customer_removed]
        } catch (error) {
            console.error(error)
        }
    }
</script>

<List mediaList>
    {#each $store_customers as customer}
        <ListItem title={`Customer ID: ${customer.id}  `}>
            <p>
                Full Name: {customer.first_name}
                {customer.last_name}
            </p>

            <p>Email: {customer.email}</p>
            <p>Birthdate: {customer.birthdate}</p>

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
                        sheetOpen=".edit-customer"
                        on:click={handleData(customer.id)}
                        class="fab-close"
                    />
                    <Button
                        style="width:60px; margin-left:-10px;"
                        text="Delete"
                        sheetOpen=".delete-customer"
                        on:click={handleData(customer.id)}
                        class="fab-close"
                    />
                </FabButtons>
            </Fab>
        </ListItem>
    {/each}
</List>

<EditModal
    modalState={'editModal'}
    {current_customer}
    on:edit_customer={(e) => {
        editCustomer(e.detail)
    }}
/>

<DeleteModal
    {current_customer}
    on:delete_customer={(e) => {
        deleteCustomer(e.detail.id)
    }}
/>
