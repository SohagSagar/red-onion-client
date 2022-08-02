import FoodSection from "./Components/Home/FoodSection";
import Home from "./Components/Home/Home";
import WhyChooseUs from "./Components/Home/WhyChooseUs";
import Footer from "./Components/SharedComponents/Footer";
import Navbar from "./Components/SharedComponents/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./Components/Dashboard/UserDashboard/Dashboard";
import FoodDetails from "./Components/FoodDetails";
import UserSidebarMenu from "./Components/Dashboard/UserDashboard/UserSidebarMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./Firebase/Firebase";
import MyOrders from "./Components/Dashboard/UserDashboard/MyOrders";
import AddReview from "./Components/Dashboard/UserDashboard/AddReview";
import MyReviews from "./Components/Dashboard/UserDashboard/MyReviews";
import AddComplain from "./Components/Dashboard/UserDashboard/AddComplain";
import UpdatePassword from "./Components/Dashboard/UserDashboard/UpdatePassword";
import AdminSidebarMenu from "./Components/Dashboard/AdminDashboard/AdminSidebarMenu";
import AdminDashboard from "./Components/Dashboard/AdminDashboard/AdminDashboard";
import AllOrders from "./Components/Dashboard/AdminDashboard/AllOrders";
import AllUsers from "./Components/Dashboard/AdminDashboard/AllUsers";
import PendingOrders from "./Components/Dashboard/AdminDashboard/PendingOrders";
import ConfirmedOrders from "./Components/Dashboard/AdminDashboard/ConfirmedOrders";
import AddFoods from "./Components/Dashboard/AdminDashboard/AddFoods";
import UserReviews from "./Components/Dashboard/AdminDashboard/UserReviews";
import UserComplains from "./Components/Dashboard/AdminDashboard/UserComplains";
import AllFoods from "./Components/Dashboard/AdminDashboard/AllFoods";



function App() {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="text-accent ">
      <Navbar />

      <Routes>
        <Route path={"/"} element={
          <>
            <Home />
            {/* <FoodDetails/> */}
            <FoodSection />
            <WhyChooseUs />
          </>
        } />


        {
          !user ? 
          <Route path="/dashboard" element={<AdminSidebarMenu />} >
          <Route index element={<AdminDashboard />} />
          <Route path="/dashboard/all-orders" element={<AllOrders />} />
          <Route path="/dashboard/all-users" element={<AllUsers />} />
          <Route path="/dashboard/pending-orders" element={<PendingOrders />} />
          <Route path="/dashboard/confirmed-orders" element={<ConfirmedOrders />} />
          <Route path="/dashboard/add-foods" element={<AddFoods />} />
          <Route path="/dashboard/all-foods" element={<AllFoods />} />
          <Route path="/dashboard/user-reviews" element={<UserReviews />} />
          <Route path="/dashboard/user-complains" element={<UserComplains />} />
          <Route path="/dashboard/update-password" element={<UpdatePassword />} />
          
        </Route>
        :
        <Route path="/dashboard" element={<UserSidebarMenu />} >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/my-orders" element={<MyOrders />} />
          <Route path="/dashboard/add-review" element={<AddReview />} />
          <Route path="/dashboard/my-review" element={<MyReviews />} />
          <Route path="/dashboard/add-complain" element={<AddComplain />} />
          <Route path="/dashboard/update-password" element={<UpdatePassword />} />
          
        </Route>
        }
        

        <Route path="login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<> not found</>} />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
