import { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import './index.css';
import { Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IoIosArrowUp } from "react-icons/io";
import routes from "./utils/Routes/Route";

import Header from './Global-Components/Header/Header';
import Footer from './Global-Components/Footer/Footer';
import Shopvia from './UI/Components/ShopViaBanner/Shopvia';

import { ToastContainer, Zoom } from "react-toastify";
import DynamicMetaTags from "./Global-Components/Helmet/Helmet";
import { useSEOContext } from "./context/SEOcontext/SEOcontext";
import { useGlobalContext } from "./context/GlobalContext/globalContext";
import Loader from "./UI/Components/Loader/Loader";
import WarrantyModal from "./UI/Modals/warrantyModal";
import Snowfall from "react-snowfall";

function App() {
  const [currentUrl, setCurrentUrl] = useState('/');
  const location = useLocation();
  const checkPage = window.location.pathname; // Get the current path
  const checkoutPage = /^\/order-confirmation\/[a-zA-Z0-9]+$/.test(checkPage);
  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);


  const {
    title,
    description,
    image,
  } = useSEOContext();

  const {
    mainLoader,
    isWarrantyModalOpen,
  } = useGlobalContext();

  const [isVisible, setIsVisible] = useState(false);

  const handleClickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="main_body">
      <ToastContainer
        style={{ zIndex: 99999 }}
        position="top-center"
        transition={Zoom}
        autoClose={1000}
      />
      <Header checkoutPage={checkoutPage} />
      <Shopvia />
        {/* <ScrollRestoration /> */}
      <Routes>
          {routes}
      </Routes>
      <Footer checkoutPage={checkoutPage} notLandingPage={currentUrl === '/' ? false : true} />
      <button onClick={handleClickTop} className={`scroll-to-top-button ${isVisible ? 'show-scrollTop' : ''}`}>
        <IoIosArrowUp size={30} className='lead-to-top-btn' />
      </button>
      <DynamicMetaTags title={title} description={description} image={image} url={""} />
      {mainLoader && <Loader />}
      {isWarrantyModalOpen && <WarrantyModal />}
      {/* <Snowfall /> */}
    </div>
  );
}

export default App;
