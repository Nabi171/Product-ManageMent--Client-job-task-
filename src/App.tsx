/* eslint-disable prettier/prettier */
import logo from "./logo.svg"
import Navbar from "../src/components/layouts/Navbar"
import Footer from "../src/components/pages/Footer"
import ProductTable from "./components/pages/Products/ProductTable"
// import "./App.css"

function App() {
  return (
    <div className="App">
      <Navbar />
      <ProductTable></ProductTable>
      <Footer />
    </div>
  )
}

export default App
