import {PageProps} from "@/types";
import BaseAuthenticatedLayout from "@/Layouts/BaseAuthenticatedLayout";
import styled from "styled-components";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {useEffect, useState} from "react";
import axios from "axios";
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
    }
}
export default function Create({auth, user}: CreateProps) {
    const { errors } = usePage().props
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
    }, [])
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        router.post(route('users.store'), {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        })
    }

    function handleInputName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function handleInputEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function handleInputPassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleInputPasswordConfirmation(event: React.ChangeEvent<HTMLInputElement>) {
        setPasswordConfirmation(event.target.value)
    }

    return (
        <BaseAuthenticatedLayout user={auth.user}>
            <h1 className="bg-gray-800 text-white p-2 text-center ">Adicionar novo usuário</h1>
            <FormContainer onSubmit={handleSubmit}>
                <FormGroup>
                    <InputLabel htmlFor="name">Nome</InputLabel>
                    <TextInput onChange={handleInputName} value={name} type="text" name="name" id="name"/>
                    <FormErrorSpan>{errors.name &&
                        <InputError message={errors.name}/>}</FormErrorSpan>
                </FormGroup>
                <FormGroup>
                    <InputLabel htmlFor="email">E-mail</InputLabel>
                    <TextInput onChange={handleInputEmail} value={email}  type="email" name="email" id="email"/>
                    <FormErrorSpan>{errors.email &&
                        <InputError message={errors.email}/>}</FormErrorSpan>
                </FormGroup>
                <FormGroup>
                    <InputLabel htmlFor="password">Senha</InputLabel>
                    <TextInput onChange={handleInputPassword} type="password" name="password" id="password"/>
                    <FormErrorSpan>{errors.password &&
                        <InputError message={errors.password}/>}</FormErrorSpan>
                </FormGroup>
                <FormGroup>
                    <InputLabel htmlFor="password_confirmation">Confirmar senha</InputLabel>
                    <TextInput onChange={handleInputPasswordConfirmation} type="password" name="password_confirmation"
                               id="passwordConfirmation"/>
                    <FormErrorSpan>{errors.passwordConfirmation &&
                        <InputError message={errors.passwordConfirmation}/>}</FormErrorSpan>
                </FormGroup>
                <FormButton>
                    Adicionar
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
