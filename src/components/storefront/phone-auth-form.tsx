"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { signupCustomerAction, signinCustomerAction } from "@/actions/customers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthState = {
  success?: boolean;
  error?: string;
};

const initialState: AuthState = {
  success: false,
  error: "",
};

function PhoneAuthFormInner() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const nextUrl = searchParams.get("next") || "/booking";

  const signinActionWrapper = async (
    _prevState: AuthState,
    formData: FormData
  ): Promise<AuthState> => {
    formData.set("next", nextUrl);
    const result = await signinCustomerAction(formData);

    return {
      success: !!result && !result.error,
      error: result?.error || "",
    };
  };

  const signupActionWrapper = async (
    _prevState: AuthState,
    formData: FormData
  ): Promise<AuthState> => {
    formData.set("next", nextUrl);
    const result = await signupCustomerAction(formData);

    return {
      success: !!result && !result.error,
      error: result?.error || "",
    };
  };

  const [signinState, signinFormAction, signinPending] = useActionState(
    signinActionWrapper,
    initialState
  );

  const [signupState, signupFormAction, signupPending] = useActionState(
    signupActionWrapper,
    initialState
  );

  const activeState = mode === "signin" ? signinState : signupState;
  const pending = mode === "signin" ? signinPending : signupPending;

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle>Customer access</CardTitle>
        <CardDescription>
          Use your phone number to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as "signin" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-6">
            <form action={signinFormAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-phone">Phone number</Label>
                <Input
                  id="signin-phone"
                  name="phone"
                  placeholder="+1 (555) 555-5555"
                  required
                />
              </div>

              <input type="hidden" name="deviceJson" value="{}" />
              <input type="hidden" name="isPWAInstalled" value="false" />
              <input type="hidden" name="next" value={nextUrl} />

              {activeState?.error ? (
                <p className="text-sm text-red-500">{activeState.error}</p>
              ) : null}

              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Signing in..." : "Continue"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <form action={signupFormAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full name</Label>
                <Input
                  id="signup-name"
                  name="name"
                  placeholder="Maheshwar"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-phone">Phone number</Label>
                <Input
                  id="signup-phone"
                  name="phone"
                  placeholder="+1 (555) 555-5555"
                  required
                />
              </div>

              <input type="hidden" name="deviceJson" value="{}" />
              <input type="hidden" name="isPWAInstalled" value="false" />
              <input type="hidden" name="next" value={nextUrl} />

              {activeState?.error ? (
                <p className="text-sm text-red-500">{activeState.error}</p>
              ) : null}

              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Wrap the inner component in a Suspense boundary
export function PhoneAuthForm() {
  return (
    // You can replace the fallback with a loading spinner or skeleton if desired
    <Suspense fallback={<div className="flex justify-center p-8 text-sm text-muted-foreground">Loading form...</div>}>
      <PhoneAuthFormInner />
    </Suspense>
  );
}