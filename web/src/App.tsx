import { useState } from 'react'
import Tweet from "./components/Tweet"
import TweetForm from "./components/TweetForm"
import { Widget } from './components/Widget'

export function App() {
  return (
    
    <>
      <TweetForm />

      <Tweet
        username="@elonmusk"
        name="Elon Musk"
        avatar="src/assets/img/avatar.png">
        Lets make twitter free again
      </Tweet>

      <Tweet
        username="@elonmusk"
        name="Elon Musk"
        avatar="src/assets/img/avatar.png">
        Lets make twitter free again tchan
      </Tweet>

      <Tweet
        username="@elonmusk"
        name="Elon Musk"
        avatar="src/assets/img/avatar.png">
        Lets make twitter free again
      </Tweet>
    </>
  )
}

// 