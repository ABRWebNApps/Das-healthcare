"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GripVertical, FileText, Type, List, CheckSquare, Upload } from "lucide-react";
import { ApplicationField } from "@/lib/supabase/types";

interface FormBuilderProps {
  fields: ApplicationField[];
  onChange: (fields: ApplicationField[]) => void;
}

export default function FormBuilder({ fields, onChange }: FormBuilderProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addField = (type: ApplicationField["type"]) => {
    const newField: ApplicationField = {
      id: Date.now().toString(),
      type,
      label: "",
      required: false,
      placeholder: type === "textarea" ? "Enter your response..." : "",
      ...(type === "select" && { options: [] }),
      ...(type === "file" && { accept: ".pdf,.doc,.docx", maxFiles: 1 }),
    };
    onChange([...fields, newField]);
  };

  const updateField = (index: number, updates: Partial<ApplicationField>) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
  };

  const removeField = (index: number) => {
    onChange(fields.filter((_, i) => i !== index));
  };

  const addOption = (index: number) => {
    const updated = [...fields];
    if (!updated[index].options) updated[index].options = [];
    updated[index].options!.push("");
    onChange(updated);
  };

  const updateOption = (fieldIndex: number, optionIndex: number, value: string) => {
    const updated = [...fields];
    if (updated[fieldIndex].options) {
      updated[fieldIndex].options![optionIndex] = value;
      onChange(updated);
    }
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const updated = [...fields];
    if (updated[fieldIndex].options) {
      updated[fieldIndex].options = updated[fieldIndex].options!.filter(
        (_, i) => i !== optionIndex
      );
      onChange(updated);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Application Form Fields</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => addField("text")}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Type size={16} />
            Text
          </button>
          <button
            type="button"
            onClick={() => addField("textarea")}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FileText size={16} />
            Textarea
          </button>
          <button
            type="button"
            onClick={() => addField("file")}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Upload size={16} />
            File
          </button>
          <button
            type="button"
            onClick={() => addField("select")}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <List size={16} />
            Select
          </button>
          <button
            type="button"
            onClick={() => addField("checkbox")}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <CheckSquare size={16} />
            Checkbox
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-2 text-gray-400 cursor-move">
                  <GripVertical size={20} />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Field Label *
                      </label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(index, { label: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="e.g., Resume, Portfolio, Years of Experience"
                      />
                    </div>

                    {field.type === "file" && (
                      <>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Accepted File Types
                          </label>
                          <input
                            type="text"
                            value={field.accept || ""}
                            onChange={(e) => updateField(index, { accept: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder=".pdf,.doc,.docx"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Max Files
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={field.maxFiles || 1}
                            onChange={(e) =>
                              updateField(index, { maxFiles: parseInt(e.target.value) || 1 })
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                      </>
                    )}

                    {field.type === "text" && field.placeholder !== undefined && (
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Placeholder
                        </label>
                        <input
                          type="text"
                          value={field.placeholder}
                          onChange={(e) => updateField(index, { placeholder: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Enter placeholder text..."
                        />
                      </div>
                    )}

                    {field.type === "textarea" && field.placeholder !== undefined && (
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Placeholder
                        </label>
                        <input
                          type="text"
                          value={field.placeholder}
                          onChange={(e) => updateField(index, { placeholder: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Enter placeholder text..."
                        />
                      </div>
                    )}
                  </div>

                  {field.type === "select" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Options
                      </label>
                      <div className="space-y-2">
                        {field.options?.map((option, optIndex) => (
                          <div key={optIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(index, optIndex, e.target.value)}
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              placeholder={`Option ${optIndex + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(index, optIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addOption(index)}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          + Add Option
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(index, { required: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Required field</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 text-sm">No custom fields added yet</p>
          <p className="text-gray-400 text-xs mt-1">
            Add fields above to customize the application form
          </p>
        </div>
      )}
    </div>
  );
}

