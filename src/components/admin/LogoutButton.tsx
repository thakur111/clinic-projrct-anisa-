"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/admin/login");
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 px-3 py-2 w-full text-left text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg font-medium transition-colors"
    >
      <LogOut className="h-5 w-5" />
      Logout
    </button>
  );
}
