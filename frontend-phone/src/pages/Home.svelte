<script>
    // FRAMEWORK7 COMPONENTS
    import {
        Page,
        Navbar,
        NavRight,
        Link,
        ListItem,
        AccordionContent,
        List,
        NavLeft,
        Panel,
        View,
        Block,
    } from 'framework7-svelte'
    // FRAMEWORK7 ICONS
    import 'framework7-icons'
</script>

<Page name="home">
    <Navbar>
        <NavLeft><b>uf-code</b></NavLeft>

        <NavRight>
            <Link icon="icon-bars" href="/customers">Customers</Link>
            <Link icon="icon-bars" href="/about">About</Link>
        </NavRight>
    </Navbar>
</Page>
