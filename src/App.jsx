// import { Canvas } from "@react-three/fiber";
// import { Experience } from "./components/Experience";
// import { ChatInput } from "./components/ChatInput";
// import { useState } from "react";

// function App() {
//   const [scriptCommand, setScriptCommand] = useState("");

//   return (
//     <>
//       <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
//         <color attach="background" args={["#000000"]} />
//         <Experience scriptCommand={scriptCommand} />
//       </Canvas>
//       <ChatInput onSend={(text) => setScriptCommand(text.toLowerCase())} />
//     </>
//   );
// }

// export default App;




// import { Canvas } from "@react-three/fiber";
// import { Experience } from "./components/Experience";
// import { ChatInput } from "./components/ChatInput";
// import { useState } from "react";
// import "./background.css"; // import the CSS

// function App() {
//   const [scriptCommand, setScriptCommand] = useState("");

//   return (
//     <div id="canvas-container">
//       <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
//         <Experience scriptCommand={scriptCommand} />
//       </Canvas>
//       <ChatInput onSend={(text) => setScriptCommand(text.toLowerCase())} />
//     </div>
//   );
// }

// export default App;







import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { ChatInput } from "./components/ChatInput";
import { DisplayBox } from "./components/DisplayBox";
import { useState, useRef } from "react";
import "./background.css"; // import the CSS

function App() {
  const [scriptCommand, setScriptCommand] = useState("");
  const [messages, setMessages] = useState([]);
  const typingInterval = useRef(null);

  const handleSend = (text) => {
    const msg = text.toLowerCase();

    if (typingInterval.current) clearInterval(typingInterval.current);

    if (msg === "hello") {
      typeMessage(
        " Hello! User, Welcome to Galax AI. Let me explain to you about our services."
      );

      setScriptCommand(""); 
      setTimeout(() => setScriptCommand(msg), 50); 
    } else {
      setMessages((prev) => [...prev, msg]);
      setScriptCommand(msg);
    }
  };

  const typeMessage = (fullText) => {
    let index = 0;
    setMessages([]);

    typingInterval.current = setInterval(() => {
      setMessages((prev) => {
        const last = prev[prev.length - 1] || "";
        if (index === 0) return [fullText.charAt(index)];
        return [...prev.slice(0, -1), last + fullText.charAt(index)];
      });

      index++;
      if (index >= fullText.length) {
        clearInterval(typingInterval.current);
        typingInterval.current = null;
      }
    }, 100);
  };

  return (
    <div id="canvas-container">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <Experience scriptCommand={scriptCommand} />
      </Canvas>

      <DisplayBox messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;
