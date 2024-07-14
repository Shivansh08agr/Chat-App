import List from './components/list/List';
import Chat from './components/chat/Chat';
import Details from './components/details/Details';
import Login from './components/login/Login';
import Notification from './components/notification/Notification'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';
import { useChatStore} from './lib/chatStore';
import useWindowSize from './Hooks/useWindowSize';

const App = () => {
  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();
  const [info, setInfo] = useState(false);
  const [chating, setChating] = useState(false);
  const {width} = useWindowSize();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if(isLoading) return <div className='loading'><span className="svg-spinners--bars-fade"></span> Loading...</div>

  return (
    <div className='container'>
      {currentUser ? (
        width >= 1200 ?
          (<>
              {<List setChating={setChating}/>}
              {chatId && <Chat setInfo= {setInfo} setChating= {setChating}/>}
              {chatId && <Details/>}
          </>) : width >= 768 ?
          (<>
              {(!info) && <List setChating={setChating}/>}
              {chatId && <Chat setInfo= {setInfo} setChating= {setChating}/>}
              {chatId && info && <Details/>}
          </>) : 
          (<>
            {!chating && !info && <List setChating={setChating}/>}
            {chating && chatId && !info && <Chat setInfo= {setInfo} setChating= {setChating}/>}
            {chatId && info && <Details setInfo= {setInfo}/>}
        </>)
          
        ) : (
        <Login/>
      )
      }
      <Notification/>
    </div>
  )
}

export default App