import "./GroupsSelect.css";
import "./VotetypeSelect.css";

type VotetypeSelectProps = {
  selected?: boolean;
  onChange?: (value: boolean) => void;
};

function VotetypeSelect({ selected, onChange }: VotetypeSelectProps) {
  return (
    <div className="votetype-select">
      <label className="groups-select__group">
        <input
          type="checkbox"
          name="only_main"
          checked={selected}
          onChange={(event) => onChange?.(event.currentTarget.checked)}
        />
        Only include final votes
      </label>
    </div>
  );
}

export default VotetypeSelect;
