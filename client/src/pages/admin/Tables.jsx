import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReservation } from "../../hooks/useReservation";
import TableList from "../../components/table/TableList";
import Alert from "../../components/ui/Alert";
import { Armchair, Plus } from "lucide-react";

export const Tables = () => {
  const { tables, updateTable, deleteTable } = useReservation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleToggleActive = async (table) => {
    setError("");
    setSuccess("");
    try {
      await updateTable(table._id, table.capacity, !table.isActive);
      setSuccess(`Table ${table.tableNumber} status updated!`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");
    if (window.confirm("Are you sure you want to delete this table?")) {
      try {
        await deleteTable(id);
        setSuccess("Table deleted successfully!");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (table) => {
    navigate(`/admin/tables/edit/${table._id}`);
  };

  return (
    <div className="flex flex-col space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">Tables Configuration</h2>
          <p className="text-sm text-silver">Manage restaurant seating capacity and operational status.</p>
        </div>
        <Link
          to="/admin/tables/add"
          className="gold-gradient text-dark-bg font-bold py-3 px-5 rounded-xl transition-all transform hover:scale-[1.02] flex items-center space-x-2 text-xs tracking-wider uppercase shadow-md shadow-gold-dark/10 self-start sm:self-center"
        >
          <Plus size={15} />
          <span>Add Table</span>
        </Link>
      </div>

      <Alert type="error" message={error} />
      <Alert type="success" message={success} />

      <div className="glass p-6 rounded-2xl border border-white/5">
        <div className="flex items-center space-x-2 mb-6">
          <Armchair size={18} className="text-gold-light" />
          <h3 className="text-lg font-bold text-white">Active Floor Plan Layout</h3>
        </div>

        <TableList
          tables={tables}
          onToggleActive={handleToggleActive}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Tables;
