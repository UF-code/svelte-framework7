<script>
    // FRAMEWORK7 COMPONENTS
    import { Page, Navbar, NavRight } from 'framework7-svelte'
    // LIFECYCLE METHOD
    import { onMount } from 'svelte'
    // CUSTOM COMPONENTS
    import AddCustomer from '../components/AddCustomer.svelte'
    import CustomersTable from '../components/CustomerTable.svelte'
    // AXIOS
    import axios from '../js/axios.js'

    // STORE CUSTOMERS
    import { store_customers } from '../js/customer_store.js'

    onMount(() => {
        axios
            .get(`/getAllCustomers`)
            .then((res) => {
                console.log(res.data)
                store_customers.set(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
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
