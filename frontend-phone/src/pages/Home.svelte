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
</script>

<Page name="home">
    <Navbar title="uf-code">
        <NavRight>
            <Link icon="icon-bars" href="/about">
                <!-- <Icon icon="line_horizontal_3" color="blue" />  -->
                <i class="f7-icons" color="">line_horizontal_3</i>
            </Link>
        </NavRight>
    </Navbar>

    <!-- <Panel resizable right themeDark>
        <View>
            <Page>
                <Block><Link href="/about">Home Page</Link></Block>
            </Page>
        </View>
    </Panel> -->

    <!-- <Panel right cover themeDark>
        <Navbar title="Right Panel" />
        <Link href="/about">Home Page</Link>
    </Panel> -->

    <!-- <Panel resizable right themeDark> -->
    <!-- <View>
            <BlockTitle>uf-code</BlockTitle>
            <List simpleList>
                <ListItem title="Item 1" />
                <ListItem title="Item 2" />
                <ListItem title="Item 3" />
            </List>
        </View> -->
    <!-- <Block>hey1</Block>
    </Panel> -->

    <!-- <h1>Home Page</h1>

    <Link href="/about">About Page</Link> -->

    <!-- Top Navbar -->
    <!-- <Navbar large>
        <NavTitle>My App</NavTitle>
        <NavTitleLarge>My App</NavTitleLarge>
    </Navbar>
    Toolbar -->
    <!-- <Toolbar bottom>
        <Link>Left Link</Link>
        <Link>Right Link</Link>
    </Toolbar> -->
    <!-- Page content -->
    <!-- <Block strong>
        <p>Here is your blank Framework7 app. Let's see what we have here.</p>
    </Block> -->

    <!-- <Panel left cover themeDark>
        <Navbar title="Left Panel" />
        <Block>Left panel content</Block>
    </Panel>

    <Panel right reveal>
        <Navbar title="Right Panel" />
        <Block>Right panel content</Block>
    </Panel> -->

    <!-- <View main>
        <Page>
            <Navbar title="My App" />
            <Block>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris eleifend, elit vitae scelerisque vulputate, tortor
                    velit tempus dui, et luctus tellus justo nec velit. Duis
                    scelerisque in tellus et pretium. Ut faucibus fringilla
                    risus, ut dapibus nunc vehicula sit amet. Donec posuere nunc
                    non fermentum commodo.
                </p>
            </Block>
            <Block>
                <Segmented>
                    <Button panelOpen="left">Left Panel</Button>
                    <Button panelOpen="right">Right Panel</Button>
                </Segmented>
            </Block>
            <List>
                {#each [1, 2, 3] as n}
                    <ListItem title={`Item ${n}`} />
                {/each}
            </List>
        </Page>
    </View> -->
</Page>
