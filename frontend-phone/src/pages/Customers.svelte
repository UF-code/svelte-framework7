<script>
    // FRAMEWORK7 COMPONENTS
    import { Page, Navbar } from 'framework7-svelte'
    // LIFECYCLE METHOD
    import { onMount } from 'svelte'
    // CUSTOM COMPONENTS
    import AddCustomer from '../components/Customers/AddCustomer.svelte'
    import CustomersTable from '../components/Customers/CustomerTable.svelte'
    // AXIOS
    import axios from '../js/axios.js'
    // STORE CUSTOMERS
    import { store_customers } from '../js/customer_store.js'

    onMount(async () => {
        try {
            const response = await axios.get('/getAllCustomers')

            store_customers.set(response.data)
        } catch (error) {
            console.error(error)
        }
    })
</script>

<Page name="customers">
    <!-- CUSTOMERS NAVBAR -->
    <Navbar title="Customers" backLink="Back" />

    <!-- ADD CUSTOMER BUTTON -->
    <AddCustomer />

    <!-- CUSTOMER TABLE -->
    <CustomersTable />
</Page>
