import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";

function App() {
  return (
    <Router>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Shop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
