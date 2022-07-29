import { HeartIcon } from '@heroicons/react/outline'
import axios from "axios";
import { useFormik } from "formik";
import { FormEvent, useState } from "react";

type Props = {
    loggedInUser: any;
    onSuccess: any
}

export function TweetForm({ loggedInUser, onSuccess }: Props) {

    const TWEET_MAX_CHAR = 250;
    const [text, setText] = useState('');

    const formik = useFormik({
        initialValues: {
            text: '',
        },
        onSubmit: async (values, form) => {



            const res = await axios.post(`${import.meta.env.VITE_API_HOST}/tweets`, {
                text: values.text
            }, {
                headers: {
                    'authorization': `Bearer ${loggedInUser.accessToken}`
                }
            });

            console.log(res);

            form.setFieldValue('text', '')
            onSuccess();
        },
    });

    function handleChangeText(event: any) {
        setText(event.target.value);
    }

    return (
        <div className="space-y-3 border-b p-4 border-silver-500">
            <div className="flex space-x-5">
                <img className="w-10 h-10 rounded-full object-cover" src="/src/assets/img/avatar.png" alt="" />
                <h1 className="font-bold text-xl">Página Inicial</h1>
            </div>

            <form action="" className="pl-12 text-lg flex flex-col" onSubmit={formik.handleSubmit}>
                <textarea
                    name="text"
                    value={formik.values.text}
                    className="w-full text-sm placeholder-zinc-400 text-zinc-100 border-none bg-transparent rounded-md focus:border-silver-500 focus:ring-silver-500 focus:ring-1 resize-none
                 scrollbar-thumb-zinc-700 scrollbar-thin scrollbar-track-transparent"
                    placeholder="O que está acontecendo?"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}>
                </textarea>

                <div className="flex justify-end items-center space-x-3">
                    <span className="text-sm">
                        <span>{formik.values.text.length}</span> / <span className="text-birdBlue-500">250</span>
                    </span>
                    <button
                        type="submit"
                        disabled={formik.values.text.length > TWEET_MAX_CHAR || formik.isSubmitting}
                        className="bg-birdBlue-500 py-2 px-5 rounded-full disabled:opacity-50">Tweet</button>
                </div>
            </form>

        </div>
    );
}

export default TweetForm;