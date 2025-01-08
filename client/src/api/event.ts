import axios from "./axios";


export const fetchEventsByClass = async (idClass : any) => {
  const response = await axios.get(`/event/class/${idClass}`);
  return response.data.data;
};
export const fetchClass = async () => {
    const response = await axios.get('/class');
    return response.data.data;
  };