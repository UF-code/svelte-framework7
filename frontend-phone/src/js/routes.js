import HomePage from '../pages/Home.svelte'
import AboutPage from '../pages/About.svelte'

var routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/about',
        component: AboutPage,
    },
]

export default routes
