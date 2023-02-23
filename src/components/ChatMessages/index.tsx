import { onValue, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { dataBase } from "../../Auth/FB-config";
import { Message as MessageType } from "../../types";
import Message from "../Message";

type ChatMessagesProps = {
  userID: string;
  receiverID: string;
  roomID: string;
};
const ChatMessages: React.FC<ChatMessagesProps> = ({
  userID,
  receiverID,
  roomID,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const myRef = useRef<HTMLDivElement | null>(null);
  const scrollDown = () => {
    console.log(myRef.current);
    myRef.current?.scrollIntoView(true);
  };
  useEffect(() => {
    const starCountRef = ref(dataBase, "room/" + roomID);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedMessages: MessageType[] = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          fetchedMessages.push(data[key]);
        }
      }

      setMessages(fetchedMessages);
      scrollDown();
    });
  }, []);

  useEffect(() => {
    scrollDown();
  }, [messages]);
  return (
    <>
      {messages.map((el) => {
        return (
          <Message
            message={el.message}
            senderName={el.senderName}
            senderID={el.senderID}
            receiverID={el.receiverID}
          />
        );
      })}
      <div ref={myRef} />
    </>
  );
};

export default ChatMessages;
