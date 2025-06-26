import React from "react";

type MessageBoxProps = {
  message: string;
  author?: string;
  isMe: boolean;
};

const MessageBox: React.FC<MessageBoxProps> = ({ message, author, isMe }) => {
  return (
    <div
      className={`max-w-[75%] break-words whitespace-pre-wrap p-1 px-4 rounded-lg mb-2 font-doto ${
        isMe ? "bg-zinc-700 text-white self-end" : "bg-zinc-800 text-white self-start"
      }`}
      style={{ alignSelf: isMe ? "flex-end" : "flex-start" }}
    >
      <div className="pr-7">{message}</div>
      <div className="text-xs  text-right opacity-70">{isMe?"You":author}</div>
    </div>
  );
};

export default MessageBox;
