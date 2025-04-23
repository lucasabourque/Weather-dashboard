async function loadWeather() {
  const proxy = 'https://api.allorigins.win/raw?url=';
  const currentUrl = proxy + encodeURIComponent('https://dd.weather.gc.ca/citypage_weather/xml/NS/s0000088_e.xml');
  const forecastUrl = proxy + encodeURIComponent('https://api.weather.gc.ca/collections/weather.forecasts/items?f=json&point=43.837,-66.120');

  // Load current weather
  try {
    const res = await fetch(currentUrl);
    const xml = await res.text();
    const doc = new DOMParser().parseFromString(xml, 'application/xml');

    const condition = doc.querySelector('currentConditions > condition')?.textContent ?? "N/A";
    const temp = doc.querySelector('currentConditions > temperature')?.textContent ?? "N/A";

    document.getElementById('current-weather').innerHTML += `
      <p><strong>Condition:</strong> ${condition}</p>
      <p><strong>Temperature:</strong> ${temp}°C</p>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById('current-weather').innerHTML = 'Error loading current weather.';
  }

  // Load forecast
  try {
    const res = await fetch(forecastUrl);
    const data = await res.json();
    const days = data.features.filter(d => d.properties.period.name.includes('Day')).slice(0, 7);

    let html = '';
    days.forEach(d => {
      html += `<div><strong>${d.properties.period.name}</strong>: ${d.properties.textSummary}</div>`;
    });

    document.getElementById('forecast').innerHTML += html;
  } catch (err) {
    console.error(err);
    document.getElementById('forecast').innerHTML = 'Error loading forecast.';
  }
}

loadWeather();
