import { useEffect, useState } from "react";

// https://github.com/WebDevSimplified/useful-custom-react-hooks/tree/main/src/10-useFetch

const DEFAULT_OPTIONS: RequestInit = {
  headers: { "Content-Type": "application/json" },
};

export default function useFetch(
  url: string,
  options: RequestInit = {},
  dependencies: any[] = []
) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url, { ...DEFAULT_OPTIONS, ...options })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLoading, error };
}
