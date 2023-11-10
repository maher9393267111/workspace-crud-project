import axios from "axios";

import { useEffect, useState } from "react";


export function useProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [works, setWorks] = useState([]);



  async function fetchWorks() {
    // get item detail
    const { data } = await axios.get(`/api/work`);
    console.log(data?.data);
    if (data) setWorks(data?.data);
  }



  useEffect(() => {
    fetchWorks()
  }, []);


  return {
 works, 
 fetchWorks,

    isLoading,
  };
}
