import { auth, dataBase, provider } from "../../Auth/FB-config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import styles from "./styles.module.scss";
import GoogleLogo from "../GoogleLogo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
const SignInBtn = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        if (data.user) {
          data.user.email ? setValue(data.user.email) : "";
          localStorage.setItem("email", data.user.email || "");

          set(ref(dataBase, "users/" + data.user.uid), {
            userID: data.user.uid,
            username: data.user.displayName,
            email: data.user.email,
            profile_picture: data.user.photoURL,
          });

          navigate("/chat");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email") || "");
  }, []);
  return (
    <>
      <div onClick={handleClick} className={styles.login_btn}>
        <GoogleLogo className={styles.img} />
        Continue to chat
      </div>
    </>
  );
};
export default SignInBtn;
