import { onAuthStateChanged, User } from "firebase/auth";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, dataBase } from "../../Auth/FB-config";
import styles from "./styles.module.scss";
type MessageProps = {
  message: string;
  receiverID: string;
  senderName: string;
  senderID: string;
};
const Message: React.FC<MessageProps> = ({
  message,
  receiverID,
  senderID,
  senderName,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [receiver, setReceiver] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else navigate("/");
    });
    console.log(user);

    if (user?.uid !== senderID) {
      get(ref(dataBase, "users/" + senderID))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setReceiver(data);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    console.log(receiver);
  }, []);

  return (
    <div
      className={`${styles.message_container} ${
        user?.uid === senderID ? styles.mine : ""
      }`}
    >
      <h3 className={styles.title}>{senderName}</h3>
      <p>{message}</p>
    </div>
  );
};
export default Message;
