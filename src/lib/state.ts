import { useEffect, useState } from "react";

export function useUrlState(
  param: string,
  values: Array<string>,
): [Array<string>, (value: Array<string>) => void] {
  const [state, setState] = useState<Array<string>>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has(param) ? params.getAll(param) : values;
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete(param);

    for (const value of state) {
      url.searchParams.append(param, value);
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, [param, state]);

  return [state, setState];
}
