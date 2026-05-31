import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-sage-50">
      <main className="mx-auto w-full max-w-lg flex-1 pb-24 pt-4">
        {children}
      </main>
      <FloatingWhatsApp />
      <BottomNav />
    </div>
  );
}
