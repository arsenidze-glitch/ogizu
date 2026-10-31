"use client";

import useSWR from "swr";

export function useFavorites() {
  const { data = [], mutate } = useSWR<string[]>(
    "mesto-preview-favorites",
    null,
    {
      fallbackData: [],
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const toggle = (id: string) =>
    mutate(
      (current = []) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id],
      { revalidate: false },
    );
  return { favorites: data, toggle };
}
