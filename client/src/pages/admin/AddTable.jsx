import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useReservation } from "../../hooks/useReservation";
import TableForm from "../../components/table/TableForm";
import { ChevronLeft } from "lucide-react";

export const AddTable = () => {
  const { addTable } = useReservation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddSubmit = async (values) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await addTable(values.tableNumber, values.capacity);
      setSuccess("Table created successfully!");
      setTimeout(() => navigate("/admin/tables"), 1000);
    } catch (err) {
      setError(err.message || "Failed to add table.");
    } finally {
      setLoading(false);
    }
  };

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
        onSubmit={handleAddSubmit}
        loading={loading}
        error={error}
        success={success}
      />
    </div>
  );
};

export default AddTable;
