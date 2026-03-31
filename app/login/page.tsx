"use client";

import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function LoginPage() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        router.push("/admin/dashboard");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        router.push("/admin/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-200 p-8 shadow-sm dark:border-zinc-800">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
            <p className="mt-2 text-sm text-muted">
              Manage your portfolio content
            </p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="default"
            view="sign_in"
            showLinks={false}
          />
        </div>
      </div>
    );
  }

  return null;
}
