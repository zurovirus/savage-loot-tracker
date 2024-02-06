import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// This component is responsible for checking if a user is logged in before allowing pages to be accessed.
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
