import "./App.css";
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { Home , Signup , Login , Videos , History } from "./frontend/templates/pages";
import { Navbar , Footer } from "./frontend/templates/components";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer
      position="top-left"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <div className="video-grid-container">
      <BrowserRouter>   
        <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/videos" element={<Videos/>}/>
              <Route path="/history" element={<History/>}/>
            </Routes>
        <Footer/>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
