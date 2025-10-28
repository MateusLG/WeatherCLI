import axios from 'axios';
import inquirer from 'inquirer';
import { WeatherReport } from './types';

class WeatherService {
  private baseUrl: string = 'https://wttr.in';

  // A função é assíncrona e retorna uma Promise com nosso tipo
  public async getWeather(city: string): Promise<WeatherReport> {
    try {
      const url = `${this.baseUrl}/${city}?format=j1`;
      const { data } = await axios.get<WeatherReport>(url);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao buscar previsão do tempo:", error.message);
      } else {
        console.error("Ocorreu um erro desconhecido:", error);
      }
      throw new Error("Não foi possível encontrar a cidade.");
    }
  }
}

// --- Funções de Exibição ---
function displayWeather(report: WeatherReport): void {
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

// --- Loop Principal ---
async function main() {
  const weatherService = new WeatherService();
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'city',
      message: 'Para qual cidade você quer a previsão do tempo? (Ex: Brasilia, Paris, Tokyo)'
    }
  ]);

  if (!answers.city) {
    console.log("Nenhuma cidade fornecida. Saindo.");
    return;
  }

  try {
    console.log(`Buscando dados para ${answers.city}...`);
    const report = await weatherService.getWeather(answers.city);
    displayWeather(report);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Ocorreu um erro inesperado", error);
    }
  }
}

main();
