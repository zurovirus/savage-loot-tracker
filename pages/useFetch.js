import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    if (router.isReady) {
      fetchData();
    }
  }, [url, router.isReady]);

  return { isLoading, data, id };
}
