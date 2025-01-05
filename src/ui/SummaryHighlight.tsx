function SummaryHighlight({
  header,
  price,
  color,
}: {
  header: string;
  price: string;
  color: string;
}) {
  return (
    <div className="border-l-4  pl-4 space-y-1" style={{ borderColor: color }}>
      <p className="text-textPreset5 text-primaryGrey-500 font-normal">
        {header}
      </p>
      <p className="text-primaryGrey-900 text-textPreset4 font-bold">
        ${price}
      </p>
    </div>
  );
}

export default SummaryHighlight;
