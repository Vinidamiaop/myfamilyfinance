import React from "react";
import BaseAuthenticatedLayout from "@/Layouts/BaseAuthenticatedLayout";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {IoAddCircleSharp} from "react-icons/io5";
import {PageProps} from "@/types";
import Table from "@/Components/Table/Table";
import styled from "styled-components";
import {Tooltip} from "react-tooltip";
import moment from "moment/moment";
import {router} from "@inertiajs/react";

type UserPageProps = {
    auth: PageProps['auth'],
    users: {
        id: number,
        name: string,
        email: string,
        created_at: string,
        updated_at: string,
    }[],
}
export default function Index({auth, users}: UserPageProps): JSX.Element {
    const headerItems = [
        {field: 'name', label: 'Nome'},
        {field: 'email', label: 'E-mail'},
        {field: 'created_at', label: 'Criado em', formatter: dateFormatter},
        {field: 'updated_at', label: 'Atualizado em', formatter: dateFormatter},
        {field: 'edit', label: '', formatter: editFormatter},
        {field: 'delete', label: '', formatter: deleteFormatter},
    ];
    return (
        <BaseAuthenticatedLayout user={auth.user}>
            <UserIndexContainer>
                <Table headerItems={headerItems} data={users}/>
                <ButtonAddUser data-tooltip-id="userTooltip" data-tooltip-content="Adicionar novo usuário">
                    <a href={route('users.create')}><IoAddCircleSharp /></a>
                </ButtonAddUser>
                <Tooltip id="userTooltip" />
            </UserIndexContainer>
        </BaseAuthenticatedLayout>
    )
}

const editFormatter = function (value: any, row: any) {
    return React.createElement("button", {
        onClick: () => router.get(route('users.show', row.id)),
        style: {
            padding: "10px 25px",
            borderRadius: "5px",
        },
        className: "bg-white hover:bg-gray-100 drop-shadow-md text-lime-600"
    }, <AiFillEdit/>);
}

const deleteFormatter = function (value: any, row: any) {
    return React.createElement("button", {
        href: route('login'),
        style: {
            padding: "10px 25px",
            borderRadius: "5px",
        },
        className: "bg-white drop-shadow-md hover:bg-gray-100 text-rose-800"
    }, <AiFillDelete/>);
}

const dateFormatter = function (value: any, row: any) {
    return moment(value).format('DD/MM/YYYY HH:mm:ss');
}

const UserIndexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const ButtonAddUser = styled.button`
    position: fixed;
    bottom: 30px;
    right: 30px;
    color: #374151;
    font-size: 2.5em;
`
