import { useEffect, useState } from 'react'
import axios from "axios";
import Tweet from "../../components/Tweet";
import TweetForm from "../../components/TweetForm";


type Props = {
    loggedInUser: any;
}

export function Home({ loggedInUser }: Props) {

    const tolken = loggedInUser.accessToken;
    const [data, setData] = useState([]);

    async function getData() {
        const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
            headers: {
                'authorization': `Bearer ${tolken}`
            }
        });
        setData(res.data);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <TweetForm loggedInUser={loggedInUser} onSuccess={getData}/>

            <div>
                {data.length && data.map((tweet: any) => (
                    <Tweet
                        key={tweet.id}
                        username={tweet.user.username}
                        name={tweet.user.name}
                        avatar="src/assets/img/avatar.png">
                        {tweet.text}
                    </Tweet>
                ))}
            </div>


        </>
    );
}

export default Home;