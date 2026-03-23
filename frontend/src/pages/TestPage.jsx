import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/TestPage.css";

function TestPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("User not logged in");
    navigate("/");
  }

  const { questions, subject, difficulty, totalTime } = location.state || {};

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(totalTime || 0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 🚫 No questions case
  if (!questions || questions.length === 0) {
    return <h2>No test loaded</h2>;
  }
  useEffect(() => {
  if (isSubmitted) {
    navigate("/home", { replace: true });
  }
}, [isSubmitted, navigate]);

  // ✅ TIMER LOGIC
  useEffect(() => {

    if (isSubmitted) return;

    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft, isSubmitted]);

  // ✅ FORMAT TIMER
  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // ✅ SELECT OPTION
  const selectOption = (option) => {
    setAnswers({
      ...answers,
      [current]: option
    });
  };

  // ✅ NEXT
  const saveNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  // ✅ CLEAR
  const clearSelection = () => {
    const updated = { ...answers };
    delete updated[current];
    setAnswers(updated);
  };

  // ✅ MAIN SUBMIT
  const submitTest = async () => {

    if (isSubmitted) return;
    setIsSubmitted(true);

    try {

      const formatted = questions.map((q, index) => ({
        q_no: q.q_no,
        selected: answers[index] || null
      }));

      const res = await axios.post(
        "http://localhost:5000/api/test/submit",
        {
          userId: userId,
          skill: subject,
          difficulty: difficulty,
          answers: formatted
        }
      );

      navigate("/result", {
    state: { result: res.data },
    replace: true
    });

    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  // ⏳ AUTO SUBMIT
  const handleAutoSubmit = async () => {

    if (isSubmitted) return;

    alert("⏳ Time's up! Auto submitting...");
    await submitTest();
  };

  const q = questions[current];

  return (
    <div className="container">

      {/* Sidebar */}
      <div className="sidebar">
        {questions.map((_, i) => (
          <div
            key={i}
            className={answers[i] ? "box answered" : "box"}
            onClick={() => setCurrent(i)}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Question Area */}
      <div className="question-area">

        {/* ⏳ TIMER */}
        <div className="timer">
          ⏳ Time Left: {formatTime()}
        </div>

        <h3>Question {current + 1}</h3>

        <p>{q.question}</p>

        {/* CODE BLOCK */}
        {q.question_type?.toLowerCase() === "code_output" && q.code_snippet && (
          <pre className="code-block">
            <code>{q.code_snippet.replace(/\\n/g, "\n")}</code>
          </pre>
        )}

        {/* OPTIONS */}
        {[1, 2, 3, 4].map(opt => (
          <label key={opt} className="option">
            <input
              type="radio"
              name="option"
              checked={answers[current] === opt}
              onChange={() => selectOption(opt)}
              disabled={isSubmitted}
            />
            {q["option" + opt]}
          </label>
        ))}

        {/* BUTTONS */}
        <div className="buttons">

          <button onClick={clearSelection} disabled={isSubmitted}>
            Clear Selection
          </button>

          {current === questions.length - 1 ? (
            <button onClick={submitTest} disabled={isSubmitted}>
              Submit Test
            </button>
          ) : (
            <button onClick={saveNext}>
              Save & Next
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default TestPage;