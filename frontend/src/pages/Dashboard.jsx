import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import "../styles/Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
function Dashboard() {

  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {

    
  if (!userId) {
    navigate("/", { replace: true });
  }

    axios
      .get(`http://localhost:5000/api/dashboard/${userId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Dashboard error:", err);
      });

  }, [userId, navigate]);

  if (!data) return <h2>Loading Dashboard...</h2>;

  const weakSkills = data.skillPerformance.filter((s) => s.accuracy < 60);
  const strongSkills = data.skillPerformance.filter((s) => s.accuracy >= 80);

  const sortedProgress = [...data.progress].sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);

const progressChart = {
  labels: sortedProgress.map((p) => {
    const d = new Date(p.date);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }); // e.g. "17 Mar"
  }),
  datasets: [
    {
      label: "Accuracy %",
      data: sortedProgress.map((p) => Number(p.accuracy)),
      borderColor: "#3b82f6",
      tension: 0.4,
    },
  ],
};

  const skillChart = {
    labels: data.skillPerformance.map((s) => s.skill),
    datasets: [
      {
        label: "Skill Accuracy",
        data: data.skillPerformance.map((s) => s.accuracy),
        backgroundColor: "#8b5cf6",
      },
    ],
  };

  const difficultyChart = {
    labels: data.difficultyAnalysis.map((d) => d.difficulty),
    datasets: [
      {
        label: "Accuracy %",
        data: data.difficultyAnalysis.map((d) => d.accuracy),
        backgroundColor: "#f59e0b",
      },
    ],
  };

  const categoryData = {
    labels: data.categoryDistribution.map((c) => c.result_category),
    datasets: [
      {
        data: data.categoryDistribution.map((c) => c.count),
        backgroundColor: ["#22c55e", "#3b82f6", "#facc15", "#ef4444"],
      },
    ],
  };

  const last7Chart = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
    datasets: [
      {
        label: "Accuracy",
        data: data.last7Tests.map((t) => t.accuracy),
        backgroundColor: "#10b981",
      },
    ],
  };

  return (
    <div className="dashboard">

      <div className="dashboard-header">
  <h1>Welcome Back 👋</h1>

  <button
    className="home-btn"
    onClick={() => navigate("/home")}
  >
    Home
  </button>
</div>

      {/* STATS */}

      <div className="stats">

        <div className="card">
          <h3>Total Tests</h3>
          <p>{data.totalTests[0].total}</p>
        </div>

        <div className="card">
          <h3>Average Accuracy</h3>
          <p>{data.avgAccuracy[0].avg}%</p>
        </div>

        <div className="card">
          <h3>Best Performance</h3>
          <p>{data.bestPerformance[0].best}%</p>
        </div>

        <div className="card">
          <h3>Consistency Streak</h3>
          <p>{data.consistencyStreak[0].streak}</p>
        </div>

      </div>

      {/* CHARTS */}

      <div className="charts">

        <div className="chartCard">
          <h3>Progress Over Time</h3>
          <Line data={progressChart} />
        </div>

        <div className="chartCard">
          <h3>Last 7 Tests</h3>
          <Bar data={last7Chart} />
        </div>

        <div className="chartCard">
          <h3>Skill Performance</h3>
          <Bar data={skillChart} />
        </div>

        <div className="chartCard">
          <h3>Difficulty Analysis</h3>
          <Bar data={difficultyChart} />
        </div>

        <div className="chartCard">
          <h3>Result Distribution</h3>
          <Pie data={categoryData} />
        </div>

      </div>

      {/* WEAK / STRONG SKILLS */}

      <div className="skills">

        <div className="skillBox">
          <h3>Skills to Improve</h3>
          {weakSkills.length === 0 ? (
            <p>No weak skills 🎉</p>
          ) : (
            weakSkills.map((s) => (
              <p key={s.skill}>
                {s.skill} - {s.accuracy}%
              </p>
            ))
          )}
        </div>

        <div className="skillBox">
          <h3>Strong Skills</h3>
          {strongSkills.length === 0 ? (
            <p>No strong skills yet</p>
          ) : (
            strongSkills.map((s) => (
              <p key={s.skill}>
                {s.skill} - {s.accuracy}%
              </p>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

export default Dashboard;