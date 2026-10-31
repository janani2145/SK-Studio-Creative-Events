"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlus } from "lucide-react";

/**
 * next/image with a branded fallback.
 * Photo missing or link broken? It shows a jersey-stripe placeholder instead of a broken icon,
 * so the site never looks broken while real photos are being added.
 */
export default function SmartImage({ src, alt, label, sizes = "100vw", className = "", priority = false, ...rest }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="img-fallback" role="img" aria-label={alt}>
        <div className="flex flex-col items-center gap-2">
          <ImagePlus className="h-6 w-6 text-gold" aria-hidden="true" />
          <span>{label || alt}</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
