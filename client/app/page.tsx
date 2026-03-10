"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/home");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 h-screen">
        This is a app layout review for dev, you shouldnt be here without
        permission!
        <button
          className="bg-foreground text-white p-3 rounded-2xl cursor-pointer hover:bg-background hover:text-foreground"
          onClick={handleClick}
        >
          Back to Homepage
        </button>
      </div>
    </>
  );
}
