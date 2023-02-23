import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { DataSnapshot, get, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, dataBase } from "../../Auth/FB-config";
import Contact from "../../components/Contact";
import NavBar from "../../components/NavBar";
import { Users } from "../../types";

const Chat = () => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Users[] | undefined>(undefined);

  const navigate = useNavigate();
  //check login
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        get(ref(dataBase, "users"))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const fetchedUsers: Users[] = [];
              for (const key in data) {
                if (data.hasOwnProperty(key)) {
                  fetchedUsers.push(data[key]);
                }
              }
              setUsers(fetchedUsers);
              console.log(users);
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <NavBar logged={Boolean(user)} />
      {users ? (
        users
          ?.filter((el) => {
            if (el.email != user?.email) return el;
          })
          .map((el, i) => {
            return (
              <Contact
                key={i}
                userID={el.userID}
                email={el.email}
                username={el.username}
                profile_picture={el.profile_picture}
              />
            );
          })
      ) : (
        <h2>No users Information</h2>
      )}
    </>
  );
};
export default Chat;
