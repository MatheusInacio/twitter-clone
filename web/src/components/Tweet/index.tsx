import { HeartIcon } from '@heroicons/react/outline'

interface TweetProps {
    name: string,
    username: string,
    avatar: string,
    children: string
}

export function Tweet({ name, username, avatar, children }: TweetProps) {
    return (
        <div className="flex space-x-3 p-4 border-b border-silver-500">
            <div>
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={avatar}
                    alt="" />
            </div>
            <div>
                <span className="font-bold text-sm">{name}</span>{' '}
                <span className="text-sm text-silver-500">{username}</span>

                <p>
                    {children}
                </p>
                <div className="flex space-x-1 text-silver-500 text-sm items-center">
                    <HeartIcon className="w-6 stroke-1 stroke-silver-500" />
                    <span>1.2k</span>
                </div>
            </div>

        </div>
    );
}

export default Tweet;