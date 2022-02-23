<script>
    import {
        Page,
        Panel,
        View,
        Segmented,
        Button,
        List,
        ListItem,
        Navbar,
        NavRight,
        NavTitle,
        NavTitleLarge,
        Link,
        Toolbar,
        Block,
        Icon,
        BlockTitle,
    } from 'framework7-svelte'
    import 'framework7-icons'

    import Test from '../components/Table.svelte'
    import { onMount } from 'svelte'
    import axios from '../js/axios.js'
    import { store_customers } from '../js/customer_store'

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
</script>

<Page name="home">
    <Navbar title="uf-code">
        <NavRight>
            <Link icon="icon-bars" href="/about">
                <i class="f7-icons" color="">line_horizontal_3</i>
            </Link>
        </NavRight>
    </Navbar>

    <Test />
</Page>
