import {NavContainer, NavItem} from "@/Components/Sidenav/SidenavStyledComponents";
import {Link} from "@inertiajs/react";

export default function Sidenav() {
    return (
        <NavContainer>
            <ul>
                <NavItem>Início</NavItem>
                <NavItem><Link href={route('users.index')}>Usuários</Link></NavItem>
                <NavItem>Financeiro</NavItem>
                <NavItem>Configurações</NavItem>
            </ul>
        </NavContainer>
    )
}
