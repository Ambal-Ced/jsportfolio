"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { IntentButton } from "@/components/ui/IntentButton";

export type FieldErrors = Record<string, string>;

export function ValidatedForm({
  children,
  onSubmitIntent,
  submitLabel,
  validate,
}: {
  children: (ctx: { errors: FieldErrors; highlight: (name: string) => string }) => ReactNode;
  validate: (data: FormData) => FieldErrors;
  onSubmitIntent: (data: FormData, idempotencyKey: string) => Promise<void>;
  submitLabel: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  function highlight(name: string) {
    return errors[name]
      ? "border-red-600 ring-1 ring-red-600"
      : "border-zinc-300 dark:border-zinc-700";
  }

  function nativeSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form ref={formRef} className="flex max-w-sm flex-col gap-3" onSubmit={nativeSubmit} noValidate>
      {children({ errors, highlight })}
      <IntentButton
        onIntent={async (key) => {
          const node = formRef.current;
          if (!node) throw new Error("form missing");
          const data = new FormData(node);
          const next = validate(data);
          setErrors(next);
          if (Object.keys(next).length) throw new Error("invalid");
          await onSubmitIntent(data, key);
        }}
      >
        {submitLabel}
      </IntentButton>
    </form>
  );
}

export function Field({
  name,
  label,
  type = "text",
  errors,
  highlight,
}: {
  name: string;
  label: string;
  type?: string;
  errors: FieldErrors;
  highlight: (name: string) => string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      <input
        name={name}
        type={type}
        className={`h-9 rounded-md border bg-transparent px-2 ${highlight(name)}`}
        autoComplete={type === "password" ? "current-password" : "off"}
      />
      {errors[name] ? <span className="text-red-600">{errors[name]}</span> : null}
    </label>
  );
}
