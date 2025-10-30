import axios from 'axios';
import { WeatherReport } from '../types';

export class WeatherService {
  private baseUrl: string = 'https://wttr.in';

  public async getWeather(city: string): Promise<WeatherReport> {
    try {
      const url = `${this.baseUrl}/${city}?format=j1`;
      const { data } = await axios.get<WeatherReport>(url);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          throw new Error(`A cidade '${city}' não foi encontrada. Verifique o nome e tente novamente.`);
        }
        throw new Error(`Erro de rede ao buscar previsão do tempo: ${error.message}`);
      }
      throw new Error('Ocorreu um erro desconhecido ao buscar a previsão do tempo.');
    }
  }
}
