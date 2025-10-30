import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { WeatherService } from '../services/weatherService';
import { WeatherReport } from '../types';

describe('WeatherService', () => {
  let mock: MockAdapter;
  let weatherService: WeatherService;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    weatherService = new WeatherService();
  });

  afterEach(() => {
    mock.restore();
  });

  it('deve retornar a previsão do tempo para uma cidade válida', async () => {
    const city = 'Brasilia';
    const mockData: WeatherReport = {
      current_condition: [
        {
          temp_C: '25',
          FeelsLikeC: '28',
          weatherDesc: [{ value: 'Ensolarado' }],
        },
      ],
      nearest_area: [
        {
          areaName: [{ value: 'Brasilia' }],
          region: [{ value: 'Distrito Federal' }],
          country: [{ value: 'Brasil' }],
        },
      ],
    };

    mock.onGet(`https://wttr.in/${city}?format=j1`).reply(200, mockData);

    const result = await weatherService.getWeather(city);
    expect(result).toEqual(mockData);
  });

  it('deve lançar um erro para uma cidade inválida', async () => {
    const city = 'CidadeInexistente';
    mock.onGet(`https://wttr.in/${city}?format=j1`).reply(404);

    await expect(weatherService.getWeather(city)).rejects.toThrow(
      `A cidade '${city}' não foi encontrada. Verifique o nome e tente novamente.`
    );
  });
});
