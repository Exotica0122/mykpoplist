import { api } from "@/trpc/server";

export default async function Idols({ params }: { params: { id: string } }) {
  const idol = await api.idol.getIdol({ idolId: params.id });
  return (
    <div>
      Idols {params.id} {idol?.name}
    </div>
  );
}
