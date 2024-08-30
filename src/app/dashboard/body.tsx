"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const DashboardBody = () => {
  const [weatherData, setWeatherData] = useState({});
  const searchParams = useSearchParams();
  const localityId = searchParams.get("localityId");

  const fetchWeatherData = async () => {
    const sd = await fetch(
      `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`,
      {
        headers: {
          "X-Zomato-Api-Key": "292b5091dce9e22b7b42e1c6cbc5e190",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data));
  };

  useEffect(() => {
    fetchWeatherData();
    // console.log(process.env.Zomato_Api_Key);
  }, []);

  return (
    <Suspense>
      <div>
        <div>dashboard - {localityId}</div>
      </div>
    </Suspense>
  );
};

export default DashboardBody;
