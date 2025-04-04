import Hero from "../../components/Hero/Hero"
import Navbar from "../../components/Navbar/Navbar"
import Advantages from "../../components/Advantages/Advantages"
import LoanCategories from "../../components/LoanCaetories/LoanCategories"
import Investors from "../../components/Investors/Investors"
import Footer from "../../components/Footer/Footer"
import Testmonials from "../../components/Testmonials/Testmonials"
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Advantages/>
        <LoanCategories/>
        <Testmonials/>
        <Investors/>
        <Footer/>
    </div>
  )
}

export default Home