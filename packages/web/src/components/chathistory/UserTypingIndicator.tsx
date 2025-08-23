import React from "react";

const UserTypingIndicator: React.FC = () => {
  return (
    <div className="flex">
      <div className="border border-slate-200 px-4 ml-[32px] py-2 rounded-lg rounded-bottom-right-sm max-w-xs">
        <div className="flex gap-1 items-center">
          <span className="text-sm text-slate-600">User is typing</span>
          <div className="flex gap-1 ml-2">
            <div
              className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypingIndicator;
