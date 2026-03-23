// import { useNavigate, useLocation } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const active = location.pathname;

//   return (
//     <div className="home-container">

//       <div className="nav-bar">
//         <h2 className="logo">SkillTruth</h2>

//         <div className="tabs">
//           <button
//             className={active === "/dashboard" ? "tab active" : "tab"}
//             onClick={() => navigate("/dashboard")}
//           >
//             Dashboard
//           </button>

//           <button
//             className={active === "/testsetup" ? "tab active" : "tab"}
//             onClick={() => navigate("/testsetup")}
//           >
//             Test
//           </button>
//         </div>
//       </div>

//       <div className="content">
//         <h1>Welcome 🚀</h1>
//         <p>Select a tab above to continue.</p>
//       </div>

//     </div>
//   );
// }

// export default Home;
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";
import "./Login.jsx"; // Ensure Login component is imported for logout functionality
function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname;

  const handleLogout = () => {
  localStorage.removeItem("userId");   // 🔥 clear login
  navigate("/", { replace: true });
};

  return (
    <div className="home-container">

      <div className="nav-bar">
        <h2 className="logo">SkillTruth</h2>

        <div className="tabs">

          <button
            className={active === "/dashboard" ? "tab active" : "tab"}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className={active === "/testsetup" ? "tab active" : "tab"}
            onClick={() => navigate("/testsetup")}
          >
            Test
          </button>

          {/* LOGOUT BUTTON */}

          <button
            className="tab logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>

      <div className="content">
        <h1>Welcome 🚀</h1>
        <p>Select a tab above to continue.</p>
      </div>

    </div>
  );
}

export default Home;