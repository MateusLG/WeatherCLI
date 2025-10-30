import inquirer from 'inquirer';
import { WeatherService } from './services/weatherService';
import { displayWeather } from './utils/display';

async function main() {
  const weatherService = new WeatherService();
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'city',
      message: 'Para qual cidade você quer a previsão do tempo? (Ex: Brasilia, Paris, Tokyo)',
      validate: (value: string) => {
        if (value.trim().length > 0) {
          return true;
        }
        return 'Por favor, digite o nome de uma cidade.';
      }
    }
  ]);

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
