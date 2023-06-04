import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config";

const fetchUsers = (endpoint, query) => {
  const [dataUser, setDataUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `${API_URL}users${endpoint}`,
    params: { ...query },
  };
  

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      
      setDataUser(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { dataUser, isLoading, error, refetch };
};

export default fetchUsers;