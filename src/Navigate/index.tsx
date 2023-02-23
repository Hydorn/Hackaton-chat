import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Chat from "../Pages/Chat";
import Landing from "../Pages/Landing";
import Room from "../Pages/Room";

const Navigate = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/room/:roomID" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Navigate;
