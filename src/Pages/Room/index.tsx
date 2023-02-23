import { onAuthStateChanged, User } from "firebase/auth";
import { push, ref, set, update } from "firebase/database";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, dataBase } from "../../Auth/FB-config";
import ChatMessages from "../../components/ChatMessages";
import Contact from "../../components/Contact";
import SendSvg from "../../components/SendSvg";
import styles from "./styles.module.scss";
const Room = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [receiverID, setReceiverID] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage((e.target as HTMLInputElement).value);
  };
  const { roomID } = useParams();

  const handleSubmit = () => {
    if (message === "") return;
    try {
      push(ref(dataBase, "room/" + roomID), {
        timestamp: Date.now(),
        message,
        senderID: user?.uid,
        senderName: user?.displayName,
        receiverID,
      });
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      handleSubmit();
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else navigate("/");
    });
    if (user && roomID) {
      setReceiverID(roomID?.replace(user?.uid, ""));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Contact
        userID={user?.uid || ""}
        email={user?.email || ""}
        profile_picture={user?.photoURL || undefined}
        username={user?.displayName || "Not Found"}
      />
      <div className={styles.chats}>
        <ChatMessages
          userID={user?.uid || ""}
          receiverID={receiverID}
          roomID={roomID || ""}
        />
      </div>
      <div className={styles.input_container}>
        <input
          onChange={handleChange}
          value={message}
          onKeyDown={handleKeyDown}
          className={styles.input}
          autoComplete={"off"}
          type="text"
          name="message"
          placeholder="Write a message"
        />
        <div onClick={handleSubmit} className={styles.send_btn}>
          <SendSvg className={styles.icon} />
        </div>
      </div>
    </div>
  );
};
export default Room;
