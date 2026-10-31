import { GROUPS } from "../lib/groups";

import "./Select.css";
import "./GroupsSelect.css";

type GroupsSelectProps = {
  selected?: Array<string>;
  onChange?: (value: Array<string>) => void;
};

function GroupsSelect({ selected, onChange }: GroupsSelectProps) {
  return (
    <form
      className="select groups-select"
      onChange={(event) => {
        const data = new FormData(event.currentTarget);
        onChange?.(data.getAll("groups") as Array<string>);
      }}
    >
      {GROUPS.map(({ code, short_label }) => (
        <label key={code} className="select__control">
          <input
            type="checkbox"
            name="groups"
            value={code}
            checked={selected?.includes(code)}
          />
          {short_label}
        </label>
      ))}

      <button
        className="select__control groups-select__reset"
        type="button"
        onClick={() => onChange?.([])}
      >
        Reset
      </button>
    </form>
  );
}

export default GroupsSelect;
