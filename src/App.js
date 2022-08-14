import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./Firebase/Firebase";
import { useState } from "react";
import RequireAuth from "./Components/SharedComponents/RequireAuth";
import Page404 from "./Components/SharedComponents/Page404";
import Loading from "./Components/SharedComponents/Loading";
import useAdmin from "./Components/Hooks/useAdmin";


// home page components
const Home = lazy(() => import("./Components/Home/Home"));
const FoodSection = lazy(() => import("./Components/Home/FoodSection"));
const FoodDetails = lazy(() => import("./Components/FoodDetails"));
const Checkout = lazy(() => import("./Components/Checkout/Checkout"));
const WhyChooseUs = lazy(() => import("./Components/Home/WhyChooseUs"));
const Testimonials = lazy(() => import("./Components/Home/Testimonials"));


//login/registration components
const Login = lazy(() => import("./Components/Login/Login"));
const Signup = lazy(() => import("./Components/Login/Signup"));

//admin dashboard components
const AdminSidebarMenu = lazy(() => import("./Components/Dashboard/AdminDashboard/AdminSidebarMenu"));
const AdminDashboard = lazy(() => import("./Components/Dashboard/AdminDashboard/AdminDashboard"));
const AllOrders = lazy(() => import("./Components/Dashboard/AdminDashboard/AllOrders"));
const GetAllUser = lazy(() => import("./Components/Dashboard/AdminDashboard/GetAllUser"));
const AddFoods = lazy(() => import("./Components/Dashboard/AdminDashboard/AddFoods"));
const AllFoods = lazy(() => import("./Components/Dashboard/AdminDashboard/AllFoods"));
const UserReviews = lazy(() => import("./Components/Dashboard/AdminDashboard/UserReviews"));
const UserComplains = lazy(() => import("./Components/Dashboard/AdminDashboard/UserComplains"));


//user dashboard components
const UserSidebarMenu = lazy(() => import("./Components/Dashboard/UserDashboard/UserSidebarMenu"));
const Dashboard = lazy(() => import("./Components/Dashboard/UserDashboard/Dashboard"));
const MyOrders = lazy(() => import("./Components/Dashboard/UserDashboard/MyOrders"));
const MyOrderDetails = lazy(() => import("./Components/Dashboard/UserDashboard/MyOrderDetails"));
const AddReview = lazy(() => import("./Components/Dashboard/UserDashboard/AddReview"));
const MyReviews = lazy(() => import("./Components/Dashboard/UserDashboard/MyReviews"));
const AddComplain = lazy(() => import("./Components/Dashboard/UserDashboard/AddComplain"));

//shared components
const Navbar = lazy(() => import("./Components/SharedComponents/Navbar"));
const Footer = lazy(() => import("./Components/SharedComponents/Footer"));
const UpdatePassword = lazy(() => import("./Components/Dashboard/UserDashboard/UpdatePassword"));



function App() {
  const [user] = useAuthState(auth);
  const [cartItems, setCardItems] = useState([]);
  const [refreshCart, setRefreshCart] = useState(false)
  const [searchText, setSearchText] = useState('');

  const isAdmin = useAdmin(user);

  // http://localhost:5000/
  // http://localhost:5000

  return (
    <div className="text-accent ">
      <Suspense fallback={<Loading />}>
        <Navbar cartItems={cartItems} setCardItems={setCardItems} refreshCart={refreshCart} setRefreshCart={setRefreshCart} />
      </Suspense>

      {/* //public routes */}
      <Suspense fallback={<Loading />}>
        <Routes>

          <Route path={"/"} element={
            <>

              <Home setSearchText={setSearchText} />
              <FoodSection searchText={searchText} />
              <WhyChooseUs />
              <Testimonials />

            </>
          } />

          <Route path="/food-details/:id" element={<FoodDetails cartItems={cartItems} setCardItems={setCardItems} refreshCart={refreshCart} setRefreshCart={setRefreshCart} />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>

          {/* //Protected routes */}
          <Route path="/checkout" element={<RequireAuth><Checkout cartItems={cartItems} setRefreshCart={setRefreshCart} refreshCart={refreshCart} /></RequireAuth>}></Route>
          {
            isAdmin ?

              <Route path="/dashboard" element={<RequireAuth><AdminSidebarMenu /></RequireAuth>} >
                <Route index element={<AdminDashboard />} />
                <Route path="/dashboard/all-orders" element={<AllOrders />} />
                <Route path="/dashboard/all-users" element={<GetAllUser />} />
                <Route path="/dashboard/add-foods" element={<AddFoods />} />
                <Route path="/dashboard/all-foods" element={<AllFoods />} />
                <Route path="/dashboard/user-reviews" element={<UserReviews />} />
                <Route path="/dashboard/user-complains" element={<UserComplains />} />
                <Route path="/dashboard/update-password" element={<UpdatePassword />} />
              </Route>

              : user &&

              <Route path="/dashboard" element={<RequireAuth><UserSidebarMenu /></RequireAuth>}>
                <Route index element={<Dashboard />} />
                <Route path="/dashboard/my-orders" element={<MyOrders />} />
                <Route path="/dashboard/my-order-details/:id" element={<MyOrderDetails />} />
                <Route path="/dashboard/add-review" element={<AddReview />} />
                <Route path="/dashboard/my-review" element={<MyReviews />} />
                <Route path="/dashboard/add-complain" element={<AddComplain />} />
                <Route path="/dashboard/update-password" element={<UpdatePassword />} />
              </Route>

          }
          <Route path="*" element={<Page404 />} />

        </Routes>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>

      <Toaster />
    </div >
  );
}

export default App;
