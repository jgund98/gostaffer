import { redirect } from "next/navigation";

// Solutions merged into Services — keep the URL alive, send visitors to Services.
export default function Solutions() {
  redirect("/services");
}
