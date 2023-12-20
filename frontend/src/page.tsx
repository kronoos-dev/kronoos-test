import DataTable from "./components/data-table";

export default function HomePage() {
  return (
    <div className="overflow-hiddenpy-5 flex h-screen flex-col items-center justify-start gap-4">
      <header className="flex flex-col items-center">
        <h1 className="text-center text-4xl">Kronoos Test</h1>
        <p>Frontend proposto para teste das funcionalidades</p>
        <span>by Samuel Morrissey</span>
      </header>
      <main className="h-full w-full overflow-hidden px-20">
        <DataTable />
      </main>
    </div>
  );
}
