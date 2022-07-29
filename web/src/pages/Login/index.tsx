import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from 'yup';

const Input = (props: any) => (
    <input {...props} className="w-full text-lg bg-transparent p-4 border rounded-xl border-onix-500 outline-none focus:border-platinum-500" />
)

const validationSchema = yup.object({
    email: yup.string().required('Digite seu e-mail').email('E-mail inválido'),
    password: yup.string().required('Digite sua senha'),
})

type Props = {
    signInUser: Function;
}

export function Login({ signInUser }: Props) {

    const formik = useFormik({
        validationSchema,
        validateOnMount: true,
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async values => {
            const res = await axios.get(`${import.meta.env.VITE_API_HOST}/login`, {
                auth: {
                    username: values.email,
                    password: values.password
                }
            })

            signInUser(res.data);
        },
    });

    return (
        <div className="h-screen space-y-6 flex flex-col justify-center p-12">
            <h1 className="text-2xl">Acesse sua conta</h1>

            <form className="space-y-3" onSubmit={formik.handleSubmit}>

                <div className="space-y-2">
                    <Input
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        disabled={formik.isSubmitting}/>
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
                    {formik.isSubmitting ? 'Enviando...' : 'Entrar'}
                </button>

            </form>

            <span className="text-sm text-silver-500 text-center">
                Não tem conta? <a href="/signup" className="text-birdBlue-500"> Inscreva-se.</a>
            </span>

        </div>
    );
}

export default Login;