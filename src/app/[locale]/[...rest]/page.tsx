import { notFound } from "next/navigation";

// Any unknown address inside /en or /de shows the friendly 404 page.
export default function CatchAll() {
  notFound();
}
