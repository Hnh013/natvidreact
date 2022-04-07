import "./App.css";
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { Home } from "./frontend/templates/pages";
import { Navbar , Footer } from "./frontend/templates/components";

function App() {
  return (
    <div className="video-grid-container">
      <BrowserRouter>   
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
