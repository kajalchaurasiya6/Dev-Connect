import { ArrowLeft, PhoneCall, Send, Smile } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function MessagePage() {
    const {user} = useAuth()
    const navigate = useNavigate();
  return (
<div className="flex flex-col h-full ">
  {/* Header */}
  <div className="flex items-center w-full top-0 z-50 fixed gap-3 px-4 py-3 border-b bg-card">
    <button onClick={()=>navigate('/messages')} title="Back">
      <ArrowLeft className="w-6 h-6" />
    </button>
    <img src={user?.photoURL} className="w-10 h-10 rounded-full"/>
    <div>
      <div className="font-semibold">{user?.displayName}</div>
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        <span className={`w-2 h-2 rounded-full ${user?.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
        {user?.isOnline ? "Online" : "Offline"}
      </span>
    </div>
    <div className="ml-auto flex items-center gap-2">
      <button><PhoneCall /></button>
      {/* <button><Info /></button> */}
    </div>
  </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto px-4 pt-6 pb-16  space-y-6 bg-background">
    <div className="flex flex-col items-end">
      <div className="max-w-xs bg-primary text-primary-foreground rounded-xl px-4 py-2">
        Hi there!
      </div>
      <span className="text-xs text-muted-foreground mt-1">2:15 PM</span>
    </div>
    <div className="flex flex-col items-start">
      <div className="max-w-xs bg-secondary text-foreground rounded-xl px-4 py-2">
        Hello! How can I help?
      </div>
      <span className="text-xs text-muted-foreground mt-1">2:16 PM</span>
    </div>
  </div>

  <form className="flex items-center fixed bottom-0 w-full gap-2 px-4 py-3 mt-6 border-t bg-card">
    <button type="button"><Smile /></button>
    <input
      className="flex-1 rounded-full bg-secondary px-4 py-2 outline-none"
      type="text"
      placeholder="Type your message…"
    />
    <button type="submit" className="bg-primary text-primary-foreground rounded-full px-4 py-2">
      <Send />
    </button>
  </form>
</div>
  )
}

export default MessagePage