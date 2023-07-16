import {PageProps} from "@/types";
import BaseAuthenticatedLayout from "@/Layouts/BaseAuthenticatedLayout";
import styled from "styled-components";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useEffect, useState} from "react";
import {usePage, router} from "@inertiajs/react";

type formErrorsType = {
    nome: string[],
    email: string[],
    password: string[],
    passwordConfirmation: string[],
}

type CreateProps = {
    auth: PageProps['auth'],
    user: {
        id: number,
        name: string,
        email: string,
        created_at: string,
        updated_at: string,
    },
}
export default function Create({auth, user}: CreateProps) {
    const { errors } = usePage().props
    const [values, setValues] = useState({
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
    })

    useEffect(() => {
        setValues(values => ({...values, name: user?.name, email: user?.email}))
    }, [])

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(!user) {
            router.post(route('users.store'), values)
            return
        }

        const valuesUpdate = {};
        Object.keys(values).forEach(key => {
            if(values[key]) {
                valuesUpdate[key] = values[key];
            }
        });
        router.patch(route('users.update', user.id), valuesUpdate)
    }

    return (
        <BaseAuthenticatedLayout user={auth.user}>
            <h1 className="bg-gray-800 text-white p-2 text-center ">Adicionar novo usuário</h1>
            <FormContainer onSubmit={handleSubmit}>
                <FormGroup>
                    <InputLabel htmlFor="name">Nome</InputLabel>
                    <TextInput onChange={handleChange} value={values.name || ''} type="text" name="name" id="name"/>
                    <FormErrorSpan>{errors.name &&
                        <InputError message={errors.name}/>}</FormErrorSpan>
                </FormGroup>
                <FormGroup>
                    <InputLabel htmlFor="email">E-mail</InputLabel>
                    <TextInput value={values.email || ''} type="text" name="email" id="email" onChange={handleChange}/>
                    <FormErrorSpan>{errors.email &&
                        <InputError message={errors.email}/>}</FormErrorSpan>
                </FormGroup>
                <FormGroup>
                    <InputLabel htmlFor="password">Senha</InputLabel>
                    <TextInput onChange={handleChange} type="password" name="password" id="password"/>
                    <FormErrorSpan>{errors.password &&
                        <InputError message={errors.password}/>}</FormErrorSpan>
                </FormGroup>
                <FormGroup>
                    <InputLabel htmlFor="password_confirmation">Confirmar senha</InputLabel>
                    <TextInput onChange={handleChange} type="password" name="password_confirmation"
                               id="passwordConfirmation"/>
                    <FormErrorSpan>{errors.passwordConfirmation &&
                        <InputError message={errors.passwordConfirmation}/>}</FormErrorSpan>
                </FormGroup>
                <FormButton>
                    {user ? 'Editar' : 'Adicionar'}
                </FormButton>
            </FormContainer>
        </BaseAuthenticatedLayout>
    )
}

const FormContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 40px;
`

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    width: 500px;
`

const FormButton = styled.button`
    padding: 10px 25px;
    border-radius: 5px;
    margin: 10px 0;
    background-color: #2d3748;
    color: #fff;
    font-weight: bold;
    font-size: 1em;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #4a5568;

    }
`

const FormErrorSpan = styled.span`
    color: #e53e3e;
    font-size: 0.8em;
    margin: 5px 0;
    font-weight: bold;
    min-height: 15px;

    & p {
        margin: 0;
        padding: 0;
    }
`
