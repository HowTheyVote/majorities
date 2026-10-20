type GroupsSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{ value: string; label: string }>;
};

function GroupsSelect({ value, onChange, options }: GroupsSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange?.(event.currentTarget.value)}
    >
      <option value="">Select…</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default GroupsSelect;
