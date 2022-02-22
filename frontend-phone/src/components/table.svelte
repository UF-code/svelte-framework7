<script>
    import {
        Navbar,
        BlockTitle,
        List,
        ListItem,
        SkeletonBlock,
        Card,
        Block,
        Row,
        Button,
    } from 'framework7-svelte'

    let loading = false
    let effect = null

    function load(newEffect) {
        if (loading) return

        effect = newEffect
        loading = true
        setTimeout(() => {
            loading = false
        }, 3000)
    }
</script>

<BlockTitle>Loading Effects</BlockTitle>
<Block strong>
    <Row tag="p">
        <Button fill small round class="col" onClick={() => load('fade')}
            >Fade</Button
        >
        <Button fill small round class="col" onClick={() => load('wave')}
            >Wave</Button
        >
        <Button fill small round class="col" onClick={() => load('pulse')}
            >Pulse</Button
        >
    </Row>
</Block>

{#if loading}
    <List mediaList v-if="loading">
        {#each [1, 2, 3] as n, index (index)}
            <ListItem
                class={`skeleton-text skeleton-effect-${effect}`}
                title="Full Name"
                subtitle="Position"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
            >
                <span slot="media">
                    <SkeletonBlock
                        style="width: 40px; height: 40px; border-radius: 50%"
                    />
                </span>
            </ListItem>
        {/each}
    </List>
{:else}
    <List mediaList>
        <ListItem
            title="John Doe"
            subtitle="CEO"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
        >
            <img
                src="https://placeimg.com/80/80/people/1"
                style="width: 40px; height: 40px; border-radius: 50%"
                slot="media"
                alt="test1"
            />
        </ListItem>
        <ListItem
            title="Jane Doe"
            subtitle="Marketing"
            text="Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
        >
            <img
                src="https://placeimg.com/80/80/people/2"
                style="width: 40px; height: 40px; border-radius: 50%"
                slot="media"
                alt="test2"
            />
        </ListItem>
        <ListItem
            title="Kate Johnson"
            subtitle="Admin"
            text="Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
        >
            <img
                src="https://placeimg.com/80/80/people/3"
                style="width: 40px; height: 40px; border-radius: 50%"
                slot="media"
                alt="test3"
            />
        </ListItem>
        {#each [1, 2, 3] as hey}
            <ListItem
                title={`Test Title ${hey}`}
                subtitle={`Test ${hey}`}
                text="heyhey"
            >
                <p>{hey}</p>
            </ListItem>
        {/each}
    </List>
{/if}
