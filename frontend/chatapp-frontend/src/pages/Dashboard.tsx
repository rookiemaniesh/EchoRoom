import { useEffect, useRef, useState } from 'react'

import '../App.css'
import Input from '../components/Input'
import Header from '../components/Header'
import MessageBox from '../components/MessageBox'
import { getRoomId, getSocket, getUsername } from '../socket'

interface ChatMessage {
  message: string;
  author: string;
  type: 'chat' | 'system';
}

function Dashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socket = getSocket();
  const roomId = getRoomId();
  const username = getUsername();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) {
      console.warn("❌ No socket available");
      return;
    }

    const handleOpen = () => {
      console.log("✅ WebSocket is OPEN");
      setIsConnected(true);
    };

    const handleClose = () => {
      console.warn("🛑 WebSocket CLOSED");
      setIsConnected(false);
    };

    const handleError = (err: Event) => {
      console.error("❌ WebSocket ERROR", err);
      setIsConnected(false);
    };

    const handleMessage = (event: MessageEvent) => {
      console.log("📨 Received message:", event.data);
      const data = JSON.parse(event.data);
      if (data.type === "chat") {
        setMessages((prev) => [...prev, { 
          message: data.payload.message, 
          author: data.payload.author,
          type: 'chat'
        }]);
      } else if (data.type === "system") {
        console.log("ℹ️ System message:", data.payload.message);
        setMessages((prev) => [...prev, { 
          message: data.payload.message, 
          author: 'System',
          type: 'system'
        }]);
      }
    };

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('close', handleClose);
    socket.addEventListener('error', handleError);
    socket.addEventListener('message', handleMessage);

    if (socket.readyState === WebSocket.OPEN) {
      setIsConnected(true);
    }

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('close', handleClose);
      socket.removeEventListener('error', handleError);
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  const handleSend = (msg: string) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.warn("❌ Socket not ready for sending");
      return;
    }
    if (!isConnected) {
      console.warn("❌ Socket not connected");
      return;
    }
    if (!username) {
      console.warn("❌ No username set");
      return;
    }
    console.log("📤 Sending message:", msg);
    socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: msg,
          author: username,
        },
      })
    );
  };

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-black'>
        <div className='flex flex-col justify-between bg-zinc-900 px-4 pt-4 pb-3 rounded-xl max-w-xl  h-130  w-full border-3 border-zinc-500 border-dashed'>
          <div>
            <Header RoomId={roomId} />
            {!isConnected && (
              <div className="text-red-400 text-sm font-doto mb-2">
                ⚠️ Connecting to server...
              </div>
            )}
          </div>
          <div className='flex-1 overflow-y-auto mb-4'>
            <div className="flex flex-col w-full min-h-full">
              {messages.map((msg, i) => (
                msg.type === 'system' ? (
                  <div key={i} className="text-center text-gray-400 text-sm font-doto my-1">
                    {msg.message}
                  </div>
                ) : (
                  <MessageBox
                    key={i}
                    message={msg.message}
                    author={msg.author}
                    isMe={msg.author === username}
                  />
                )
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div>
            <Input
              placeholder='message'
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
