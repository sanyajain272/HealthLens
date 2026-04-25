import { useState } from "react";

function Chatbot() {

const [isOpen,setIsOpen] = useState(false)
const [messages,setMessages] = useState([
{sender:"bot",text:"Hello! I am MediGuide AI. Describe your symptoms."}
])
const [input,setInput] = useState("")

const sendMessage = async () => {

if(!input.trim()) return

const newMessages = [...messages,{sender:"user",text:input}]
setMessages(newMessages)
setInput("")

try{

const res = await fetch("http://127.0.0.1:5000/chat",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({message:input})
})

const data = await res.json()

let reply = data.reply

if(data.receipt){

reply += `

Appointment Confirmed
Doctor: ${data.receipt.Doctor}
Date: ${data.receipt.Date}
Time: ${data.receipt.Time}
Appointment ID: ${data.receipt.Appointment_ID}
`

}

setMessages([...newMessages,{sender:"bot",text:reply}])

}catch{

setMessages([...newMessages,{sender:"bot",text:"Server error"}])

}

}

return(

<>
<button
onClick={()=>setIsOpen(!isOpen)}
className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg"
>
💬
</button>

{isOpen && (

<div className="fixed bottom-20 right-6 w-[320px] bg-white shadow-xl rounded-xl border flex flex-col">

<div className="bg-blue-600 text-white p-3 font-semibold rounded-t-xl">
MediGuide Chat
</div>

<div className="p-3 h-64 overflow-y-auto">

{messages.map((m,i)=>(

<div key={i} className={m.sender==="user"?"text-right":"text-left"}>

<p className={`inline-block rounded-lg px-3 py-2 m-1 max-w-[75%] ${
m.sender==="user"
? "bg-blue-500 text-white"
: "bg-gray-200 text-black"
}`}>

{m.text}

</p>

</div>

))}

</div>

<div className="flex border-t">

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
className="flex-1 p-2 outline-none text-sm"
placeholder="Type message"
/>

<button
onClick={sendMessage}
className="bg-blue-600 text-white px-4"
>
Send
</button>

</div>

</div>

)}

</>

)

}

export default Chatbot