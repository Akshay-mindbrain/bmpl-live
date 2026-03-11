import { useState, useEffect } from 'react';

interface FetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

export const useFetch = <T>(url: string, options?: RequestInit): FetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
};
