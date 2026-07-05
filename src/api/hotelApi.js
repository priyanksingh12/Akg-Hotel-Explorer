import axios from 'axios';

const BASE_URL = 'https://demohotelsapi.pythonanywhere.com';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});


export async function fetchHotels() {
  const { data } = await client.get('/hotels/');
  if (!data || !Array.isArray(data.data)) {
    throw new Error('Unexpected response shape from hotels API');
  }
  return data.data;
}


export function findHotelById(hotels, id) {
  return hotels.find((h) => String(h.id) === String(id));
}

export default client;
