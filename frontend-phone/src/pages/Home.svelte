<script>
    // FRAMEWORK7 COMPONENTS
    import { Page, Navbar, NavRight, Link } from 'framework7-svelte'
    // FRAMEWORK7 ICONS
    import 'framework7-icons'

    // CUSTOM COMPONENTS
    import CustomerTable from '../components/CustomerTable.svelte'
</script>

<Page name="home">
    <Navbar title="uf-code">
        <NavRight>
            <Link icon="icon-bars" href="/about">
                <i class="f7-icons" color="">line_horizontal_3</i>
            </Link>
        </NavRight>
    </Navbar>
    <CustomerTable />
</Page>
