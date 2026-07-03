import React from "react";
import TableCard from "./TableCard";

export const TableList = ({ tables, onToggleActive, onDelete, onEdit }) => {
  if (tables.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
        <span className="text-sm text-silver/50 font-sans">No tables configured.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {tables.map((table) => (
        <TableCard
          key={table._id}
          table={table}
          onToggleActive={onToggleActive}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TableList;
