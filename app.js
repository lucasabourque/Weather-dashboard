const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API Key

async function loadWeather() {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=Yarmouth,ca&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=43.837&lon=-66.120&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;

  // Load current weather
  try {
    const res = await fetch(currentUrl);
    const data = await res.json();
    const condition = data.weather[0]?.description ?? "N/A";
    const temp = data.main?.temp ?? "N/A";

    document.getElementById('current-weather').innerHTML = `
      <p><strong>Condition:</strong> ${condition}</p>
      <p><strong>Temperature:</strong> ${temp}°C</p>
    `;

  // Load forecast
  try {
    const res = await fetch(forecastUrl);
    const data = await res.json();
    const days = data.daily.slice(0, 7); // Get the 7-day forecast

    let html = '';
    days.forEach(day => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      const condition = day.weather[0]?.description ?? "N/A";
      const tempMax = day.temp?.max ?? "N/A";
      const tempMin = day.temp?.min ?? "N/A";

      html += `
        <div>
          <strong>${date}</strong>: ${condition} | ${tempMax}°C / ${tempMin}°C
        </div>
      `;
    });

    document.getElementById('forecast').innerHTML = html;

}

loadWeather();
