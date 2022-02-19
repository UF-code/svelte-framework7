<script>
	import { Navbar, NavbarBrand, Nav, NavItem } from 'sveltestrap';
	import Hamburger from './Hamburger.svelte';
</script>

<Navbar color="dark" dark expand="md" class="px-4 py-3">
	<NavbarBrand href="/">uf-code</NavbarBrand>

	<Nav class="ms-auto" navbar>
		<NavItem>
			<Hamburger />
		</NavItem>
	</Nav>
</Navbar>
