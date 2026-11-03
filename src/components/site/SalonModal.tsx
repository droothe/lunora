import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SalonModal({ open, onClose, title, children, className }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string;
}) {
  return <Dialog.Root open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm" />
      <Dialog.Content aria-describedby={undefined} className={cn("fixed left-1/2 top-1/2 z-[61] flex max-h-[94dvh] w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-card shadow-lift", className)}>
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        {children}
        <Dialog.Close asChild><Button variant="editorial" size="auto" title="Kapat" aria-label="Kapat" className="absolute right-4 top-4 rounded-full border bg-card p-2 hover:bg-secondary"><X className="h-4 w-4" /></Button></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}