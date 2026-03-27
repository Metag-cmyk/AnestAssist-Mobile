import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "Confirm Dosage",
  cancelText = "Cancel"
}: ConfirmationModalProps) {
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  // Focus trap / initial focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        confirmBtnRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onKeyDown={handleKeyDown}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5 focus:outline-none"
            tabIndex={-1}
          >
            <div className="flex items-start justify-between p-5 border-b border-slate-100 bg-red-50/50">
              <div className="flex items-center gap-3 text-red-600">
                <AlertTriangle className="w-6 h-6" aria-hidden="true" />
                <h2 id="modal-title" className="text-lg font-bold">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-500 focus:ring-2 focus:ring-medical-accent focus:outline-none rounded-md p-1 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 text-slate-700">
              {children}
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 p-5 bg-slate-50 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-medical-accent focus:outline-none focus:border-transparent transition-all w-full sm:w-auto"
              >
                {cancelText}
              </button>
              <button
                ref={confirmBtnRef}
                type="button"
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:outline-none transition-all w-full sm:w-auto flex items-center justify-center shadow-sm"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
