import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Authenticate() {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  return true;
}
