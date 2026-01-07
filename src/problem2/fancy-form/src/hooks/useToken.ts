import { useState, useEffect } from 'react';
import type { Token, PriceData } from '../types';

const PRICES_API_URL = import.meta.env.VITE_TOKEN_PRICES_API_URL;
const ICON_BASE_URL = import.meta.env.VITE_TOKEN_ICON_BASE_URL;

export function useTokens() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(PRICES_API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PriceData[] = await response.json();
        const processedTokens: Token[] = data
          ?.filter(token => token.price)
          ?.map(token => ({
            currency: token.currency,
            price: token.price,
            iconUrl: `${ICON_BASE_URL}${token.currency}.svg`,
          }));

        processedTokens.sort((a, b) => a.currency.localeCompare(b.currency));
        await new Promise(resolve => setTimeout(resolve, 1000)); // delay to show loading spin 
        setTokens(processedTokens);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, isLoading, error };
}