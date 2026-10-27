import Image from "next/image";
import type { Placeholder } from "@/lib/types";

/** Shows an uploaded photo, or a drawn placeholder until the owner adds one. */
export function Photo({
  src, alt, placeholder = "dawn", caption, className = "", sizes = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw", priority = false,
}: {
  src?: string | null;
  alt: string;
  placeholder?: Placeholder;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`ph has-img ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
    );
  }
  return (
    <div className={`ph ph-${placeholder} ${className}`} role="img" aria-label={alt}>
      <svg className="acacia" aria-hidden="true"><use href="#acacia" /></svg>
      {caption ? <span className="ph-cap">{caption}</span> : null}
    </div>
  );
}
