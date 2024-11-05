import React, { useEffect, useRef, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
  ChartData,
  PluginChartOptions,
  Plugin,
} from "chart.js";

ChartJS.register(ArcElement, Legend, Title);

export default function CreditScoreChart({ score }: { score: number }) {
  const [CTX, setCTX] = useState<CanvasRenderingContext2D | null>(null);
  const [gradientSegment, setGradientSegment] = useState<any>(null);
  const chartBox = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState<number>(0);

  useEffect(() => {
    if (chartBox.current) {
      // Get the width of the element
      const width = chartBox.current.getBoundingClientRect().width - 46;
      setChartWidth(width);
    }
  }, []); // The empty dependency array makes this run on mount

  useEffect(() => {
    if (!CTX || !chartBox.current) return;
    const gradient = CTX.createLinearGradient(0, 0, chartWidth, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.7, "yellow");
    gradient.addColorStop(1, "green");
    setGradientSegment(gradient);
  }, [CTX]);

  const data: ChartData<"doughnut"> = {
    labels: ["M", "T", "W", "T"],

    datasets: [
      {
        label: "# of Votes",
        data: [850],
        backgroundColor: [gradientSegment],
        borderRadius: 0,
        rotation: 270,
        circumference: 180,
        cutout: "80%",
      },
    ],
  };
  const gaugeChartText: Plugin<"doughnut"> = {
    id: "gaugeChartText",
    afterDatasetsDraw(chart, args, options, cancelable) {
      const {
        ctx,
        data,
        chartArea: { top, bottom, left, right, width, height },
        scales: { r },
      } = chart;
      setCTX(ctx);
      ctx.save();
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;

      function textLabel(
        text: any,
        x: any,
        y: any,
        fontSize: any,
        textBaseline: any,
        textAlign: any,
        fontColor: any
      ) {
        ctx.font = `${fontSize}px Inter`;
        ctx.fillStyle = fontColor;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillText(text, x, y);
      }

      textLabel("300", left + 42, yCoor - 15, 16, "top", "left", "#666");
      textLabel("850", right - 42, yCoor - 15, 16, "top", "right", "#666");
      textLabel("580", xCoor, top - 5, 16, "bottom", "center", "#666");
      textLabel(score, xCoor, yCoor + 10, 50, "bottom", "center", "black");
    },
  };
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 25, // Add padding from the top
      },
    },
    plugins: {
      legend: {
        position: "top",
        display: false,
      },

      tooltip: {
        enabled: false,
      },
    },
  };
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "170px",
        }}
        ref={chartBox}
        className="BAR chartBox"
      >
        <Doughnut data={data} options={options} plugins={[gaugeChartText]} />{" "}
      </div>
    </div>
  );
}
