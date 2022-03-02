<script>
    import { Block, Button } from 'framework7-svelte'

    // FETCHING DATA FROM CUSTOM API
    import axios from '../../js/axios.js'
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

    const addCustomer = () => {
        axios
            .post('/addCustomer', customer)
            .then((res) => {
                store_customers.update((currentCustomers) => {
                    return [...currentCustomers, res.data]
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }
</script>

<Block strong>
    <Button fill round popupOpen=".add-popup-swipe">Add Customer</Button>
</Block>

<AddModal
    {customer}
    on:add_customer={() => {
        addCustomer()
    }}
/>
