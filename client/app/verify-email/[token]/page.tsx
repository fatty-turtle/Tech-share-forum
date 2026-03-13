import { cache } from "react";
import fetchApi from "@/utils/fetchApi";

const verifyToken = cache(async (token: string) => {
  return await fetchApi(`http://localhost:4000/auth/verify-email/${token}`);
});

export default async function VerifyEmail({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  const result = await verifyToken(token);
  const response = result.error ? result.error : result.response;

  return (
    <section className="flex items-center justify-center">
      {JSON.stringify(response)}
    </section>
  );
}
