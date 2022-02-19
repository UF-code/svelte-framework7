<script>
    import axios from '../axios.js'
    import {
        Button,
        Col,
        Modal,
        ModalBody,
        ModalHeader,
        ModalFooter,
        Form,
        FormGroup,
        Label,
        Input,
        Toast,
    } from 'sveltestrap'

    import { store_customers } from '../stores.js'

    let first_name, last_name, email_, birthdate_
    let openNewCustomer = false
    let isOpen = false
    let cust
    let handleNewCustomerSuccess = false
    let handleNewCustomerFail = false

    const toggleNewCustomer = () => (openNewCustomer = !openNewCustomer)
    const handleSubmit = () => {
        axios
            .post('/addCustomer', {
                first_name: first_name,
                last_name: last_name,
                email: email_,
                birthdate: birthdate_,
            })
            .then((res) => {
                cust = res.data

                store_customers.update((currentCustomers) => {
                    return [
                        ...currentCustomers,
                        {
                            id: cust.id,
                            first_name: cust.first_name,
                            last_name: cust.last_name,
                            email: cust.email,
                            birthdate: cust.birthdate,
                        },
                    ]
                })

                isOpen = true
                handleNewCustomerSuccess = true
            })
            .catch((err) => {
                isOpen = true
                handleNewCustomerFail = true
                console.error(err)
            })

        handleNewCustomerSuccess = false
        handleNewCustomerFail = false
        openNewCustomer = !openNewCustomer
        first_name = ''
        last_name = ''
        email_ = ''
        birthdate_ = ''
    }
</script>

<Col>
    <Button block color="success" on:click={toggleNewCustomer}
        >New Customer</Button
    >
    <Modal isOpen={openNewCustomer} {toggleNewCustomer}>
        <ModalHeader {toggleNewCustomer}>Add New Customer</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="forFirst">First Name</Label>
                    <Input
                        type="text"
                        name="firstName"
                        id="forFirst"
                        placeholder="First Name"
                        bind:value={first_name}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="forLast">Last Name</Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="forLast"
                        placeholder="Last Name"
                        bind:value={last_name}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="forEmail">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="forEmail"
                        placeholder="with a placeholder"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{(2, 4)}$"
                        bind:value={email_}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="forDate">Date</Label>
                    <Input
                        type="date"
                        name="date"
                        id="forDate"
                        placeholder="date placeholder"
                        bind:value={birthdate_}
                    />
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" on:click={handleSubmit}>Save</Button>
            <Button color="secondary" on:click={toggleNewCustomer}
                >Cancel</Button
            >
        </ModalFooter>
    </Modal>
</Col>

<!-- TOAST NEW CUSTOMER -->
{#if handleNewCustomerSuccess}
    <Toast
        style="position: absolute; top: 4.4rem; right: 0; color: white;"
        class="bg-success"
        autohide
        body
        {isOpen}
        on:close={() => (isOpen = false)}
    >
        SUCCESSFULLY ADDED...
    </Toast>
{/if}
{#if handleNewCustomerFail}
    <Toast
        style="position: absolute; top: 4.4rem; right: 0; color: white;"
        class="bg-danger"
        autohide
        body
        {isOpen}
        on:close={() => (isOpen = false)}
    >
        ERROR OCCURED ON ADDING PROCESS...
    </Toast>
{/if}
