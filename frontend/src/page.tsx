import DataTable from "./components/data-table";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-start gap-4 overflow-hidden bg-slate-200 py-5">
      <header>
        <h1 className="text-center text-4xl">Kronoos Test</h1>
        <p>Frontend proposto para teste das funcionalidades</p>
      </header>
      <main className="h-full w-full overflow-hidden px-20">
        <DataTable />
      </main>
    </div>
  );
}
