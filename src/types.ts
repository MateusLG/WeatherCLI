// src/types.ts

// Vamos focar apenas nos dados que queremos exibir
// A API retorna muito mais coisa!

interface CurrentCondition {
  FeelsLikeC: string;
  temp_C: string;
  weatherDesc: { value: string }[];
}

interface NearestArea {
  areaName: { value: string }[];
  country: { value: string }[];
  region: { value: string }[];
}

// Esta é a interface principal da resposta
export interface WeatherReport {
  current_condition: CurrentCondition[];
  nearest_area: NearestArea[];
}
