"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createuser } from "@/lib/_server/auth";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";

interface ILoginFields {
      email: string;
      password: string;
      username: string;
      cpassword: string
}

const initialData = {
      error: null as Record<keyof ILoginFields, string> | null,
      data: null as ILoginFields | null,
      defaultValue: {} as Partial<ILoginFields>,
};

const SignUp = () => {
      const [state, action, isPending] = useActionState<typeof initialData>(
            createuser as any,
            initialData
      );
      return (
            <div className="flex dark:text-white text-black items-center flex-1">
                  <form action={action} className="w-full sm:px-8 max-lg:max-w-[40rem] mx-auto space-y-4">
                        <h1 className="dark:text-white text-[26px] mb-4 font-medium tracking-wide">
                              Sign up to ChatX.
                        </h1>
                        {state.error && typeof state.error === "string" && (
                              <p className="text-sm text-destructive">{state.error}</p>
                        )}

                        <div className="w-full space-y-1">
                              <label htmlFor="email">Email</label>
                              <Input
                                    defaultValue={state.defaultValue?.email ?? ""}
                                    className={clsx({ "border-destructive": state.error?.email })}
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                              />
                              <ErrorMessage error={state?.error?.email as string} />
                        </div>

                        <div className="w-full space-y-1">
                              <label htmlFor="password">Username</label>
                              <Input
                                    defaultValue={state.defaultValue?.username ?? ""}
                                    className={clsx({ "border-destructive": state.error?.username })}
                                    name="name"
                                    placeholder="John doe"
                              />
                              <ErrorMessage error={state?.error?.username as string} />
                        </div>

                        <div className="w-full space-y-1">
                              <label htmlFor="password">Password</label>
                              <Input
                                    defaultValue={state.defaultValue?.password ?? ""}
                                    className={clsx({ "border-destructive": state.error?.password })}
                                    name="password"
                                    type="password"
                                    placeholder="Your password"
                              />

                              <ErrorMessage error={state.error?.password as string} />
                        </div>
                        <div className="w-full space-y-1">
                              <label htmlFor="password">Confirm Password</label>
                              <Input
                                    defaultValue={state.defaultValue?.cpassword ?? ""}
                                    className={clsx({ "border-destructive": state.error?.cpassword })}
                                    name="cpassword"
                                    type="password"
                                    placeholder="******"
                              />
                              <ErrorMessage error={state.error?.cpassword as string} />
                        </div>
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
                                          "Register"
                                    )}
                              </Button>
                        </div>
                        <div className="text-[12px] tracking-wide text-center">
                              Already have an account?{" "}
                              <Link href="/login" className="dark:text-white/50 hover:underline">
                                    Login
                              </Link>
                        </div>
                  </form>
            </div>
      );
};

export default SignUp;



const ErrorMessage = ({ error }: { error: string }) => {
      return error ? <span className="text-xs tracking-wide text-destructive">
            {error}
      </span> : null
}
