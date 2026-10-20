import useSWR from "swr";

export type Vote = {
  id: number;
  display_title: string;
  timestamp: string;
  description?: string;
};

export type Facet = {
  value: string;
  label: string;
  count: number;
};

export type VotesResponse = {
  results: Array<Vote>;
  facets: Record<"month" | "groups_required_for_majority", Array<Facet>>;
};

export function useVotes({
  pageSize = 20,
  includeOnlyMain = true,
  facets = [],
  filters = {},
}: {
  pageSize?: number;
  includeOnlyMain?: boolean;
  facets?: Array<string>;
  filters?: Record<string, Array<string>>;
}) {
  const params = new URLSearchParams();
  params.set("page_size", pageSize.toString());
  params.set("include_only_main", includeOnlyMain.toString());

  for (const facet of facets) {
    params.append("facets", facet);
  }

  for (const [key, values] of Object.entries(filters)) {
    for (const value of values) {
      params.append(key, value);
    }
  }

  return useAPI<VotesResponse>("votes", params);
}

function useAPI<Data>(endpoint: string, params: URLSearchParams) {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  url.search = params.toString();

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
