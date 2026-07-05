import { useEffect, useState, useCallback } from 'react';
import { fetchHotels } from '../api/hotelApi';

/**
 * Fetches the hotel list once and exposes { hotels, loading, error, reload }.
 * Kept as a small standalone hook (rather than baked into a page) so both
 * the listing page and the detail page can share the same cached data.
 */
let cache = null;

export function useHotels() {
  const [hotels, setHotels] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHotels();
      cache = data;
      setHotels(data);
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching hotels.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!cache) {
      load();
    }
  }, [load]);

  return { hotels, loading, error, reload: load };
}
