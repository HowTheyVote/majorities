import useSWR from "swr";

export type Vote = {
  id: number;
  display_title: string;
  timestamp: string;
  description?: string;
};

export type VotesResponse = {
  results: Array<Vote>;
};

export function useVotes() {
  return useAPI<VotesResponse>("votes");
}

function useAPI<Data>(endpoint: string) {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  url.searchParams.append("facets", "month");

  const fetcher = async () => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  };

  return useSWR<Data>(url.toString(), fetcher, { suspense: true });
}
