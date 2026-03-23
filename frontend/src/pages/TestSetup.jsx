// import { useState } from "react";
// import "../styles/TestSetup.css";

// function TestSetup() {

//   const [form, setForm] = useState({
//     subject: "",
//     difficulty: "",
//     questions: 25
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const startTest = () => {

//     if (!form.subject || !form.difficulty) {
//       alert("Please select subject and difficulty");
//       return;
//     }

//     if (form.questions < 25 || form.questions > 45) {
//       alert("Number of questions must be between 25 and 45");
//       return;
//     }

//     alert("Test Starting...");
//   };

//   return (
//     <div className="testsetup-page">

//       <div className="testsetup-card">

//         <h2>Create Test</h2>

//         <div className="input-group">
//           <label>Subject</label>

//           <select name="subject" value={form.subject} onChange={handleChange}>

//             <option value="">Select Subject</option>

//             <option value="Objected Oriented Programming">
//               Objected Oriented Programming
//             </option>

//             <option value="Operating Systems">
//               Operating Systems
//             </option>

//             <option value="Computer Networks">
//               Computer Networks
//             </option>

//             <option value="DBMS">
//               DBMS
//             </option>

//             <option value="Html">
//               Html
//             </option>

//             <option value="Programming">
//               Programming
//             </option>

//             <option value="CSS">
//               CSS
//             </option>

//             <option value="JavaScript">
//               JavaScript
//             </option>

//             <option value="System Design">
//               System Design
//             </option>

//           </select>

//         </div>

//         <div className="input-group">

//           <label>Difficulty</label>

//           <select name="difficulty" value={form.difficulty} onChange={handleChange}>

//             <option value="">Select Difficulty</option>

//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>

//           </select>

//         </div>

//         <div className="input-group">

//           <label>Number of Questions (25 - 45)</label>

//           <input
//             type="number"
//             name="questions"
//             min="25"
//             max="45"
//             value={form.questions}
//             onChange={handleChange}
//           />

//         </div>

//         <button className="start-btn" onClick={startTest}>
//           Start Test
//         </button>

//       </div>

//     </div>
//   );
// }

// export default TestSetup;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/TestSetup.css";

function TestSetup() {

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  if (!userId) {
  alert("User not logged in");
  navigate("/");
  }
  const [form, setForm] = useState({
    subject: "",
    difficulty: "",
    questions: 25
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // ✅ TIMER LOGIC
  const getTimePerQuestion = (difficulty) => {
    if (difficulty === "Easy") return 45;
    if (difficulty === "Medium") return 60;
    if (difficulty === "Hard") return 90;
    return 60;
  };
  const startTest = async () => {

    if (!form.subject || !form.difficulty) {
      alert("Please select subject and difficulty");
      return;
    }

    if (form.questions < 25 || form.questions > 45) {
      alert("Number of questions must be between 25 and 45");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/test/start",
        {
          subject: form.subject,
          difficulty: form.difficulty,
          numQuestions: form.questions
        }
      );

      const questions = response.data;

       // ✅ CALCULATE TIME
      const timePerQuestion = getTimePerQuestion(form.difficulty);
      const totalTime = form.questions * timePerQuestion;

      navigate("/test", {
        state: {
          questions,
          subject: form.subject,
          difficulty: form.difficulty,
          totalQuestions: form.questions,
          totalTime   // 🔥 important
        }
      });

    } catch (error) {

      console.error(error);
      alert("Error starting test");

    }

  };

  return (
    <div className="testsetup-page">

      <div className="testsetup-card">

        <h2>Create Test</h2>

        <div className="input-group">

          <label>Subject</label>

          <select name="subject" value={form.subject} onChange={handleChange}>

            <option value="">Select Subject</option>

            <option value="Objected Oriented Programming">
              Objected Oriented Programming
            </option>

            <option value="Operating Systems">
              Operating Systems
            </option>

            <option value="Computer Networks">
              Computer Networks
            </option>

            <option value="DBMS">
              DBMS
            </option>

            <option value="Html">
              Html
            </option>

            <option value="Programming">
              Programming
            </option>

            <option value="CSS">
              CSS
            </option>

            <option value="JavaScript">
              JavaScript
            </option>

            <option value="System Design">
              System Design
            </option>

          </select>

        </div>

        <div className="input-group">

          <label>Difficulty</label>

          <select name="difficulty" value={form.difficulty} onChange={handleChange}>

            <option value="">Select Difficulty</option>

            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>

          </select>

        </div>

        <div className="input-group">

          <label>Number of Questions (25 - 45)</label>

          <input
            type="number"
            name="questions"
            min="25"
            max="45"
            value={form.questions}
            onChange={handleChange}
          />

        </div>

        <button className="start-btn" onClick={startTest}>
          Start Test
        </button>

      </div>

    </div>
  );
}

export default TestSetup;