<script>
    import {
        Block,
        Button,
        Popup,
        Page,
        Row,
        Navbar,
        NavRight,
        Link,
        List,
        ListInput,
    } from 'framework7-svelte'

    import { store_customers } from '../js/customer_store'

    let first_name, last_name, email, birthdate
</script>

<!-- <BlockTitle>Loading Effects</BlockTitle> -->
<Block strong>
    <!-- <Row tag="p">
        <Button fill small round class="col" onClick={() => load('fade')}
            >Fade</Button
        >
        <Button fill small round class="col" onClick={() => load('wave')}
            >Wave</Button
        >
        <Button fill small round class="col" onClick={() => load('pulse')}
            >Pulse</Button
        >
    </Row> -->
    <!-- <Button
        fill
        round
        onClick={() => {
            console.log('hey')
        }}>Add Customer</Button
    > -->

    <Button fill round popupOpen=".demo-popup-swipe">Add Customer</Button>
</Block>

<Popup class="demo-popup-swipe" swipeToClose>
    <Page>
        <Navbar title="Add New Customer">
            <NavRight>
                <Link popupClose>Close</Link>
            </NavRight>
        </Navbar>

        <List noHairlinesMd>
            <ListInput
                label="First Name"
                floatingLabel
                type="text"
                placeholder="First Name"
                clearButton
                onInput={(e) => (first_name = e.target.value)}
                onChange={() => {
                    console.log(first_name)
                }}
            >
                <!-- <i class="icon demo-list-icon" slot="media" /> -->
            </ListInput>

            <ListInput
                label="Last Name"
                floatingLabel
                type="text"
                placeholder="Last Name"
                clearButton
                onInput={(e) => (last_name = e.target.value)}
                onChange={() => {
                    console.log(last_name)
                }}
            >
                <!-- <i class="icon demo-list-icon" slot="media" /> -->
            </ListInput>

            <ListInput
                label="E-mail"
                floatingLabel
                type="email"
                validate
                placeholder="Your e-mail"
                clearButton
                onInput={(e) => (email = e.target.value)}
                onChange={() => {
                    console.log(email)
                }}
            >
                <!-- <i class="icon demo-list-icon" slot="media" /> -->
            </ListInput>

            <ListInput
                label="Birthdate"
                type="datepicker"
                placeholder="Select date"
                readonly
                calendarParams={{
                    openIn: 'customModal',
                    header: true,
                    footer: true,
                    dateFormat: 'MM dd yyyy',
                }}
                onCalendarChange={(e) => {
                    birthdate = e.target.value
                }}
            />
            <Button
                fill
                round
                small
                on:click={() => {
                    console.log(first_name)
                    console.log(last_name)
                    console.log(email)
                }}>Add Customer</Button
            >
        </List>

        <!-- onInput={(e) => (birthdate = e.target.value)}
                -->

        <div
            style="height: 100%"
            class="display-flex justify-content-center align-items-center"
        />
    </Page>
</Popup>
