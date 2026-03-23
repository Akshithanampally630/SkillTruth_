// import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/ResultPage.css";

// function ResultPage() {

//   const location = useLocation();
//   const navigate = useNavigate();

//   const { result } = location.state || {};

//   if (!result) {
//     return <h2>No result found</h2>;
//   }

//   const percentage = ((result.score / result.total) * 100).toFixed(2);

//   return (

//     <div className="result-container">

//       <h1>Test Result</h1>

//       <div className="result-card">

//         <h2>Score: {result.score} / {result.total}</h2>

//         <p>Correct Answers: {result.correct}</p>

//         <p>Wrong Answers: {result.wrong}</p>

//         <p>Percentage: {percentage}%</p>

//         <button
//           onClick={() =>
//           navigate("/wrong-answers", {
//             state: { wrongQuestions: result.wrongQuestions }
//           })
//         }
//         >
//         View Your Wrong Answers
//         </button>

//       </div>

//     </div>

//   );

// }

// export default ResultPage;
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";

function ResultPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const { result } = location.state || {};

  if (!result) {
    return <h2>No result found</h2>;
  }

  const percentage = ((result.score / result.total) * 100).toFixed(2);

  return (

    <div className="result-container">

      <h1>Test Result</h1>

      {/* Progress bar value passed here */}
      <div
        className="result-card"
        style={{ "--progress": `${percentage}%` }}
      >

        <h2>
          Score: {result.score} / {result.total}
        </h2>

        <p>Correct Answers: {result.correct}</p>

        <p>Wrong Answers: {result.wrong}</p>

        <p>Percentage: {percentage}%</p>

        <div className="button-group">
  <button
    onClick={() =>
      navigate("/wrong-answers", {
        state: { wrongQuestions: result.wrongQuestions }
      })
    }
  >
    View Your Wrong Answers
  </button>

  <button
    onClick={() =>
      navigate("/dashboard", {
        state: { wrongQuestions: result.wrongQuestions }
      })
    }
  >
    Dashboard
  </button>

  <button
    onClick={() =>
      navigate("/home", {
        state: { wrongQuestions: result.wrongQuestions }
      })
    }
  >
    Home
  </button>
</div>

      </div>

    </div>

  );

}

export default ResultPage;