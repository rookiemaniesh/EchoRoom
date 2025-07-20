import React from "react";

type MessageBoxProps = {
  message: string;
  author?: string;
  isMe: boolean;
};

const MessageBox: React.FC<MessageBoxProps> = ({ message, author, isMe }) => {
  return (
    <div
      className={`max-w-[75%] break-words whitespace-pre-wrap p-3 rounded-lg mb-2 font-doto ${
        isMe 
          ? "bg-blue-600 text-white ml-auto" 
          : "bg-gray-600 text-white mr-auto"
      }`}
    >
      <div className="mb-1">{message}</div>
      <div className={`text-xs opacity-70 ${isMe ? "text-blue-200" : "text-gray-300"}`}>
        {author}
      </div>
    </div>
  );
};

export default MessageBox;
