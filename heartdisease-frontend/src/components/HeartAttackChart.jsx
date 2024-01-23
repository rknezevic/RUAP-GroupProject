import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const HeartAttackChart = ({ heartAttackPredict }) => {
  const canvasRef = useRef(null);
  const [heartRiskGroup, setHeartRiskGroup] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (heartAttackPredict < 0.1) {
      setHeartRiskGroup(0);
    } else if (heartAttackPredict < 0.2) {
      setHeartRiskGroup(1);
    } else if (heartAttackPredict < 0.3) {
      setHeartRiskGroup(2);
    } else {
      setHeartRiskGroup(3);
    }
    let myChart;

    const dataValues = [
      heartAttackPredict * 100,
      (1 - heartAttackPredict) * 100,
    ];

    myChart = new Chart(context, {
      type: "pie",
      data: {
        labels: [
          "Chance of getting heart disease",
          "Chance of not getting heart disease",
        ],
        datasets: [
          {
            data: dataValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.4)",
              "rgba(75, 192, 192, 0.4)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
            borderWidth: 3,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
            position: "bottom",
            labels: {
              font: {
                size: 16,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                var labelIndex = context.dataIndex;
                var dataValue = context.dataset.data[labelIndex];
                var total = context.dataset.data.reduce((a, b) => a + b, 0);
                var percentage = ((dataValue / total) * 100).toFixed(2) + "%";
                return `${percentage}`;
              },
            },
          },
        },
        animation: false,
      },
    });

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [heartAttackPredict]);

  return (
    <>
      <div className="">
        {heartRiskGroup === 0 && (
          <p
            style={{
              fontSize: "1.1em",
              marginLeft: "-15%",
              marginRight: "-15%",
              textAlign: "center",
            }}
          >
            <strong>Congratulations!</strong> <br></br>Your calculated{" "}
            <strong>risk of heart disease</strong> is <strong>below 10%</strong>
            . Keep up the healthy lifestyle, including regular exercise and a
            balanced diet. Remember to schedule regular check-ups to maintain
            your heart health.
          </p>
        )}
        {heartRiskGroup === 1 && (
          <p
            style={{
              fontSize: "1.1em",
              marginLeft: "-15%",
              marginRight: "-15%",
              textAlign: "center",
            }}
          >
            Your calculated risk falls within the{" "}
            <strong>moderate range 10% to 20%</strong>. <br></br>
            It's a good time to reassess your lifestyle. Consider incorporating
            more physical activity, adopting heart-healthy eating habits, and
            staying vigilant about regular health check-ups.
          </p>
        )}
        {heartRiskGroup === 2 && (
          <p
            style={{
              fontSize: "1.1em",
              marginLeft: "-15%",
              marginRight: "-15%",
              textAlign: "center",
            }}
          >
            Your calculated risk is in the{" "}
            <strong>elevated range (20% to 30%)</strong>.<br></br>It's crucial
            to take proactive steps now. Focus on lifestyle changes, such as
            regular exercise, a heart-healthy diet, and stress management.
            Consult with a healthcare professional to create a personalized
            plan.
          </p>
        )}
        {heartRiskGroup === 3 && (
          <p
            style={{
              fontSize: "1.1em",
              marginLeft: "-15%",
              marginRight: "-15%",
              textAlign: "center",
            }}
          >
            <strong>Your calculated risk is above 30%</strong>.<br></br> It
            indicates a high risk of heart disease. It's urgent to prioritize
            your heart health. Consult with a healthcare professional
            immediately. Lifestyle changes, medication, and regular monitoring
            may be necessary for effective risk reduction.
          </p>
        )}
        <canvas ref={canvasRef} width="300" height="300"></canvas>
      </div>
    </>
  );
};

export default HeartAttackChart;
