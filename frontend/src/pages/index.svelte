<script>
    import { metatags } from '@roxi/routify'

    metatags.title = 'Customers'
    metatags.description = 'Description coming soon...'

    import axios from '../axios.js'
    import { onMount } from 'svelte'
    import { Container, Row } from 'sveltestrap'
    import NewCustomer from '../components/NewCustomer.svelte'
    // import EditCustomer from '../components/EditCustomer.svelte'
    // import DeleteCustomer from '../components/DeleteCustomer.svelte'
    import CustomersTable from '../components/CustomersTable.svelte'
    import { store_customers } from '../stores.js'

    let flag = false
    onMount(() => {
        axios
            .get(`/getAllCustomers`)
            .then((res) => {
                console.log(res)
                store_customers.set(res.data)
            })
            .then(() => {
                flag = true
            })
            .catch((err) => {
                console.error(err)
            })
    })
</script>

{#if flag}
    <Container>
        <h1 class="text-center p-5">Welcome to Customers Section</h1>

        <Row class="pb-4">
            <NewCustomer />
        </Row>
        <Row>
            <CustomersTable />
        </Row>
    </Container>
{/if}
