import { WeatherReport } from '../types';

export function displayWeather(report: WeatherReport): void {
  const city = report.nearest_area[0].areaName[0].value;
  const region = report.nearest_area[0].region[0].value;
  const country = report.nearest_area[0].country[0].value;

  const condition = report.current_condition[0];
  const temp = condition.temp_C;
  const feelsLike = condition.FeelsLikeC;
  const description = condition.weatherDesc[0].value;

  console.log("\n--- Previsão do Tempo ---");
  console.log(`Local: ${city}, ${region} - ${country}`);
  console.log(`Condição: ${description}`);
  console.log(`Temperatura: ${temp}°C`);
  console.log(`Sensação Térmica: ${feelsLike}°C`);
  console.log("-----------------------------\n");
}
