import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCuratedSettlements, loadAllSettlements } from '../lib/settlements';
import type { City } from '../types/domain';

export type SettlementStatus = 'idle' | 'loading' | 'ready' | 'offline';

export interface SettlementCatalogState {
  places: City[];
  status: SettlementStatus;
  error: string | null;
  sourceTimestamp?: string;
  refresh: () => void;
}

export function useSettlementCatalog(active = true): SettlementCatalogState {
  const curated = useMemo(() => getCuratedSettlements(), []);
  const [places, setPlaces] = useState<City[]>(curated);
  const [status, setStatus] = useState<SettlementStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [sourceTimestamp, setSourceTimestamp] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState(0);

  const refresh = useCallback(() => setRefreshToken((value) => value + 1), []);

  useEffect(() => {
    if (!active) return;
    const controller = new AbortController();
    setStatus('loading');
    setError(null);

    loadAllSettlements({ force: refreshToken > 0, signal: controller.signal })
      .then((result) => {
        setPlaces(result.places);
        setSourceTimestamp(result.sourceTimestamp);
        setStatus('ready');
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setPlaces(curated);
        setStatus('offline');
        setError(reason instanceof Error ? reason.message : 'Unable to load live settlement data');
      });

    return () => controller.abort();
  }, [active, curated, refreshToken]);

  return { places, status, error, sourceTimestamp, refresh };
}
