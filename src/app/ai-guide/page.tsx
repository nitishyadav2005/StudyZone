import { redirect } from "next/navigation";

export default function AIGuidePage() {
  // Redirecting to home as this feature has been removed.
  redirect("/");
  return null;
}
