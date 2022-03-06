import {writable} from 'svelte/store'

export const current_customer = writable({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    birthdate: '',
})