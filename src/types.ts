export interface User {
    name: string;
    id?: string;
  }
  
  export enum MessageType {
    Message,
    UserConnected,
    UserDisconnected
  }
  
  export interface Message {
    txt?: string;
    time: number;
    type: MessageType;
    user: User;
  }