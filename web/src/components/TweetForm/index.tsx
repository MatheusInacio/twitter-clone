import { HeartIcon } from '@heroicons/react/outline'
import { FormEvent, useState } from "react";

export function TweetForm() {

    const TWEET_MAX_CHAR = 250;

    const [text, setText] = useState('');

    function handleChangeText(event: any) {
        setText(event.target.value);
    }

    return (
        <div className="space-y-3 border-b p-4 border-silver-500">
            <div className="flex space-x-5">
                <img className="w-10 h-10 rounded-full object-cover" src="/src/assets/img/avatar.png" alt="" />
                <h1 className="font-bold text-xl">Página Inicial</h1>
            </div>

            <form action="" className="pl-12 text-lg flex flex-col">
                <textarea
                    name="text"
                    value={text}
                    className="w-full text-sm placeholder-zinc-400 text-zinc-100 border-none bg-transparent rounded-md focus:border-silver-500 focus:ring-silver-500 focus:ring-1 resize-none
                 scrollbar-thumb-zinc-700 scrollbar-thin scrollbar-track-transparent"
                    placeholder="O que está acontecendo?"
                    onChange={event => setText(event.target.value)}>
                </textarea>
            </form>

            <div className="flex justify-end items-center space-x-3">
                <span className="text-sm">
                    <span>{text.length}</span> / <span className="text-birdBlue-500">250</span>
                </span>
                <button
                    disabled={text.length > TWEET_MAX_CHAR}
                    className="bg-birdBlue-500 py-2 px-5 rounded-full disabled:opacity-50">Tweet</button>
            </div>

        </div>
    );
}

export default TweetForm;