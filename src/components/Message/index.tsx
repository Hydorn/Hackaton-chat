import { onAuthStateChanged, User } from "firebase/auth";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, dataBase } from "../../Auth/FB-config";
import styles from "./styles.module.scss";
type MessageProps = {
  message: string;
  receiverID: string;
  senderID: string;
};
const Message: React.FC<MessageProps> = ({ message, receiverID, senderID }) => {
  const [user, setUser] = useState<User | null>(null);
  const [receiver, setReceiver] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else navigate("/");
    });

    get(ref(dataBase, "users/" + receiverID))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);

          setReceiver(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [receiverID]);

  return (
    <div
      className={`${styles.message_container} ${
        user?.uid === senderID ? styles.mine : ""
      }`}
    >
      <h3 className={styles.title}>
        {user?.uid === senderID
          ? user?.displayName || null
          : receiver?.displayName || null}
      </h3>
      <p>{message}</p>
    </div>
  );
};
export default Message;
