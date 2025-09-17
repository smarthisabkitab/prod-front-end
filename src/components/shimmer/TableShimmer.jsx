import Shimmer from "./Shimmer";

const TableShimmer = ({ rows = 5, columns = 6 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="hover:bg-gray-50">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
              <Shimmer
                width={colIndex === 0 ? "120px" : "80px"}
                height="40px"
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableShimmer;
