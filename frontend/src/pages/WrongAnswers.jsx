// import { useLocation } from "react-router-dom";
// import "../styles/WrongAnswers.css";
// function WrongAnswers() {

//  const { state } = useLocation();
//  const { wrongQuestions } = state || {};

//  if (!wrongQuestions || wrongQuestions.length === 0) {
//    return <h2>No wrong answers 🎉</h2>;
//  }

//  return (

//   <div className="review-container">

//    {wrongQuestions.map((q, index) => (

//     <div key={q.q_no} className="review-question">

//       <h3>Question {index + 1}</h3>

//       <p>{q.question}</p>

//       {q.code_snippet && (
//         <pre className="code-block">
//          <code>{q.code_snippet}</code>
//         </pre>
//       )}

//       <p>A. {q.option1}</p>
//       <p>B. {q.option2}</p>
//       <p>C. {q.option3}</p>
//       <p>D. {q.option4}</p>

//       <p><b>Your Answer:</b> {q.selected_option}</p>

//       <p><b>Correct Answer:</b> {q.correct_option}</p>

//       <p><b>Explanation:</b> {q.explanation}</p>

//     </div>

//    ))}

//   </div>

//  );

// }

// export default WrongAnswers;
import { useLocation } from "react-router-dom";
import "../styles/WrongAnswers.css";

function WrongAnswers() {

  const { state } = useLocation();
  const { wrongQuestions } = state || {};

  if (!wrongQuestions || wrongQuestions.length === 0) {
    return <h2 className="no-wrong">No wrong answers 🎉</h2>;
  }

  const optionLetter = ["A","B","C","D"];

  return (

    <div className="review-container">

      {wrongQuestions.map((q, index) => (

        <div key={q.q_no} className="review-question">

          <h3>Question {index + 1}</h3>

          <p className="question-text">{q.question}</p>

          {q.code_snippet && (
            <pre className="code-block">
              <code>{q.code_snippet.replace(/\\n/g,"\n")}</code>
            </pre>
          )}

          <div className="options">

            {[1,2,3,4].map((opt,i)=>{

              let className="option";

              if(opt===q.correct_option){
                className+=" correct";
              }

              if(opt===q.selected_option && opt!==q.correct_option){
                className+=" wrong";
              }

              return(

                <div key={opt} className={className}>
                  <span className="option-letter">{optionLetter[i]}</span>
                  <span>{q["option"+opt]}</span>
                </div>

              )

            })}

          </div>

          <div className="explanation">
            <b>Explanation</b>
            <p>{q.explanation}</p>
          </div>

        </div>

      ))}

    </div>

  );

}

export default WrongAnswers;