"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { ApplicationField } from "@/lib/supabase/types";

interface DynamicApplicationFormProps {
  fields: ApplicationField[];
  onSubmit: (data: Record<string, any>, files: Record<string, File[]>) => Promise<void>;
  submitting?: boolean;
}

export default function DynamicApplicationForm({
  fields,
  onSubmit,
  submitting = false,
}: DynamicApplicationFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleFileChange = (fieldId: string, selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const field = fields.find((f) => f.id === fieldId);
    if (!field || field.type !== "file") return;

    const fileArray = Array.from(selectedFiles);
    const maxFiles = field.maxFiles || 1;

    if (fileArray.length > maxFiles) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: `Maximum ${maxFiles} file(s) allowed`,
      }));
      return;
    }

    // Validate file types
    if (field.accept) {
      const acceptedTypes = field.accept.split(",").map((t) => t.trim());
      const invalidFiles = fileArray.filter((file) => {
        const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
        return !acceptedTypes.some((accept) => accept.includes(fileExt));
      });

      if (invalidFiles.length > 0) {
        setErrors((prev) => ({
          ...prev,
          [fieldId]: `Invalid file type. Accepted: ${field.accept}`,
        }));
        return;
      }
    }

    setFiles((prev) => ({ ...prev, [fieldId]: fileArray }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const removeFile = (fieldId: string, fileIndex: number) => {
    setFiles((prev) => {
      const fieldFiles = prev[fieldId] || [];
      const updated = { ...prev };
      updated[fieldId] = fieldFiles.filter((_, i) => i !== fileIndex);
      if (updated[fieldId].length === 0) {
        delete updated[fieldId];
      }
      return updated;
    });
  };

  const handleDrag = (e: React.DragEvent, fieldId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(fieldId);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  };

  const handleDrop = (e: React.DragEvent, fieldId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(fieldId, e.dataTransfer.files);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required) {
        if (field.type === "file") {
          if (!files[field.id] || files[field.id].length === 0) {
            newErrors[field.id] = `${field.label} is required`;
          }
        } else {
          if (!formData[field.id] || formData[field.id].toString().trim() === "") {
            newErrors[field.id] = `${field.label} is required`;
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    await onSubmit(formData, files);
  };

  const renderField = (field: ApplicationField) => {
    switch (field.type) {
      case "text":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                errors[field.id]
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {errors[field.id] && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              rows={5}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-y ${
                errors[field.id]
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {errors[field.id] && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              required={field.required}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                errors[field.id]
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            >
              <option value="">Select an option</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[field.id] && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id} className="flex items-start gap-3">
            <input
              type="checkbox"
              id={field.id}
              checked={formData[field.id] || false}
              onChange={(e) => handleInputChange(field.id, e.target.checked)}
              required={field.required}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={field.id} className="text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {errors[field.id] && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "file":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div
              onDragEnter={(e) => handleDrag(e, field.id)}
              onDragLeave={(e) => handleDrag(e, field.id)}
              onDragOver={(e) => handleDrag(e, field.id)}
              onDrop={(e) => handleDrop(e, field.id)}
              className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                dragActive === field.id
                  ? "border-blue-500 bg-blue-50"
                  : errors[field.id]
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <input
                ref={(el) => {
                  if (el) fileInputRefs.current[field.id] = el;
                }}
                type="file"
                multiple={field.maxFiles ? field.maxFiles > 1 : false}
                accept={field.accept}
                onChange={(e) => handleFileChange(field.id, e.target.files)}
                className="hidden"
              />
              <div className="text-center">
                <Upload
                  className={`mx-auto mb-3 ${
                    dragActive === field.id ? "text-blue-600" : "text-gray-400"
                  }`}
                  size={32}
                />
                <p className="text-sm text-gray-600 mb-1">
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[field.id]?.click()}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Click to upload
                  </button>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  {field.accept || "Any file type"}
                  {field.maxFiles && field.maxFiles > 1 && ` (Max ${field.maxFiles} files)`}
                </p>
              </div>
            </div>

            {files[field.id] && files[field.id].length > 0 && (
              <div className="mt-3 space-y-2">
                {files[field.id].map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="text-gray-400" size={18} />
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(field.id, index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors[field.id] && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => renderField(field))}

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ scale: submitting ? 1 : 1.02 }}
        whileTap={{ scale: submitting ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Submitting...
          </>
        ) : (
          <>
            Submit Application
            <CheckCircle size={20} />
          </>
        )}
      </motion.button>
    </form>
  );
}

