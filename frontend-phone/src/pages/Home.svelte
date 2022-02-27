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
        Toolbar,
        Fab,
        Icon,
    } from 'framework7-svelte'
    // FRAMEWORK7 ICONS
    import 'framework7-icons'
</script>

<Page name="home">
    <Navbar title="uf-code" />
    <Fab position="right-bottom" morphTo=".toolbar.fab-morph-target">
        <Icon
            ios="f7:line_horizontal_3"
            aurora="f7:line_horizontal_3"
            md="material:Menu"
        />
        <Icon ios="f7:xmark" aurora="f7:xmark" md="material:close" />
    </Fab>
    <Toolbar bottom class="fab-morph-target">
        <Link icon="icon-bars" href="/customers">Customers</Link>
        <Link icon="icon-bars" href="/about">About</Link>
    </Toolbar>
</Page>
