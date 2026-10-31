import { useCallback, useEffect, useState } from "react";

type TrackerUrlState = {
  groups: Array<string>;
  includeOnlyMain: boolean;
};

type TrackerUrlStateActions = {
  setGroups: (groups: Array<string>) => void;
  setIncludeOnlyMain: (includeOnlyMain: boolean) => void;
};

export function useTrackerUrlState(): TrackerUrlState & TrackerUrlStateActions {
  const [state, setState] = useState<TrackerUrlState>(() => {
    const params = new URLSearchParams(window.location.search);

    return {
      groups: params.getAll("groups"),
      includeOnlyMain: params.get("only_main") !== "false",
    };
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("groups");

    for (const group of state.groups) {
      url.searchParams.append("groups", group);
    }

    if (state.includeOnlyMain) {
      url.searchParams.delete("only_main");
    } else {
      url.searchParams.set("only_main", "false");
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, [state]);

  const setGroups = useCallback((groups: Array<string>) => {
    setState((current) => ({ ...current, groups }));
  }, []);

  const setIncludeOnlyMain = useCallback((includeOnlyMain: boolean) => {
    setState((current) => ({ ...current, includeOnlyMain }));
  }, []);

  return { ...state, setGroups, setIncludeOnlyMain };
}
