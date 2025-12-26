import React from "react";

const WIDTH = 320;
const HEIGHT = 160;
const TOP_PADDING = 30;
const BOTTOM_PADDING = 30;
const SIDE_PADDING = 16;

const MonthlyAttendanceChart = ({ title, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-[#215BA0] text-center">데이터가 없습니다.</div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.attendCount));
  const chartHeight = HEIGHT - TOP_PADDING - BOTTOM_PADDING;
  const columnWidth = (WIDTH - SIDE_PADDING * 2) / data.length;

  const points = data.map((item, index) => {
    const x = SIDE_PADDING + columnWidth * index + columnWidth / 2;
    const y = TOP_PADDING + (1 - item.attendCount / maxValue) * chartHeight;

    return {
      x,
      y,
      value: item.attendCount,
      date: item.date,
    };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className="bg-white m-4 p-4 rounded">
      {/* 제목 + 단위 */}
      <div className="flex justify-between items-end mb-2">
        <h3 className="font-bold">{title}</h3>
        <span className="text-xs text-gray-400">(단위: 명)</span>
      </div>

      <svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        {/* 꺾은선 */}
        <path d={linePath} fill="none" stroke="#215BA0" strokeWidth="2" />

        {/* 점 + 값 */}
        {points.map((p, idx) => (
          <g key={idx}>
            {/* 값 텍스트 */}
            <text
              x={p.x}
              y={p.y - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#215BA0"
              fontWeight="600"
            >
              {p.value}
            </text>

            {/* 점 */}
            <circle cx={p.x} cy={p.y} r="3" fill="#215BA0" />
          </g>
        ))}
      </svg>

      {/* x축 라벨 */}
      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
        {data.map((item) => (
          <span key={item.date} className="flex-1 text-center">
            {item.date.slice(5)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MonthlyAttendanceChart;
