import ClassAttendanceItem from "./ClassAttendanceItem";

const ClassAttendanceList = ({ classList, activeClassId, onToggleClass }) => {
  return (
    <ul className="bg-white">
      {classList.map((cls) => (
        <ClassAttendanceItem
          key={cls.classId}
          data={cls}
          isActive={activeClassId === cls.classId}
          onToggle={onToggleClass}
        />
      ))}
    </ul>
  );
};

export default ClassAttendanceList;
