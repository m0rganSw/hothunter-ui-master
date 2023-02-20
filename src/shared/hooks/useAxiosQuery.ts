import { useCallback, useEffect, useState } from 'react';

export const useAxiosQuery = <T>(fetchFoo: (params?: any) => Promise<T>, params?: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();

  const request = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchFoo(params);
      setData(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  }, [fetchFoo, params]);

  useEffect(() => {
    request();
  }, [request]);
  return { isLoading, error, request, data };
};
