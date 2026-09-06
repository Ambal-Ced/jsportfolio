"use client";

import { Field, ValidatedForm } from "@/components/ui/ValidatedForm";

export default function FormPage() {
  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Login / register</h1>
      <p className="max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
        Submit stays available. Missing fields highlight in red. The intent button still blocks a second in-flight
        request.
      </p>
      <ValidatedForm
        submitLabel="Log in"
        validate={(data) => {
          const errors: Record<string, string> = {};
          if (!String(data.get("email") || "").trim()) errors.email = "Email is required";
          if (!String(data.get("password") || "")) errors.password = "Password is required";
          return errors;
        }}
        onSubmitIntent={async (data, key) => {
          const res = await fetch("/api/demo/login", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "idempotency-key": key,
            },
            body: JSON.stringify({
              email: String(data.get("email") || ""),
              password: String(data.get("password") || ""),
            }),
          });
          if (!res.ok) throw new Error("failed");
        }}
      >
        {({ errors, highlight }) => (
          <>
            <Field name="email" label="Email" type="email" errors={errors} highlight={highlight} />
            <Field name="password" label="Password" type="password" errors={errors} highlight={highlight} />
          </>
        )}
      </ValidatedForm>
    </main>
  );
}
