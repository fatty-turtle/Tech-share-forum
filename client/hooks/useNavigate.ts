"use client";

import { useRouter } from "next/navigation";

export default function useNavigate() {
  const router = useRouter();

  const navigate = (route: string) => {
    router.push(route);
  };

  return navigate;
}
