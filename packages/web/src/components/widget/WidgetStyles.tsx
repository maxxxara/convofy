import React from "react";

const WidgetStyles: React.FC = () => {
  return (
    <style>{`
      @keyframes convofy-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes convofy-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes convofy-bounce {
        0%, 80%, 100% { 
          transform: translateY(0);
          animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        40% { 
          transform: translateY(-25%);
          animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
      }
      .convofy-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .convofy-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .convofy-scrollbar::-webkit-scrollbar-thumb {
        background: #e5e7eb;
        border-radius: 3px;
      }
      .convofy-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #d1d5db;
      }
    `}</style>
  );
};

export default WidgetStyles;
