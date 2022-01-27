import axios from 'axios';
import mockData from './mock-data.json';

export const getWeatherData = async (lat: number, lng: number) => {
  try {
    if (lat && lng) {
      // const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
      //   params: { lat, lon: lng },
      //   headers: {
      //     'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY as string,
      //     'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      //   },
      // });

      const data = mockData;
      console.log('getWeatherData ---------------');
      console.log({ lat, lng });
      console.log({ data });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};