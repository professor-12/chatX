"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginuser } from "@/lib/_server/auth";
import clsx from "clsx";
import { stat } from "fs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";

interface ILoginFields {
      email: string;
      password: string;
}

const initialData = {
      error: null as Record<keyof ILoginFields, string> | null,
      data: null as ILoginFields | null,
      prevState: {} as Partial<ILoginFields>,
};

const LoginPage = () => {
      const router = useRouter()
      const [state, action, isPending] = useActionState<typeof initialData>(
            loginuser as any,
            initialData
      );
      return (
            <div className="flex dark:text-white text-black items-center flex-1">
                  <form action={action} className="w-full sm:px-8 space-y-4">
                        <h1 className="text-white text-[26px] mb-4 font-medium tracking-wide">
                              Login
                        </h1>
                        {state?.error && typeof state?.error === "string" && (
                              <p className="text-sm text-destructive">{state?.error}</p>
                        )}

                        {/* Email Input */}
                        <div className="w-full space-y-1">
                              <label htmlFor="email">Email</label>
                              <Input
                                    defaultValue={state?.prevState?.email ?? ""}
                                    className={clsx({ "border-destructive": state?.error?.email })}
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                              />
                              {state?.error?.email && (
                                    <span className="text-xs tracking-wide text-destructive">
                                          {state.error.email}
                                    </span>
                              )}
                        </div>

                        {/* Password Input */}
                        <div className="w-full space-y-1">
                              <label htmlFor="password">Password</label>
                              <Input
                                    defaultValue={state?.prevState?.password ?? ""}
                                    className={clsx({ "border-destructive": state?.error?.password })}
                                    name="password"
                                    type="password" // Changed from text to password
                                    placeholder="Your password"
                              />
                              {state?.error?.password && (
                                    <span className="text-xs tracking-wide text-destructive">
                                          {state?.error.password}
                                    </span>
                              )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                              <Button disabled={isPending} className="w-full">
                                    {isPending ? (
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide animate-spin lucide-loader"
                                          >
                                                <path d="M12 2v4" />
                                                <path d="m16.2 7.8 2.9-2.9" />
                                                <path d="M18 12h4" />
                                                <path d="m16.2 16.2 2.9 2.9" />
                                                <path d="M12 18v4" />
                                                <path d="m4.9 19.1 2.9-2.9" />
                                                <path d="M2 12h4" />
                                                <path d="m4.9 4.9 2.9 2.9" />
                                          </svg>
                                    ) : (
                                          "Login"
                                    )}
                              </Button>
                        </div>

                        {/* Sign-Up Link */}
                        <div className="text-[12px] tracking-wide text-center">
                              Don{"'"}t have an account?{" "}
                              <Link href="/signup" className="text-white/50 hover:underline">
                                    Sign up
                              </Link>
                        </div>
                  </form>
            </div>
      );
};

export default LoginPage;
