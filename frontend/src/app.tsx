import clsx from "clsx";
import { FileUp } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

export default function App() {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileRead = (event: ProgressEvent<FileReader>) => {
    const content = event.target?.result;
    if (typeof content === "string") {
      console.log(content);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("drop");
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(file);
    }
  };

  const handleFileDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleFileDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-start gap-8 bg-slate-200 pt-20">
      <header>
        <h1 className="text-center text-4xl">Kronoos Test</h1>
        <p>Frontend proposto para teste das funcionalidades</p>
      </header>
      <main className="w-full px-20">
        <div
          className={clsx(
            "flex h-64 w-full flex-col items-center justify-center gap-2 border-4 border-dashed border-sky-600 transition-colors",
            dragging && "bg-sky-50",
          )}
          onDrop={handleFileDrop}
          onDragOver={handleFileDragOver}
          onDragLeave={handleFileDragLeave}
        >
          <FileUp className="stroke-sky-600" size="60" />
          <span>Arraste seu arquivo .csv para começar</span>
          <span>ou</span>
          <button
            className="rounded-lg bg-sky-100 px-4 py-2"
            onClick={handleUploadClick}
          >
            Selecione um arquivo
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </main>
    </div>
  );
}
