import React, { useState } from "react";

function Chatbot() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 I am MovieApp AI. What movie can I help you with?",
    },
  ]);

  const [loading, setLoading] = useState(false);


  const sendMessage = async (e) => {

    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    const userMessage = message;

    setMessages((oldMessages) => [
      ...oldMessages,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );


      if (!response.ok) {
        throw new Error("Server error");
      }


      const data = await response.json();


      setMessages((oldMessages) => [
        ...oldMessages,
        {
          sender: "ai",
          text: data.reply || "Sorry, I could not answer.",
        },
      ]);


    } catch (error) {

      console.error("Chat Error:", error);

      setMessages((oldMessages) => [
        ...oldMessages,
        {
          sender: "ai",
          text: "Sorry! AI server is not working.",
        },
      ]);

    } finally {

      setLoading(false);

    }

  };


  return (
    <>
      {/* =====================================
          CHAT BUTTON
      ====================================== */}

      <button
        onClick={() => setOpen(!open)}
        className="
          fixed
          bottom-5
          right-5
          z-50
          w-14
          h-14
          rounded-full
          bg-cyan-500
          hover:bg-cyan-400
          text-2xl
          shadow-lg
          hover:scale-110
          transition
        "
      >
        🤖
      </button>


      {/* =====================================
          CHAT WINDOW
      ====================================== */}

      {open && (

        <div
          className="
            fixed
            bottom-24
            right-5
            z-50
            w-[350px]
            max-w-[90vw]
            h-[500px]
            bg-[#0f172a]
            border
            border-cyan-500/30
            rounded-2xl
            shadow-2xl
            flex
            flex-col
            overflow-hidden
          "
        >


          {/* =====================================
              CHAT HEADER
          ====================================== */}

          <div
            className="
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-4
              py-3
              flex
              justify-between
              items-center
            "
          >

            <div>

              <h2 className="font-bold">
                🤖 MovieApp AI
              </h2>

              <p className="text-xs text-cyan-100">
                Movie Assistant
              </p>

            </div>


            <button
              onClick={() => setOpen(false)}
              className="
                text-xl
                hover:text-gray-200
                transition
              "
            >
              ×
            </button>

          </div>


          {/* =====================================
              MESSAGES
          ====================================== */}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">

            {messages.map((item, index) => (

              <div
                key={index}
                className={
                  item.sender === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >

                <div
                  className={
                    item.sender === "user"
                      ? `
                        bg-cyan-600
                        px-3
                        py-2
                        rounded-xl
                        max-w-[80%]
                        text-sm
                      `
                      : `
                        bg-gray-800
                        px-3
                        py-2
                        rounded-xl
                        max-w-[80%]
                        text-sm
                        text-gray-200
                      `
                  }
                >
                  {item.text}
                </div>

              </div>

            ))}


            {/* Loading */}

            {loading && (

              <div className="flex justify-start">

                <div
                  className="
                    bg-gray-800
                    px-3
                    py-2
                    rounded-xl
                    text-sm
                    text-gray-400
                  "
                >
                  🤖 AI is thinking...
                </div>

              </div>

            )}

          </div>


          {/* =====================================
              INPUT
          ====================================== */}

          <form
            onSubmit={sendMessage}
            className="
              p-3
              border-t
              border-white/10
              flex
              gap-2
            "
          >

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about movies..."
              className="
                flex-1
                min-w-0
                bg-gray-800
                text-white
                px-3
                py-2
                rounded-lg
                outline-none
                border
                border-white/10
                focus:border-cyan-400
                transition
              "
            />


            <button
              type="submit"
              disabled={loading}
              className="
                px-4
                bg-cyan-600
                hover:bg-cyan-500
                rounded-lg
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
              "
            >
              ➤
            </button>

          </form>

        </div>

      )}

    </>
  );
}

export default Chatbot;