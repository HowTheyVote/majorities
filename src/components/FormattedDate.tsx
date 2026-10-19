type FormattedDateProps = {
  timestamp: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function FormattedDate({ timestamp }: FormattedDateProps) {
  return dateFormatter.format(new Date(timestamp));
}

export default FormattedDate;
