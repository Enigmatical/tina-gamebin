import { useState, useEffect } from "react";

interface ExternalInfo {
  id: string;
  dateReleased?: string;
  averagePlaytime?: number;
  averageRating?: number;
  summary?: string;
  learnMoreLink?: string;
  genre?: string;
}

export const useExternalInfo = (id: string) => {
  const [info, setInfo] = useState<ExternalInfo | undefined>(undefined);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch(`/api/game/${id}`);
      const info = await response.json();

      setInfo(info);
    };

    if (id) {
      fetchInfo();
    }
  }, [id]);

  return info;
};
