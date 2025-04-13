import { useSelector } from "react-redux";


import { RootState } from "../store/redux/Store";

export const baseUrl = `http://localhost:8000/api/`;

const useAuthHeaders = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return {
    Authorization: `Token ${token}`,
  };
};

export  { useAuthHeaders };
