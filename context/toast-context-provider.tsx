"use client";
import React, { createContext, useContext, useState } from "react";

type ToastType = "default" | "success" | "destructive";

interface ToastState {
  open: boolean;
  title: string;
  description: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: ToastState;
  showToast: (params: {
    title: string;
    description: string;
    type?: ToastType;
    duration?: number;
  }) => void;
  hideToast: () => void;
}

const initialToastState: ToastState = {
  open: false,
  title: "",
  description: "",
  type: "default",
  duration: 3000,
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastState>(initialToastState);
  let toastTimeout: NodeJS.Timeout | null = null;

  const showToast = ({
    title,
    description,
    type = "default",
    duration = 3000,
  }: {
    title: string;
    description: string;
    type?: ToastType;
    duration?: number;
  }) => {
   
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    setToast({
      open: true,
      title,
      description,
      type,
      duration,
    });

    
    toastTimeout = setTimeout(() => {
      hideToast();
    }, duration);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
