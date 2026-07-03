import React from "react";
import { Armchair, Power, Trash2 } from "lucide-react";

export const TableCard = ({ table, onToggleActive, onDelete, onEdit }) => {
  return (
    <div className="border border-white/5 bg-white/5 p-4 rounded-xl flex flex-col space-y-3.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold font-mono text-white">Table {table.tableNumber}</span>
        <div className="flex items-center space-x-1.5">
          {onToggleActive && (
            <button
              onClick={() => onToggleActive(table)}
              className={`p-1.5 rounded border transition-colors ${
                table.isActive
                  ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10"
                  : "border-red-500/20 text-red-400 bg-red-500/5 hover:bg-red-500/10"
              }`}
              title={table.isActive ? "Deactivate Table" : "Activate Table"}
            >
              <Power size={13} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(table._id)}
              className="p-1.5 border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors rounded"
              title="Delete Table"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-silver">
        <span>Capacity:</span>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white font-mono flex items-center space-x-1.5">
            <Armchair size={13} className="text-silver/50" />
            <span>{table.capacity} guests</span>
          </span>
          {onEdit && (
            <button
              onClick={() => onEdit(table)}
              className="text-silver/40 hover:text-gold-light transition-colors font-semibold"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableCard;
