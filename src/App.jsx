import './App.css';
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import upgrade from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptlogoimg from './assets/chatgptLogo.svg'
import { sendMsg } from './openai.jsx'
import { useState } from 'react'
import Query from './query.jsx';

function App() {
  const gpt = 'ChatGPT is an advanced AI chatbot developed by OpenAI that can generate human-like text responses.'
  
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', content: gpt }
  ]);
  const [loading, setLoading] = useState(false);

  const newchat = () => {
    setInput('');
    setMessages([{ type: 'bot', content: gpt }]);
  }

  const handlegpt = async (userInput) => {
    setLoading(true);
    const response = await sendMsg(userInput);
    setMessages(prev => [...prev, { type: 'bot', content: response }]);
    setLoading(false);
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
    if (!input.trim()) return;
    
    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    await handlegpt(input);
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className='logo' /><span className="brand">Chat GPT</span>
          </div>

          <button onClick={newchat} className="midBtn">
            <img src={addBtn} alt="PlusSign" className='addBtn' />New Chat
          </button>

          <div className="upperSideBottom">
            {messages.filter(m => m.type === 'user').splice(0, 1).map((msg, i) => (
              <Query key={i} queryText={msg.content} />
            ))}
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
          {messages.map((msg, i) => (
            <div key={i} className={msg.type === 'user' ? 'chat' : 'chatbot'}>
              <img className='chatimg' src={msg.type === 'user' ? userIcon : gptlogoimg} alt={msg.type} />
              <p className="txt">
                {msg.type === 'bot' && loading && i === messages.length - 1 
                  ? "⏳ Thinking..." 
                  : msg.content}
              </p>
            </div>
          ))}
        </div>

        <div className="chatsfooter">
          <div className="input">
            <input 
              type="text" 
              onKeyDown={keyupdate} 
              placeholder='Send a message' 
              value={input} 
              onChange={handleinp} 
            />
            <button onClick={updatemsg} className='send'>
              <img src={sendBtn} alt="sendbtn" />
            </button>
          </div>
          <p>ChatGPT can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
}

export default App;