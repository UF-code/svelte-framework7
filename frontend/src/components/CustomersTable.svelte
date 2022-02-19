<script>
    import {
        Table,
        ButtonDropdown,
        DropdownItem,
        DropdownMenu,
        DropdownToggle,
        Icon,
        Form,
        Input,
        Label,
        Button,
        Modal,
        ModalBody,
        ModalHeader,
        ModalFooter,
        FormGroup,
        Toast,
        ToastBody,
        ToastHeader,
    } from 'sveltestrap'
    import axios from '../axios.js'
    import { store_customers } from '../stores.js'

    let id_, first_name, last_name, birthdate_, email_
    let isOpen = false
    let handleEditSuccess = false
    let handleEditFail = false
    let handleDeleteSuccess = false
    let handleDeleteFail = false

    let filter_same_id = (selected_id) =>
        $store_customers.filter((customer) => customer.id == selected_id)[0]

    let openEditCustomer = false
    const handleEdit = (id) => {
        console.log(`HANDLE EDIT ${id}`)
        let current_customer = filter_same_id(id)
        id_ = id
        first_name = current_customer.first_name
        last_name = current_customer.last_name
        birthdate_ = current_customer.birthdate
        email_ = current_customer.email

        openEditCustomer = !openEditCustomer
    }

    // try {
    //     const getCustomers = async () => {
    //         const res = await axios.get(
    //             `http://localhost:5001/api/customers/getAllCustomers`
    //         )
    //         data = res.data
    //         store_customers.set(data)
    //     }
    // } catch (error) {
    //     console.log(error)
    // }

    // const customer_match = ({match}) => {
    //     const customer = customers.find((cust) => cust._id === match.params.id)
    // }

    const handleModalEdit = () => {
        axios
            .put(`/updateCustomer/${id_}`, {
                first_name: first_name,
                last_name: last_name,
                email: email_,
                birthdate: birthdate_,
            })
            .then((res) => {
                let current_customer = filter_same_id(id_)
                current_customer.first_name = first_name
                current_customer.last_name = last_name
                current_customer.email = email_
                current_customer.birthdate = birthdate_

                store_customers.set($store_customers)

                handleEditFail = false
                handleDeleteFail = false
                handleDeleteSuccess = false
                handleEditSuccess = true
                isOpen = true
            })
            .catch((err) => {
                handleDeleteFail = false
                handleDeleteSuccess = false
                handleEditSuccess = false
                handleEditFail = true
                isOpen = true
                console.error(err)
            })

        openEditCustomer = !openEditCustomer
    }
    const handleModalEditCancel = () => {
        openEditCustomer = !openEditCustomer
    }

    let openDeleteCustomer = false
    const handleDelete = (id) => {
        openDeleteCustomer = !openDeleteCustomer
        console.log(`HANDLE DELETE ${id}`)
        let current_customer = filter_same_id(id)
        id_ = id
        first_name = current_customer.first_name
        last_name = current_customer.last_name
        birthdate_ = current_customer.birthdate
        email_ = current_customer.email
    }
    const handleModalDelete = () => {
        let newlist = $store_customers.filter((customer) => customer.id != id_)
        console.log(newlist)

        axios
            .delete(`/deleteCustomer/${id_}`)
            .then((res) => {
                console.log(res)
                console.log(res.data)

                store_customers.set(newlist)

                handleEditSuccess = false
                handleEditFail = false
                handleDeleteFail = false
                handleDeleteSuccess = true
                isOpen = true
            })
            .catch((err) => {
                console.error(err)
                handleEditSuccess = false
                handleEditFail = false
                handleDeleteSuccess = false
                handleDeleteFail = true
                isOpen = true
            })
        openDeleteCustomer = !openDeleteCustomer
    }
    const handleModalDeleteCancel = () => {
        openDeleteCustomer = !openDeleteCustomer
    }
</script>

<div>
    <Table>
        <thead class="pt-2">
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Birthdate</th>
            </tr>
        </thead>
        <tbody>
            {#each $store_customers as customer}
                <tr>
                    <th scope="row">{customer.id}</th>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.birthdate}</td>
                    <td>
                        <ButtonDropdown>
                            <DropdownToggle
                                outline
                                color="primary"
                                style="border-radius: 20px; border-style: none; opacity: 0.8;"
                            >
                                <Icon name="three-dots" />
                            </DropdownToggle>

                            <DropdownMenu
                                style="border-radius: 20px; min-width: 0.7rem;"
                            >
                                <DropdownItem on:click={handleEdit(customer.id)}
                                    >Edit
                                </DropdownItem>

                                <DropdownItem
                                    on:click={handleDelete(customer.id)}
                                    >Delete</DropdownItem
                                >
                            </DropdownMenu>
                        </ButtonDropdown>
                    </td>
                </tr>
            {/each}
        </tbody>
    </Table>
</div>

<Modal isOpen={openEditCustomer}>
    <ModalHeader>Edit Customer</ModalHeader>
    <ModalBody>
        <FormGroup>
            <Label for="exampleSelect">ID</Label>
            <Input
                disabled
                type="select"
                name="select"
                id="exampleSelect"
                bind:value={id_}
            >
                <option value={id_}>{id_}</option>
            </Input>
        </FormGroup>
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
        <Button color="primary" on:click={handleModalEdit}>Edit</Button>
        <Button color="secondary" on:click={handleModalEditCancel}
            >Cancel</Button
        >
    </ModalFooter>
</Modal>

<!-- TOAST EDIT -->
{#if handleEditSuccess}
    <Toast
        style="position: absolute; top: 4.4rem; right: 0; color: white;"
        class="bg-success"
        autohide
        body
        {isOpen}
        on:close={() => (isOpen = false)}
    >
        SUCCESSFULLY EDITED...
    </Toast>
{/if}
{#if handleEditFail}
    <Toast
        style="position: absolute; top: 4.4rem; right: 0; color: white;"
        class="bg-danger"
        autohide
        body
        {isOpen}
        on:close={() => (isOpen = false)}
    >
        ERROR OCCURED ON EDIT PROCESS...
    </Toast>
{/if}

<Modal isOpen={openDeleteCustomer}>
    <ModalHeader>Delete Customer</ModalHeader>
    <ModalBody>
        <Form>
            <FormGroup>
                <Label for="exampleSelect">ID</Label>
                <Input
                    disabled
                    type="select"
                    name="select"
                    id="exampleSelect"
                    bind:value={id_}
                >
                    <option value={id_}>{id_}</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="forFirst">First Name</Label>
                <Input
                    type="text"
                    name="firstName"
                    id="forFirst"
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
                    placeholder="date placeholder"
                    bind:value={birthdate_}
                />
            </FormGroup>
        </Form>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" on:click={handleModalDelete}>Delete</Button>
        <Button color="secondary" on:click={handleModalDeleteCancel}
            >Cancel</Button
        >
    </ModalFooter>
</Modal>

<!-- TOAST DELETE -->
{#if handleDeleteSuccess}
    <Toast
        style="position: absolute; top: 4.4rem; right: 0; color: white;"
        class="bg-success"
        autohide
        body
        {isOpen}
        on:close={() => (isOpen = false)}
    >
        SUCCESSFULLY DELETED...
    </Toast>
{/if}
{#if handleDeleteFail}
    <Toast
        style="position: absolute; top: 4.4rem; right: 0; color: white;"
        class="bg-danger"
        autohide
        body
        {isOpen}
        on:close={() => (isOpen = false)}
    >
        ERROR OCCURED ON DELETE PROCESS...
    </Toast>
{/if}
