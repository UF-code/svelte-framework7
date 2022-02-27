import HomePage from '../pages/Home.svelte'
import CustomersPage from '../pages/Customers.svelte'
import AboutPage from '../pages/About.svelte'

var routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/customers',
        component: CustomersPage,
    },
    {
        path: '/about',
        component: AboutPage,
    },
]

export default routes
