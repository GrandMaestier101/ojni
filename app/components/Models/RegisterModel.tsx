"use client";

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import useRegisterModel from '@/app/hooks/useRegisterModel';
import Model from './Model';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-toastify';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModel from '@/app/hooks/useLoginModel';

const RegisterModel = () => {

    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            Passwrod: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModel.onClose();
            })
            .catch((error) => {
                toast.error("Something went wrong❗");
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        registerModel.onClose();
        loginModel.onOpen();
    }, [loginModel, registerModel]);

    const bodyContent = (
        <div className=' flex flex-col gap-4'>
            <Heading
                title="Welcome to Online JnI⚡"
                subtitle='Create an account'
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className=" flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div
                className="
                text-neutral-900
                text-center
                mt-4
                font-light
             "
            >
                <div className=" justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={toggle}
                        className="
                        text-blue-500
                        cursor-pointer
                        hover:underline
                    "
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Model
            disabled={isLoading}
            isOpen={registerModel.isOpen}
            title='Register'
            actionLabel='continue'
            onClose={registerModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModel;
