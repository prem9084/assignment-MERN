import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import PrivetRoute from "./components/privetRoute/PrivetRoute";
import CreatePost from "./components/createPost/createPost";
import AllPost from "./components/AllPost/AllPost";
import UpdatePost from "./components/updatePost/updatePost";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<PrivetRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/all-post" element={<AllPost />} />
          <Route path="/update-post/:slug" element={<UpdatePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
