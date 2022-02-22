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
        Col,
        Button,
    } from 'framework7-svelte'
    import AddCustomer from './AddCustomer.svelte'
    import { onMount } from 'svelte'
    import axios from '../js/axios.js'

    let customers = []

    onMount(() => {
        axios
            .get(`/getAllCustomers`)
            .then((res) => {
                load('wave')
                customers = [...res.data]
                console.log(res.data)
                console.log(customers)
                console.log(...customers)
            })
            .catch((err) => {
                console.error(err)
            })
    })

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

<AddCustomer />

{#if loading}
    <List mediaList v-if="loading">
        {#each customers as index, custommer (custommer)}
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
        <!-- <ListItem
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
        </ListItem> -->
        {#each customers as customer}
            <ListItem title={`Customer ID: ${customer.id}  `}>
                <p>Full Name: {customer.first_name} {customer.last_name}</p>
                <p>Email: {customer.email}</p>
                <p>Birthdate: {customer.birthdate}</p>
                <Row>
                    <Col>
                        <Button fill round>Edit</Button>
                    </Col>
                    <Col>
                        <Button fill round>Delete</Button>
                    </Col>
                </Row>
            </ListItem>
        {/each}
    </List>
{/if}
