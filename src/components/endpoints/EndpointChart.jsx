import React, { useEffect } from "react";
import { fetchTraffic, selectAllTraffic } from "../traffic/TrafficSlice";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import Loader from "../loader/Loader";

const daysAgo = (today, target) => {
  return today >= target ? today - target : today + 7 - target;
};

export default function EndpointChart({ endpointId }) {
  const today = new Date(Date.now()).getDay();
  const dispatch = useDispatch();
  const trafficStatus = useSelector((state) => state.traffic.status);
  let requests = useSelector((state) => state.traffic.endpoints[endpointId]);

  useEffect(() => {
    if (trafficStatus === "idle") {
      dispatch(fetchTraffic());
    }
  }, [trafficStatus, dispatch]);

  if (trafficStatus === "done") {
    const successesPerDay = [0, 0, 0, 0, 0, 0, 0];
    const failuresPerDay = [0, 0, 0, 0, 0, 0, 0];
    requests = requests || [];

    const successes = requests
      .filter((req) => req.STATUS >= 200 && req.STATUS <= 299)
      .map((req) => daysAgo(today, new Date(req.TIME).getDay()));

    const failures = requests
      .filter((req) => req.STATUS > 299 || req.STATUS === "")
      .map((req) => daysAgo(today, new Date(req.TIME).getDay()));

    successes.forEach((req) => (successesPerDay[6 - req] += 1));
    failures.forEach((req) => (failuresPerDay[6 - req] += 1));

    //   .map((req) => {
    //     return { x: req.TIME, y: req.LATENCY };
    //   });

    //   .map((req) => {
    //     return { x: req.TIME, y: req.LATENCY };
    //   });

    const traffic = {
      labels: ["6", "5", "4", "3", "2", "1", "Today"],
      datasets: [
        {
          label: "Successes",
          fill: false,
          lineTension: 0.25,
          backgroundColor: "rgba(49, 196, 141)",
          borderColor: "rgba(49, 196, 141)",
          borderWidth: 2,
          data: successesPerDay,
        },
        {
          label: "Failures",
          fill: false,
          lineTension: 0.25,
          backgroundColor: "rgba(239,68,68)",
          borderColor: "rgba(239,68,68)",
          borderWidth: 2,
          data: failuresPerDay,
        },
      ],
    };

    return (
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Last 7 Days
        </h3>
        <Line
          data={traffic}
          options={{
            title: {
              display: true,
              text: "Requests per Day",
              fontSize: 20,
              fontStyle: "normal",
              fontColor: "rgba(17, 24, 39)",
            },
            legend: {
              display: true,
              position: "right",
            },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "# of Requsts",
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Days Ago",
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  } else {
    return <Loader />;
  }
}
