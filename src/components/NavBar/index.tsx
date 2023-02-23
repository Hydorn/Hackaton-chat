import { useNavigate } from "react-router-dom";
import { auth } from "../../Auth/FB-config";
import styles from "./styles.module.scss";
type NavBarProps = {
  logged: boolean;
};
const NavBar: React.FC<NavBarProps> = ({ logged }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    auth.signOut().then((data) => {
      navigate("/");
    });
  };
  return (
    <>
      <div className={styles.container}>
        {logged ? (
          <div onClick={handleClick} className={styles.logout_btn}>
            Log Out
          </div>
        ) : null}
        <div className={styles.header}>Messages App</div>
      </div>
    </>
  );
};
export default NavBar;
