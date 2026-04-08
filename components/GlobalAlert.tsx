"use client";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";

export default function GlobalAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const originalAlert = window.alert;
    
    // Override the native alert function
    window.alert = (msg) => {
      // Small timeout ensures that if alert is called during render mapping, it queues correctly
      setTimeout(() => {
        setMessage(msg?.toString() || "");
        setIsOpen(true);
      }, 10);
    };

    return () => {
      window.alert = originalAlert;
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-all duration-300">
      <div 
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-sm w-full mx-auto text-center animate-in zoom-in-95 duration-200"
        role="alertdialog"
        aria-modal="true"
      >
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
          <Info size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Notification</h3>
        <p className="text-gray-600 mb-8 whitespace-pre-wrap">{message}</p>
        <button
          onClick={() => setIsOpen(false)}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          OK
        </button>
      </div>
    </div>
  );
}
