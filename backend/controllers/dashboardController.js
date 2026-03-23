const db = require("../config/db");

exports.getDashboard = (req, res) => {

  const userId = req.params.userId;

  const queries = {

    totalTests: `
      SELECT COUNT(*) AS total
      FROM tests
      WHERE user_id = ?
    `,

    avgAccuracy: `
      SELECT ROUND(AVG(accuracy),2) AS avg
      FROM tests
      WHERE user_id = ?
    `,

    bestPerformance: `
      SELECT MAX(accuracy) AS best
      FROM tests
      WHERE user_id = ?
    `,

    worstPerformance: `
      SELECT MIN(accuracy) AS worst
      FROM tests
      WHERE user_id = ?
    `,

    progress: `
      SELECT DATE(taken_at) AS date, accuracy
      FROM tests
      WHERE user_id = ?
      ORDER BY taken_at
    `,

    skillPerformance: `
      SELECT skill, ROUND(AVG(accuracy),2) AS accuracy
      FROM tests
      WHERE user_id = ?
      GROUP BY skill
    `,

    categoryDistribution: `
      SELECT result_category, COUNT(*) AS count
      FROM tests
      WHERE user_id = ?
      GROUP BY result_category
    `,

    difficultyAnalysis: `
      SELECT difficulty, ROUND(AVG(accuracy),2) AS accuracy
      FROM tests
      WHERE user_id = ?
      GROUP BY difficulty
    `,

    last7Tests: `
      SELECT accuracy
      FROM tests
      WHERE user_id = ?
      ORDER BY taken_at DESC
      LIMIT 7
    `,

    consistencyStreak: `
      SELECT COUNT(*) AS streak
      FROM tests
      WHERE user_id = ?
      AND accuracy >= 70
    `

  };

  const results = {};
  const keys = Object.keys(queries);
  let completed = 0;

  keys.forEach(key => {

    db.query(queries[key], [userId], (err, data) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      results[key] = data;
      completed++;

      if (completed === keys.length) {
        res.json(results);
      }

    });

  });

};