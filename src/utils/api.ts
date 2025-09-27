import axios, { AxiosError } from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchData = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching data: ${(error as AxiosError).message}`);
    }
    throw new Error(`Unknown error occurred`);
  }
};
