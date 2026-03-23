// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//     </Routes>
//   );
// }

// export default App;

// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";


import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TestSetup from "./pages/TestSetup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import WrongAnswers from "./pages/WrongAnswers";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/testsetup" element={<TestSetup />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/wrong-answers" element={<WrongAnswers />} />
    </Routes>
  );
}

export default App;