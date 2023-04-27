import'../assets/home.css'
import { fetchUsers, postMessage, fetchMessage, thumbUpMessage, thumbDownMessage, putStatus } from "../util/services";
import {useEffect, useRef, useState} from "react";
import { STATUS, DEFAULT_AVATAR } from "../util/constants";
import LOGO_SEND from '../assets/img/send.svg'
import LOGO_THUMB_UP from '../assets/img/thumbs-up.svg'
import LOGO_THUMB_DOWN from '../assets/img/thumbs-down.svg'

function Home({ currentUser, currentStatus, updateCurrentStatus }) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [showStatusOption, setShowStatusOption] = useState(false);
  const messageEl = useRef(null);

  const getUserList = () => {
    fetchUsers()
      .then( res => {
        setUsers(res?.userList);
      })
      .catch( err => {});
  }

  const triggerStatus = () => {
    setShowStatusOption(!showStatusOption);
  }

  const getStatusStyle = (status) => {
    if (status === 0) {
      return 'status__offline';
    }

    if (status === 1) {
      return 'status__online';
    }

    if (status === 2) {
      return 'status__busy';
    }

    return '';
  }

  const doPutStatus = (status) => {
    if (currentStatus !== status) {
      putStatus(status)
        .then( res => {
          updateCurrentStatus(res.status);
        })
        .catch( err => {});
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      doSendMessage();
    }
  }

  const getAllMessage = (scroll) => {
    fetchMessage()
      .then( res => {
        setMessageList(res?.msgList);
        if (scroll) {
          setTimeout(scrollToBottom, 300);
        }
      })
      .catch( err => {});
  }

  const doSendMessage = () => {
    if (message === '') return;
    postMessage(message)
      .then( res => {
        setMessage('');
        setMessageList(res?.msgList);
        setTimeout(scrollToBottom, 300);
      })
      .catch( err => {});
  }

  const doThumbUp = (id) => {
    thumbUpMessage(id)
      .then( res => {
        setMessageList(res?.msgList);
      })
      .catch( err => {});
  }

  const doThumbDown = (id) => {
    thumbDownMessage(id)
      .then( res => {
        setMessageList(res?.msgList);
      })
      .catch( err => {});
  }

  const scrollToBottom = () => {
    if (messageEl && messageEl.current) {
      messageEl.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(
    () => {
      getUserList();
      getAllMessage(true);
      const interval = setInterval(() => {
        getUserList();
        getAllMessage(false);
      }, 5000);
      return () => clearInterval(interval);
    },
    []
  );

  return (
    <main className="home__main">
      <div className="home">
        <ul className="home__users">
          {users.map(user =>
            <li className="user" key={user.username}>
              <img className="user__avatar" src={user.avatar || DEFAULT_AVATAR} alt={user.username}/>
              <div className="user__info">
                <div className="user__base">
                  <h2 className="user__name">{user.username}</h2>
                  <p className={["user__status", getStatusStyle(user.status)].join(' ')}>{STATUS[user.status]}</p>
                </div>
                <p className="user_slogan">{user.slogan}</p>
              </div>
            </li>
          )}
        </ul>
        <div className="home__message">
          <div className="message__head">
            {
              currentUser &&
              <div className="user">
                <img className="user__avatar current__avatar" src={currentUser.avatar || DEFAULT_AVATAR} alt={currentUser.username}/>
                <div className="user__info">
                  <div className="user__base">
                    <h2 className="user__name">{currentUser.username}</h2>
                    <div className="current__status" onClick={triggerStatus}>
                      <p className={["user__status", getStatusStyle(currentStatus)].join(' ')}>{STATUS[currentStatus]}</p>
                      {
                        showStatusOption &&
                        <ul className="status__option">
                          <li className="status__option__item" onClick={(e) => {doPutStatus(1)}}>online</li>
                          <li className="status__option__item" onClick={(e) => {doPutStatus(2)}}>busy</li>
                        </ul>
                      }
                    </div>
                  </div>
                  <p className="user_slogan">{currentUser.slogan}</p>
                </div>
              </div>
            }
          </div>
          <ul className="message__content">
            {messageList.map(msg =>
              <li className="message" key={msg.id}>
                <img className="user__avatar message__avatar" src={msg.sender.avatar || DEFAULT_AVATAR} alt=''/>
                <div className="message__info">
                  <p className="message__sender">
                    <span>{msg.sender.username}</span>
                    <span className="message__time">{msg.time}</span>
                  </p>
                  { msg.img ? <img className="message_img" src={msg.img} alt=""></img> : <p className="message__text">{msg.content}</p> }
                  <div className="message__thumb">
                    <p className={["thumb", msg.thumbUp.includes(currentUser.username) ? "thumb__forbid" : ''].join(' ')} onClick={(e) => {doThumbUp(msg.id)}}>
                      <img className="thumb__icon" src={LOGO_THUMB_UP} alt=''/><span>{msg.thumbUp.length}</span>
                    </p>
                    <p className={["thumb", msg.thumbUp.includes(currentUser.username) ? "thumb__forbid" : ''].join(' ')} onClick={(e) => {doThumbDown(msg.id)}}>
                      <img className="thumb__icon" src={LOGO_THUMB_DOWN} alt=''/><span>{msg.thumbDown.length}</span>
                    </p>
                  </div>
                </div>
              </li>
            )}
            <li style={{height: 1, width: '100%'}} ref={messageEl}></li>
          </ul>
          <div className="message__action">
            <input className="message__input" placeholder="Please enter a message" type="text"
                   value={message} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
            <img className="message__send" src={LOGO_SEND} alt="" onClick={doSendMessage}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;