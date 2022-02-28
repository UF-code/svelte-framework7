<script>
    import {
        Popup,
        Page,
        Navbar,
        NavRight,
        Link,
        List,
        ListInput,
        Button,
    } from 'framework7-svelte'

    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let customer
</script>

<!-- EDIT CUSTOMER -->
<Popup class="popup-swipe" swipeToClose>
    <Page>
        <Navbar title="Edit Customer">
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
                bind:value={customer.first_name}
            />

            <ListInput
                label="Last Name"
                floatingLabel
                type="text"
                placeholder="Last Name"
                clearButton
                bind:value={customer.last_name}
            />

            <ListInput
                label="E-mail"
                floatingLabel
                type="email"
                validate
                placeholder="Your e-mail"
                clearButton
                bind:value={customer.email}
            />

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
                    on: {
                        calendarChange: (v) => {
                            console.log(v)
                            customer.birthdate = v.value[0]
                            console.log(v.value)
                        },
                    },
                    monthNames: [
                        'Ocak',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ],
                }}
            />

            <Button
                fill
                round
                small
                popupClose=".popup-swipe"
                on:click={() => dispatch('edit1', customer)}
                >Edit Customer</Button
            >
            <!-- <Button
                fill
                round
                small
                popupClose=".popup-swipe"
                on:click1={(e) => {
                    console.log('hey' + e.detail)
                }}>Edit Customer</Button
            > -->
        </List>

        <div
            style="height: 100%"
            class="display-flex justify-content-center align-items-center"
        />
    </Page>
</Popup>
