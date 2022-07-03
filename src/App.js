import FoodSection from "./Components/Home/FoodSection";
import Home from "./Components/Home/Home";
import WhyChooseUs from "./Components/Home/WhyChooseUs";
import Footer from "./Components/SharedComponents/Footer";
import Navbar from "./Components/SharedComponents/Navbar";



function App() {
  return (
    <div className="text-accent ">
      <Navbar/> 
      <Home/>
      <FoodSection/>
      <WhyChooseUs/>
      <Footer/>
    </div>
  );
}

export default App;
