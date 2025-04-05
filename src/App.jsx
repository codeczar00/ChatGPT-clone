import './App.css';
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import upgrade from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptlogoimg from './assets/chatgptLogo.svg'
import { sendMsg } from './openai.js'
import { useState } from 'react'
import Query from './query.jsx';


function App() {
  
  const [input, setInput] = useState('');
  const [message, setMessage] = useState([]);
  const [gptresponse, setgptresponse] = useState('ChatGPT is an advanced AI chatbot developed by OpenAI that can generate human-like text responses. It is based on deep learning and trained on vast amounts of text data. ChatGPT can assist with answering questions, generating content, and engaging in conversations. It is widely used for coding help, writing, brainstorming, and automation. The model continuously improves with user interactions and updates.');
  const [loading, setloading] = useState(false);
  const [response, setresponse] = useState(false);
  

  const newchat = () => {
    setInput('');
    setMessage('');
    setgptresponse('ChatGPT is an advanced AI chatbot developed by OpenAI that can generate human-like text responses. It is based on deep learning and trained on vast amounts of text data. ChatGPT can assist with answering questions, generating content, and engaging in conversations. It is widely used for coding help, writing, brainstorming, and automation. The model continuously improves with user interactions and updates.');
    setresponse(false);
  }
  const handlegpt = async () => {
    setloading(true);
    const response = await sendMsg(input);
    setgptresponse(response);
    setloading(false);
    setTimeout(() => {
      setresponse(true)
    }, 250);
  }
  const handleinp = (e) => {
    setInput(e.target.value);
  }
  const keyupdate = (event) => {
    if (event.key === "Enter") {
      updatemsg();
    }
  }
  const updatemsg = async () => {
    setMessage(input);
    setInput("");
    await handlegpt();
  }

  return (
    <div className="App">

      <div className="sideBar">

        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className='logo' /><span className="brand">Chat GPT</span>
          </div>

          <button onClick={newchat} className="midBtn"><img src={addBtn} alt="PlusSign" className='addBtn' />New Chat</button>

          <div className="upperSideBottom">
            {response && <Query queryText={message}/>}
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Homepic" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="savedpic" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={upgrade} alt="upgradepic" className="listItemsImg" />Upgrade</div>
        </div>

      </div>

      <div className="main">

        <div className="chats">

          <div className="chat">
            <img className='chatimg' src={userIcon} alt="usericon" />
            <p className="txt">{message}</p>
          </div>

          <div className="chatbot">
            <img className='chatimg' src={gptlogoimg} alt="usericon" />
            <p className="txt">{loading ? "⏳ Thinking..." : gptresponse}</p>
          </div>

        </div>

        <div className="chatsfooter">
          <div className="input">
            <input type="text" name='' id='' onKeyDown={keyupdate} placeholder='Send a message' value={input} onChange={handleinp} />
            <button onClick={updatemsg} className='send'><img src={sendBtn} alt="sendbtn" /></button>
          </div>
          <p>ChatGPT can make mistakes. Check important info.</p>
        </div>

      </div>
    </div>
  );
}

export default App;