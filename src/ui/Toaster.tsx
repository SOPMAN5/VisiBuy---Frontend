"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/ui/Toast"
import { useToast } from "@/ui/use-toast"

export function Toaster() {
  const { toasts,dismissAll  } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-y-9">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose onClick={()=>dismissAll()} />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}