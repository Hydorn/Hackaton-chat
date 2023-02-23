export type Users = {
  userID: string;
  email: string;
  profile_picture: string;
  username: string;
};

export type Message = {
  message: string;
  receiverID: string;
  senderID: string;
  roomID: string;
};
