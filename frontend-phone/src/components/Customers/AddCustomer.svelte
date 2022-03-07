<script>
    import { Block, Button } from 'framework7-svelte'

    // FETCHING DATA FROM CUSTOM API
    import axios from '../../js/axios.js'
    // SVELTE STORE
    // STORING REACTIVE DATA IN STORE CUSTOMERS
    import { store_customers } from '../../js/customer_store.js'
    // CUSTOM COMPONENT
    import AddModal from './AddModal.svelte'

    let customer = {
        first_name: '',
        last_name: '',
        email: '',
        birthdate: '',
    }


    const addCustomer = async () => {
        try {
            const response = await axios.post('/addCustomer', customer)

            store_customers.update((currentCustomers) => {
                return [...currentCustomers, response.data]
            })
        } catch (error) {
            console.error(error)
        }
    }
</script>

<Block strong>
    <Button fill round sheetOpen=".add-customer"
        >Add Customer</Button
    >
</Block>

<AddModal
    {customer}
    on:add_customer={() => {
        addCustomer()
    }}
/>
