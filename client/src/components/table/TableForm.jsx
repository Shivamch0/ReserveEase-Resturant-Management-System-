import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import { Armchair, Plus } from "lucide-react";

export const TableForm = ({ onSubmit, initialValues, error, success, loading }) => {
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    if (initialValues) {
      setTableNumber(initialValues.tableNumber || "");
      setCapacity(initialValues.capacity || "");
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tableNumber || !capacity) return;
    onSubmit({
      tableNumber: Number(tableNumber),
      capacity: Number(capacity)
    });
    if (!initialValues) {
      setTableNumber("");
      setCapacity("");
    }
  };

  return (
    <div className="glass p-6 rounded-2xl border border-white/5 text-left w-full">
      <h3 className="text-lg font-bold text-white mb-5 flex items-center space-x-2">
        <Armchair size={18} className="text-gold-light" />
        <span>{initialValues ? "Edit Table" : "Add New Table"}</span>
      </h3>

      <Alert type="error" message={error} className="mb-4" />
      <Alert type="success" message={success} className="mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {!initialValues && (
          <Input
            label="Table Number"
            type="number"
            required
            min="1"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="e.g. 7"
          />
        )}

        <Input
          label="Guest Capacity"
          type="number"
          required
          min="1"
          max="20"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="e.g. 4"
        />

        <Button type="submit" loading={loading} className="w-full py-3">
          <Plus size={15} />
          <span>{initialValues ? "Save Changes" : "Create Table"}</span>
        </Button>
      </form>
    </div>
  );
};

export default TableForm;
