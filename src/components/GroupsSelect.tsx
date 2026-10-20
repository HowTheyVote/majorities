import "./GroupsSelect.css";

const GROUPS = [
  { value: "GUE_NGL", label: "The Left" },
  { value: "GREEN", label: "Greens/EFA" },
  { value: "SD", label: "S&D" },
  { value: "RENEW", label: "Renew" },
  { value: "EPP", label: "EPP" },
  { value: "ECR", label: "ECR" },
  { value: "PFE", label: "PfE" },
  { value: "ESN", label: "ESN" },
];

type GroupsSelectProps = {
  selected?: Array<string>;
  onChange?: (value: Array<string>) => void;
};

function GroupsSelect({ selected, onChange }: GroupsSelectProps) {
  return (
    <form
      className="groups-select"
      onChange={(event) => {
        const data = new FormData(event.currentTarget);
        onChange?.(data.getAll("groups") as Array<string>);
      }}
    >
      {GROUPS.map(({ value, label }) => (
        <label key={value} className="groups-select__group">
          <input
            type="checkbox"
            name="groups"
            value={value}
            checked={selected?.includes(value)}
          />
          {label}
        </label>
      ))}

      <button
        className="groups-select__reset"
        type="button"
        onClick={() => onChange?.([])}
      >
        Reset
      </button>
    </form>
  );
}

export default GroupsSelect;
