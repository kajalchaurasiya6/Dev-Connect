export interface Connection {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  acceptedAt?: Date;
}

export interface ConnectionRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  message?: string;
  createdAt: Date;
}
