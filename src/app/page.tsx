import { checkAuth } from "@/lib/_server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  await checkAuth();
  // await createGroupChat()
  return redirect("/home")

}
