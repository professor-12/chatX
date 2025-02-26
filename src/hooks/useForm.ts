"use client";
import React, { FormEvent, useRef, useState } from "react";

type _Error<T, K> = {
    [key in keyof T]: K;
};

interface Message {
    message: string;
}

interface Rules {
    required?: Message;
    pattern?: { message: string; value: RegExp } | RegExp;
    validate?: (value: string) => { isValid: boolean; message?: string };
}

const useForm = <T = {}>(defaultValues: T) => {
    const [errors, setErrors] = useState<_Error<T, string>>(() => {
        return Object.keys(defaultValues as any).reduce((acc, key) => {
            acc[key as keyof T] = "";
            return acc;
        }, {} as _Error<T, string>);
    });

    const _rules = useRef({}) as any;

    const [isPending, setIsPending] = useState(false);
    const [fieldValues, setFieldValues] = useState<T>(defaultValues);

    const valueTouched = useRef<_Error<T, boolean>>(
        Object.keys(defaultValues as any).reduce((acc, key) => {
            acc[key as keyof T] = false;
            return acc;
        }, {} as _Error<T, boolean>)
    );

    const validateFields = (
        name: string,
        value: string,
        rules?: Rules
    ): boolean => {
        if (rules?.required && value.trim().length === 0) {
            setErrors((prev) => ({
                ...prev,
                [name]: rules?.required?.message || "This field is required",
            }));
            return false;
        }
        if (rules?.pattern instanceof RegExp && !rules.pattern.test(value)) {
            setErrors((prev) => ({
                ...prev,
                [name]: "Field does not match the required pattern",
            }));
            return false;
        }
        if (typeof rules?.validate === "function") {
            const { isValid, message } = rules.validate(value);
            setErrors((prev) => ({
                ...prev,
                [name]: isValid ? "" : message,
            }));
            return isValid;
        }
        setErrors((prev) => ({ ...prev, [name]: "" }));
        return true;
    };

    const register = (name: keyof T, rules?: Rules) => {
        _rules.current[name as any] = rules;
        return {
            value: fieldValues[name],
            name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                setFieldValues((prev) => ({ ...prev, [name]: value }));
                if (valueTouched.current[name]) {
                    validateFields(name as string, value, rules);
                }
            },
            onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                valueTouched.current[name] = true;
                validateFields(name as string, e.target.value, rules);
            },
        };
    };

    const submitForm = (callback: (values: T) => Promise<any> | void) => {
        return async (e: FormEvent) => {
            e.preventDefault();

            const isError = Object.entries(fieldValues as any).every(
                ([a, b]) => {
                    valueTouched.current[a as keyof T] = true;
                    return validateFields(
                        a,
                        b as any,
                        _rules.current[a] as any
                    );
                }
            );
            if (!isError) return;
            setIsPending(true);
            await callback(fieldValues);
            setIsPending(false);
        };
    };

    const reset = () => {
        setFieldValues(defaultValues);
        setErrors(
            Object.keys(defaultValues as Record<keyof T, string>).reduce(
                (acc, key) => ({ ...acc, [key]: "" }),
                {} as _Error<T, string>
            )
        );
        valueTouched.current = Object.keys(
            defaultValues as Record<keyof T, string>
        ).reduce(
            (acc, key) => ({ ...acc, [key]: false }),
            {} as _Error<T, boolean>
        );
    };

    return { register, errors, isPending, reset, submitForm };
};

export default useForm;
