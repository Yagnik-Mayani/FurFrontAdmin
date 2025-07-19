import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import SideNavbar from './Components/SideNavbar';
import Navbar from './Components/TopNavbar/navbar';
import AddCategory from './Components/Category/addcategory';
import ViewCategory from './Components/Category/viewcategory';
import AddProduct from './Components/Product/addproduct';
import AddOffer from './Components/Offer/addoffer';
import ViewOffer from './Components/Offer/viewoffer';
import OrderList from './Components/Order/vieworder';
import ViewProduct from './Components/Product/viewproduct';
import Settings from './Components/Profile/setting';
import Dashboard from './Components/Dashboard/dashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔐 Track login state

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <Router>
  <div className={`min-h-screen flex transition-colors duration-300 ${darkMode
    ? 'bg-black text-white'
    : 'bg-gradient-to-br from-[#fefce8] via-[#e0f2fe] to-[#fce7f3] text-black'
    }`}>
    {isLoggedIn ? (
      <>
        <aside className="sticky top-0 h-screen">
          <SideNavbar darkMode={darkMode} />
        </aside>
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-50">
            <Navbar darkMode={darkMode} toggleTheme={toggleTheme} setIsLoggedIn={setIsLoggedIn} />
          </header>
          <main className="p-5 overflow-y-auto flex-1">
            <Routes>
              <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
              <Route path="/setting" element={<Settings darkMode={darkMode} />} />
              <Route path="/add-category" element={<AddCategory darkMode={darkMode} />} />
              <Route path="/view-category" element={<ViewCategory darkMode={darkMode} />} />
              <Route path="/add-product" element={<AddProduct darkMode={darkMode} />} />
              <Route path="/view-product" element={<ViewProduct darkMode={darkMode} />} />
              <Route path="/add-offer" element={<AddOffer darkMode={darkMode} />} />
              <Route path="/view-offer" element={<ViewOffer darkMode={darkMode} />} />
              <Route path="/orders" element={<OrderList darkMode={darkMode} />} />
            </Routes>
          </main>
        </div>
      </>
    ) : (
      <div className="flex flex-col items-center justify-start w-full min-h-screen">
        <Navbar
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          setIsLoggedIn={setIsLoggedIn}
          forceLogin={true}
        />
      </div>
    )}
  </div>
</Router>

  );
}

export default App;
