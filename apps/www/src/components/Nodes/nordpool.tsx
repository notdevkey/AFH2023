import {
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { Handle, Position } from "reactflow";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

export interface Prices {
  start: Date;
  end: Date;
  updated: Date;
  currency: string;
  areas: Areas;
}

export interface Areas {
  LV: LV;
}

export interface LV {
  values: Value[];
  Min: number;
  Max: number;
  Average: number;
  Peak: number;
  "Off-peak 1": number;
  "Off-peak 2": number;
}

export interface Value {
  start: Date;
  end: Date;
  value: number;
}

type HourlyPrice = {
  date: string;
  price: number;
};

export function NordpoolNode() {
  const [socketUrl] = useState("ws://localhost:8000/ws");
  const [data, setData] = useState<HourlyPrice[]>([]);

  const chartData = useMemo(
    () => ({
      labels: data.map((data) => data.date),
      datasets: [
        {
          label: "Electricity price",
          data: data.map((data) => data.price),
          backgroundColor: ["#0083FF"],
          borderColor: "#0083FF",
          borderWidth: 1,
        },
      ],
    }),
    [data]
  );

  const { lastJsonMessage, readyState } = useWebSocket<Prices>(socketUrl);
  console.log(lastJsonMessage, "LAST");

  useEffect(() => {
    if (lastJsonMessage?.areas) {
      console.log(lastJsonMessage, "MESSAGE");
      const lvValues = lastJsonMessage.areas.LV.values;

      // Transforming the LV values into the required format for react-charts
      const dataForChart = lvValues.map(({ start, value }) => {
        const date = new Date(start); // Create a Date object from the string

        const formattedDateTime = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }); // Format the date string

        return {
          date: formattedDateTime,
          price: value,
        };
      });

      setData(dataForChart);
    }
  }, [lastJsonMessage, setData]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <>
      <div className="p-3 text-xs bg-white border border-black rounded">
        <div className="flex items-center justify-between mb-3">
          <h1>Electricity price EUR/MWh</h1>
          <h6
            className={`p-1 px-3 text-[10px] uppercase rounded-full font-bold w-fit ${
              connectionStatus === "Connecting" &&
              "bg-yellow-50 text-yellow-300"
            } ${connectionStatus === "Open" && "bg-green-50 text-green-400"} ${
              connectionStatus === "Closed" && "bg-red-50 text-red-400"
            }`}
          >
            {connectionStatus}
          </h6>
        </div>
        <Line
          className="text-[2px]"
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Electricity price",
              },
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
