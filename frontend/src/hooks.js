import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (isLoading) {
      fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .then((response) => {setIsLoading(false); return response})
      .catch((error) => {console.log(error); setIsError(true)})
    }
  }, [isLoading])

  return [isLoading, isError, setIsLoading, data]
}
