import { useState, useCallback } from 'react';

export const useAsync = (asyncFunction, immediate = true) => {
  const [state, setState] = useState({
    loading: immediate,
    data: null,
    error: null,
  });

  const execute = useCallback(async (...args) => {
    setState({ loading: true, data: null, error: null });
    try {
      const response = await asyncFunction(...args);
      setState({ loading: false, data: response, error: null });
      return response;
    } catch (error) {
      setState({ loading: false, data: null, error });
      throw error;
    }
  }, [asyncFunction]);

  return { ...state, execute };
};
