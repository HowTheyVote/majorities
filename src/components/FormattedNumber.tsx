type FormattedNumberProps = {
  number: number;
};

const numberFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: true,
  maximumFractionDigits: 20,
});

function FormattedNumber({ number }: FormattedNumberProps) {
  return numberFormatter.format(number);
}

export default FormattedNumber;
