import axios from "./axios";

export const addOperation = (newData : any) => {
  return axios.post("/users", newData);
};
export const editOperation = (newData: any, id: number) => {
  return axios.put(`/users/${id}`, newData);
};
export const editStatus = (newData: any, id: number) => {
  return axios.put(`/users/active/${id}`, newData);
};
export const deleteOperation = (id: number) => {
  return axios.put(
    `/users/${id}`,
    { data: { active: false } }
  );
};
export const fetchClass = async () => {
  const response = await axios.get('/class');
  return response.data.data;
};
export const fetchCourse = async () => {
  const response = await axios.get('/course');
  return response.data.data;
};