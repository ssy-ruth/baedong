const LongAbsenceList = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white m-4 p-4 rounded text-center text-gray-400">
        장기 결석생이 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-white m-4 p-4 rounded">
      {/* 🔹 타이틀 */}
      <h3 className="font-bold mb-3">장기 결석생</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.memberId}
            className="flex justify-between py-2 border-b last:border-b-0 text-sm"
          >
            <span>{item.name}</span>
            <span className="text-gray-500">{item.absentWeeks}주 결석</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LongAbsenceList;
