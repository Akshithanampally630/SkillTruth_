// const db = require("../config/db");
// exports.startTest = (req, res) => {

//   let { subject, difficulty, numQuestions } = req.body;
//   numQuestions = Number(numQuestions);
//   // normalize difficulty
//   difficulty =
//     difficulty.charAt(0).toUpperCase() +
//     difficulty.slice(1).toLowerCase();

//   const sql = `
//   SELECT q_no, question, code_snippet, question_type ,option1, option2, option3, option4
//   FROM questions
//   WHERE subject = ? AND difficulty_level = ?
//   ORDER BY RAND()
//   LIMIT ?
//   `;

//   db.query(sql, [subject, difficulty, numQuestions], (err, result) => {

//     if (err) {
//       console.log("START TEST ERROR:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     res.json(result);

//   });

// };
// exports.submitTest = (req, res) => {

//   const { userId, skill, difficulty, answers } = req.body;

//   if (!answers || answers.length === 0) {
//     return res.status(400).json({ error: "No answers submitted" });
//   }

//   const qnos = answers.map(a => a.q_no);

//   const sql = `
//   SELECT q_no, correct_option
//   FROM questions
//   WHERE q_no IN (?)
//   `;

//   db.query(sql, [qnos], (err, result) => {

//     if (err) {
//       console.log("SELECT ERROR:", err);
//       return res.status(500).json(err);
//     }

//     let score = 0;
//     let correct = 0;

//     const answerMap = {};

//     result.forEach(q => {
//       answerMap[q.q_no] = q.correct_option;
//     });

//     const wrongQuestions = [];

//   answers.forEach(a => {

//   const correctOption = answerMap[a.q_no];

//   if (a.selected && a.selected === correctOption) {
//     score++;
//     correct++;
//   } else {

//     wrongQuestions.push({
//       q_no: a.q_no,
//       selected: a.selected,
//       correct: correctOption
//     });

//   }

// });
//   const wrongQnos = wrongQuestions.map(q => q.q_no);

// const wrongSql = `
// SELECT q_no, question, code_snippet, option1, option2, option3, option4, correct_option, explanation
// FROM questions
// WHERE q_no IN (?)
// `;
// db.query(wrongSql, [wrongQnos], (err3, wrongResult) => {

//   const finalWrong = wrongResult.map(q => {

//     const user = wrongQuestions.find(w => w.q_no === q.q_no);

//     return {
//       ...q,
//       selected_option: user?.selected
//     };

//   });

//   res.json({
//     score,
//     correct,
//     wrong,
//     total,
//     accuracy,
//     category,
//     wrongQuestions: finalWrong
//   });

// });

//     const total = answers.length;
//     const wrong = total - correct;

//     const accuracy = Number(((correct / total) * 100).toFixed(2));

//     let category = "";

//     if (accuracy >= 90) category = "Excellent";
//     else if (accuracy >= 70) category = "Good";
//     else if (accuracy >= 50) category = "Average";
//     else category = "Needs Work";

//     const insertQuery = `
//     INSERT INTO tests 
//     (user_id, skill, difficulty, total_questions, correct_answers, wrong_answers, score, accuracy, result_category)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.query(
//       insertQuery,
//       [
//         userId,
//         skill,
//         difficulty,
//         total,
//         correct,
//         wrong,
//         score,
//         accuracy,
//         category
//       ],
//       (err2) => {

//         if (err2) {
//           console.log("INSERT ERROR:", err2);
//           return res.status(500).json(err2);
//         }

//         res.json({
//           score,
//           correct,
//           wrong,
//           total,
//           accuracy,
//           category
//         });

//       }
//     );

//   });

// };

const db = require("../config/db");

// ✅ START TEST
exports.startTest = (req, res) => {
  let { subject, difficulty, numQuestions } = req.body;
  numQuestions = Number(numQuestions);

  // normalize difficulty
  difficulty =
    difficulty.charAt(0).toUpperCase() +
    difficulty.slice(1).toLowerCase();

  const sql = `
    SELECT q_no, question, code_snippet, question_type,
           option1, option2, option3, option4
    FROM questions
    WHERE subject = ? AND difficulty_level = ?
    ORDER BY RAND()
    LIMIT ?
  `;

  db.query(sql, [subject, difficulty, numQuestions], (err, result) => {
    if (err) {
      console.log("START TEST ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(result); // ✅ always return
  });
};

// ✅ SUBMIT TEST
exports.submitTest = (req, res) => {
  const { userId, skill, difficulty, answers } = req.body;

  if (!answers || answers.length === 0) {
    return res.status(400).json({ error: "No answers submitted" });
  }

  const qnos = answers.map(a => a.q_no);

  const sql = `
    SELECT q_no, correct_option
    FROM questions
    WHERE q_no IN (?)
  `;

  db.query(sql, [qnos], (err, result) => {
    if (err) {
      console.log("SELECT ERROR:", err);
      return res.status(500).json(err);
    }

    let score = 0;
    let correct = 0;

    const answerMap = {};
    result.forEach(q => {
      answerMap[q.q_no] = q.correct_option;
    });

    const wrongQuestions = [];

    answers.forEach(a => {
      const correctOption = answerMap[a.q_no];

      if (a.selected && a.selected === correctOption) {
        score++;
        correct++;
      } else {
        wrongQuestions.push({
          q_no: a.q_no,
          selected: a.selected,
          correct: correctOption
        });
      }
    });

    const total = answers.length;
    const wrong = total - correct;
    const accuracy = Number(((correct / total) * 100).toFixed(2));

    let category = "";
    if (accuracy >= 90) category = "Excellent";
    else if (accuracy >= 70) category = "Good";
    else if (accuracy >= 50) category = "Average";
    else category = "Needs Work";

    const wrongQnos = wrongQuestions.map(q => q.q_no);

    const wrongSql = `
      SELECT q_no, question, code_snippet,
             option1, option2, option3, option4,
             correct_option, explanation
      FROM questions
      WHERE q_no IN (?)
    `;

    db.query(wrongSql, [wrongQnos], (err3, wrongResult) => {
      if (err3) {
        return res.status(500).json(err3);
      }

      const finalWrong = wrongResult.map(q => {
        const user = wrongQuestions.find(w => w.q_no === q.q_no);
        return {
          ...q,
          selected_option: user?.selected
        };
      });

      // ✅ INSERT TEST RESULT
      const insertQuery = `
        INSERT INTO tests 
        (user_id, skill, difficulty, total_questions,
         correct_answers, wrong_answers, score, accuracy, result_category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [
          userId,
          skill,
          difficulty,
          total,
          correct,
          wrong,
          score,
          accuracy,
          category
        ],
        (err2) => {
          if (err2) {
            console.log("INSERT ERROR:", err2);
            return res.status(500).json(err2);
          }

          // ✅ FINAL SINGLE RESPONSE
          return res.json({
            score,
            correct,
            wrong,
            total,
            accuracy,
            category,
            wrongQuestions: finalWrong
          });
        }
      );
    });
  });
};