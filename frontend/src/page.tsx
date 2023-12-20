import DataTable from "./components/data-table";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-start gap-8 bg-slate-200 pt-20">
      <header>
        <h1 className="text-center text-4xl">Kronoos Test</h1>
        <p>Frontend proposto para teste das funcionalidades</p>
      </header>
      <main className="w-full px-20">
        <DataTable />
      </main>
    </div>
  );
}
