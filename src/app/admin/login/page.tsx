"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClinicLogo } from "@/components/ui/logo";
import { loginAction } from "@/app/actions/auth";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await loginAction(password);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 ring-1 ring-border">
        <CardHeader className="text-center space-y-4 pt-8">
          <div className="mx-auto w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-2">
            <ClinicLogo className="w-16 h-16" />
          </div>
          <div>
            <CardTitle className="text-2xl font-heading font-bold">Admin Dashboard</CardTitle>
            <CardDescription className="text-base mt-2">
              Enter your secure password to access the clinic management system.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm text-center font-medium">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 py-6 text-lg"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login to Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
