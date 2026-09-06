"use client";

import { useState } from "react";
import { colorFromName, initialsFromName } from "@/lib/format/avatarColor";

function GenericIcon({ size }: { size: number }) {
  return (
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      aria-hidden
      className="text-zinc-500"
    >
      <path
        fill="currentColor"
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
      />
    </svg>
  );
}

type Stage = "image" | "initials" | "icon";

export function UserAvatar({
  name,
  src,
  size = 40,
}: {
  name: string;
  src?: string | null;
  size?: number;
}) {
  const initials = initialsFromName(name);
  const bg = colorFromName(name);
  const [stage, setStage] = useState<Stage>(src ? "image" : initials ? "initials" : "icon");

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium text-white select-none"
      style={{ width: size, height: size, fontSize: size * 0.36, background: stage === "initials" ? bg : "#d4d4d8" }}
      title={name || "Unknown"}
    >
      {stage === "image" && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          className="h-full w-full object-cover"
          onError={() => setStage(initials ? "initials" : "icon")}
        />
      ) : stage === "initials" ? (
        initials
      ) : (
        <GenericIcon size={size} />
      )}
    </span>
  );
}
