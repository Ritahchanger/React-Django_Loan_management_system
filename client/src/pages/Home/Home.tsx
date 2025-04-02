import Hero from "../../components/Hero/Hero"
import Navbar from "../../components/Navbar/Navbar"
import Advantages from "../../components/Advantages/Advantages"
import LoanCategories from "../../components/LoanCaetories/LoanCategories"
import Investors from "../../components/Investors/Investors"
import Footer from "../../components/Footer/Footer"
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Advantages/>
        <LoanCategories/>
        <Investors/>
        <Footer/>
    </div>
  )
}

export default Home