"use client";
import useNavigate from "@/hooks/useNavigate";
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 h-screen">
        This is a app layout review for dev, you shouldnt be here without
        permission!
        <button
          className="bg-foreground text-white p-3 rounded-2xl cursor-pointer hover:bg-background hover:text-foreground"
          onClick={() => navigate("/home")}
        >
          Go to Homepage
        </button>
        <button
          className="bg-foreground text-white p-3 rounded-2xl cursor-pointer hover:bg-background hover:text-foreground"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    </>
  );
}
