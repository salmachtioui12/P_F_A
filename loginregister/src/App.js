import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
 
import Home from "./Home";
import Dashboard from "./Dashboard";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";


function App() {
  return (
    <div>

      <BrowserRouter>
            <Routes>
              <Route path="/home" element= { <Home/>} />
              <Route path="/register" element= { <Register/>} />
              <Route path="/login" element= { <Login/>} />
              <Route path="/dashboard" element= { <Dashboard/>} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forget-password" element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
      
    </div>
    
  );
}

export default App;