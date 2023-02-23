import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Auth/FB-config";
import { Users } from "../../types";
import styles from "./styles.module.scss";
type ContatProps = {
  userID: string;
  username: string;
  email: string;
  profile_picture: string;
};
const Contact: React.FC<Users> = ({
  userID,
  username,
  email,
  profile_picture,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [chatID, setChatID] = useState("");

  const navigate = useNavigate();
  const picture = profile_picture;
  const chatId = () => {
    if (user?.uid && userID) {
      if (userID < user?.uid) return userID + user?.uid;
      else return user?.uid + userID;
    } else return "404";
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
    });

    setChatID(chatId());
  }, [user, userID]);
  return (
    <Link to={`room/${chatID}`} className={styles.link}>
      <div className={styles.container}>
        <img src={picture} className={styles.avatar} alt="" />

        <div className={styles.user_info}>
          <h4>{username}</h4>
          <p>{email}</p>
        </div>
      </div>
    </Link>
  );
};
export default Contact;
