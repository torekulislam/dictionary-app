import "./App.css";
import Hero from "./components/Hero";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="] dark:bg-[#222831] bg-[#FAF9EE min-h-screen ">
        <div className="w-full">
          {" "}
          <Hero />
        </div>
        <div className="max-w-4xl mx-auto">
          <MainSection />
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
