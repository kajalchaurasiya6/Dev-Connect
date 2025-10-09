import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
const sampleMessages = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
    lastMessage: 'Hey! Are you still available for collaboration?',
    timestamp: '2 hours ago',
    unread: true,
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=random',
    lastMessage: 'Let’s connect for the next project!',
    timestamp: '5 hours ago',
    unread: false,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=random',
    lastMessage: 'Thanks for the feedback on my portfolio.',
    timestamp: '1 day ago',
    unread: false,
  }
];

const MessagesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const filteredMessages = sampleMessages.filter(msg =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Search for people or messages..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="px-3 py-2 w-full rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-ring"
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredMessages.length === 0 && (
              <div className="py-10 text-center text-muted-foreground">
                No conversations found.
              </div>
            )}
            <ul className="divide-y divide-border">
              {filteredMessages?.map(msg => (
                <li
                  key={msg.id}
                  className={`flex items-center px-2 py-4 hover:bg-accent cursor-pointer transition rounded-lg ${
                    msg.unread ? 'bg-secondary/30 font-semibold' : ''
                  }`}
                  onClick={()=>navigate(`/messages/${msg.id}`)}
                >
                  <img
                    src={msg.avatar}
                    alt={msg.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span>{msg.name}</span>
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {msg.lastMessage}
                    </p>
                  </div>
                  {msg.unread && (
                    <span className="ml-4 w-2 h-2 rounded-full bg-primary block" title="Unread" />
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <Button size="sm">New Message</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;
