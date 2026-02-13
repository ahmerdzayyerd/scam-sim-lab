const Watermark = () => {
  const rows = Array.from({ length: 12 });

  return (
    <div className="watermark-overlay" aria-hidden="true">
      <div className="flex flex-col gap-20">
        {rows.map((_, i) => (
          <div key={i} className="watermark-text">
            {"CRYPTO LAB   •   ".repeat(6)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watermark;
