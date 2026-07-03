import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useReservation } from "../../hooks/useReservation";
import TableForm from "../../components/table/TableForm";
import { ChevronLeft, AlertCircle } from "lucide-react";

export const EditTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tables, updateTable } = useReservation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const table = tables.find((t) => t._id === id);

  const handleEditSubmit = async (values) => {
    if (!table) return;
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await updateTable(table._id, values.capacity, table.isActive);
      setSuccess("Table details saved!");
      setTimeout(() => navigate("/admin/tables"), 1000);
    } catch (err) {
      setError(err.message || "Failed to save details.");
    } finally {
      setLoading(false);
    }
  };

  if (!table) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 text-left">
        <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 rounded-full">
          <AlertCircle size={28} />
        </div>
        <h3 className="text-lg font-bold text-white">Table Not Found</h3>
        <Link to="/admin/tables" className="text-xs text-gold-light hover:underline">
          Return to list
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto flex flex-col space-y-6 text-left">
      <Link
        to="/admin/tables"
        className="flex items-center space-x-1.5 text-xs text-silver/70 hover:text-white transition-colors"
      >
        <ChevronLeft size={14} />
        <span>Back to Configuration</span>
      </Link>

      <TableForm
        onSubmit={handleEditSubmit}
        initialValues={{ capacity: table.capacity }}
        loading={loading}
        error={error}
        success={success}
      />
    </div>
  );
};

export default EditTable;
