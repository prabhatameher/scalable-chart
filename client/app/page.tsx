"use client"

import { useState } from "react";
import { useSocket } from "./context/SocketProvider";

export default function Home() {
  const [msg, setMsg] = useState('')
  const { sendMessage, messages } = useSocket()
  return (
    <div className="text-center mt-2">
      <h1 className="mb-2 text-lg">All message will appear Here</h1>
      <input type="text" onChange={(e) => setMsg(e.target.value)}
        className="border outline-none mx-2 px-2 py-1"
      />
      <button className="mx-2 px-2 py-1 bg-blue-600 text-white" onClick={() => sendMessage(msg)}>Submit</button>
      <div>
        {messages?.map((msg) => <h5>{msg}</h5>)}
      </div>
    </div>
  );
}
