import FoodSection from "./Components/Home/FoodSection";
import Home from "./Components/Home/Home";
import WhyChooseUs from "./Components/Home/WhyChooseUs";
import Footer from "./Components/SharedComponents/Footer";
import Navbar from "./Components/SharedComponents/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./Components/Dashboard/Dashboard";
import FoodDetails from "./Components/FoodDetails";



function App() {
  return (
    <div className="text-accent ">
      <Navbar />

      <Routes>
        <Route path={"/"} element={
          <>
            <Home />
            <FoodDetails/>
            <FoodSection />
            <WhyChooseUs />
          </>
        }/>
        
        {/* <Route path="/dashboard" element={<Dashboard/>}></Route> */}
        <Route path="login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
