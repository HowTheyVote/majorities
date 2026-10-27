import useSWR from "swr";
import { immutable } from "swr/immutable";
import useSWRInfinite from "swr/infinite";

export type Group = {
  code: string;
  label: string;
  short_label: string;
};

export type VoteStats = {
  FOR: number;
  AGAINST: number;
  ABSTENTION: number;
  DID_NOT_VOTE: number;
};

export type BaseVote = {
  id: number;
  display_title: string;
  timestamp: string;
  description?: string;
  reference?: string;
};

export type Vote = BaseVote & {
  is_main: boolean;
  stats: {
    by_group: Array<{
      group: Group;
      stats: VoteStats;
    }>;
  };
};

export type Facet = {
  value: string;
  label: string;
  count: number;
};

export type VotesResponse = {
  results: Array<BaseVote>;
  total: number;
  facets: Record<"month" | "groups_required_for_majority", Array<Facet>>;
  has_next: boolean;
  has_prev: boolean;
};

type VotesOptions = {
  page?: number;
  pageSize?: number;
  includeOnlyMain?: boolean;
  facets?: Array<string>;
  filters?: Record<string, Array<string>>;
};

function voteUrl(id: string | number) {
  return `${API_BASE_URL}/votes/${id}`;
}

function votesUrl({
  page = 1,
  pageSize = 10,
  includeOnlyMain = true,
  facets = [],
  filters = {},
}: VotesOptions) {
  const params = new URLSearchParams();
  params.set("page", page.toString());
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

  const url = new URL(`${API_BASE_URL}/votes`);
  url.search = params.toString();
  return url.toString();
}

async function fetcher(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export function useVote(id: string | number) {
  return useSWR<Vote>(voteUrl(id), fetcher, {
    use: [immutable],
  });
}

export function useVotes(options: VotesOptions) {
  return useSWR<VotesResponse>(votesUrl(options), fetcher, {
    suspense: true,
    use: [immutable],
  });
}

export function useVotesInfinite(options: Omit<VotesOptions, "page">) {
  return useSWRInfinite<VotesResponse>(
    (index, previousPage) =>
      previousPage?.has_next === false
        ? null
        : votesUrl({ ...options, page: index + 1 }),
    fetcher,
    {
      suspense: true,
      use: [immutable],
      revalidateFirstPage: false,
    },
  );
}
