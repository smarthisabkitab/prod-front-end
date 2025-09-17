const Shimmer = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default Shimmer;
