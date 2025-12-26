const Section = ({ title, children }) => (
  <div className="p-4 border-b">
    <h3 className="text-blue-600 font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const Row = ({ name, button }) => (
  <div className="flex justify-between py-2 border-b">
    <span>{name}</span>
    {button}
  </div>
);

const AttendanceEditor = ({ data, isEditMode, onChange }) => {
  const moveStudent = (name, from, to) => {
    onChange({
      ...data,
      [from]: data[from].filter((n) => n !== name),
      [to]: [...data[to], name],
    });
  };

  return (
    <div className="bg-white mt-2">
      {/* 출석 */}
      <Section title="출석 인원">
        {data.attend.map((name) => (
          <Row
            key={name}
            name={name}
            button={
              isEditMode && (
                <button onClick={() => moveStudent(name, "attend", "absent")}>
                  ➖
                </button>
              )
            }
          />
        ))}
      </Section>

      {/* 결석 */}
      <Section title="결석 인원">
        {data.absent.map((name) => (
          <Row
            key={name}
            name={name}
            button={
              isEditMode && (
                <button onClick={() => moveStudent(name, "absent", "attend")}>
                  ➕
                </button>
              )
            }
          />
        ))}
      </Section>

      {/* 결석 사유 */}
      {isEditMode ? (
        <textarea
          className="w-full p-3 border mt-4"
          placeholder="결석 사유 입력"
          value={data.memo}
          onChange={(e) => onChange({ ...data, memo: e.target.value })}
        />
      ) : (
        data.memo && (
          <div className="p-4 text-sm text-gray-600">📝 비고: {data.memo}</div>
        )
      )}
    </div>
  );
};
export default AttendanceEditor;
