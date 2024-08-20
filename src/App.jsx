import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RoomDetails from "./pages/RoomDetails";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CustomerConcerns from "./pages/CustomerConcerns";

function App() {

  return (
    <>
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/rooms/:roomId" element={<RoomDetails/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customerconcerns" element={<CustomerConcerns/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
