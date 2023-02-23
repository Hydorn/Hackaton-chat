import { Link } from "react-router-dom";
import SignInBtn from "../../components/SignInBtn";
import classes from "./styles.module.scss";
const Landing = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Welcome to the chat</h1>
      <SignInBtn />
    </div>
  );
};
export default Landing;
