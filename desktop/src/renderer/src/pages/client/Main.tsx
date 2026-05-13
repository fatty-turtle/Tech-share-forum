import ClientLayout from "../../layouts/ClientLayout";
export default function Main() {
  return (
    <div className="w-full m-auto">
      <div className="flex flex-col items-center justify-center gap-5 h-screen">
        This is a app layout review for dev, you shouldnt be here without
        permission!
        <button className="bg-foreground text-white p-3 rounded-2xl cursor-pointer hover:bg-background hover:text-foreground hover:border-2">
          Go to Homepage
        </button>
        <button className="bg-foreground text-white p-3 rounded-2xl cursor-pointer hover:bg-background hover:text-foreground hover:border-2">
          Go to Login
        </button>
      </div>
    </div>
  );
}
