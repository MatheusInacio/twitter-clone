import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from 'yup';

const Input = (props: any) => (
    <input {...props} className="w-full text-lg bg-transparent p-4 border rounded-xl border-onix-500 outline-none focus:border-platinum-500" />
)

const validationSchema = yup.object({
    name: yup.string().required('Digite nome'),
    username: yup.string().required('Digite seu nome de usuário'),
    email: yup.string().required('Digite seu e-mail').email('E-mail inválido'),
    password: yup.string().required('Digite sua senha'),
})

type Props = {
    signInUser: Function;
}

export function Signup({ signInUser }: Props) {

    const formik = useFormik({
        validationSchema,
        validateOnMount: true,
        initialValues: {
            email: '',
            password: '',
            name: '',
            username: ''
        },
        onSubmit: async values => {
            const res = await axios.post(`${import.meta.env.VITE_API_HOST}/signup`, {
                email: values.email,
                password: values.password,
                name: values.name,
                username: values.username
            })

            signInUser(res.data);
        },
    });

    return (
        <div className="h-screen flex justify-center">
            <div className="bg-birdBlue-500 lg:flex-1"></div>
            <div className="flex-1 space-y-6 flex justify-center p-12 items-center">
                <div className="max-w-md flex-1">

                    <h1 className="text-2xl">Crie sua conta</h1>

                    <form className="space-y-3" onSubmit={formik.handleSubmit}>

                        <div className="space-y-2">
                            <Input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting} />
                            {(formik.touched.name && formik.errors.name) && (
                                <div className="text-red-500 text-sm mt-1">
                                    {formik.errors.name}
                                </div>
                            )}
                        </div>


                        <div className="space-y-2">
                            <Input
                                type="text"
                                name="username"
                                placeholder="Nome de usuário"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting} />
                            {(formik.touched.username && formik.errors.username) && (
                                <div className="text-red-500 text-sm mt-1">
                                    {formik.errors.username}
                                </div>
                            )}
                        </div>


                        <div className="space-y-2">
                            <Input
                                type="text"
                                name="email"
                                placeholder="E-mail"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting} />
                            {(formik.touched.email && formik.errors.email) && (
                                <div className="text-red-500 text-sm mt-1">
                                    {formik.errors.email}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting} />
                            {(formik.touched.password && formik.errors.password) && (
                                <div className="text-red-500 text-sm mt-1">
                                    {formik.errors.password}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting || !formik.isValid}
                            className="w-full text-lg bg-birdBlue-500 py-4 rounded-full disabled:opacity-50">
                            {formik.isSubmitting ? 'Enviando...' : 'Cadastrar'}
                        </button>

                    </form>

                    <span className="text-sm text-silver-500 text-center">
                        Já tem uma tem conta? <a href="/login" className="text-birdBlue-500"> Acesse.</a>
                    </span>

                </div>
            </div>
        </div>
    );
}

export default Signup;