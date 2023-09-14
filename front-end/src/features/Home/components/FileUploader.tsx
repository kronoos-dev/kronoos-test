import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { CsvDataGrid } from "./CsvDataGrid";
import { useCsvData } from "../store/queries/useCsvData";
import { DeleteCsv, uploadCsv } from "../../../services/csv";

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, isError, refetch } = useCsvData();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        setLoading(true);

        await uploadCsv(file).then(() => {
          refetch();
        });

        setLoading(false);

        toast.success("Enviado com sucesso");
      } catch (error) {
        setLoading(false);
        toast.error("Erro ao enviar arquivo:");
      }
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      await DeleteCsv().then(() => {
        refetch().then(() => {
          toast.info("Deletado");
        });
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Erro ao deletar os arquivos:");
    }
  };

  if (isError || !data) {
    return <div>Nenhum dado disponível.</div>;
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 mt-10 flex-col items-start">
        <a href="/CsvExemplo.csv" download>
          Baixar .CSV de exemplo
        </a>
        <div className="flex gap-2 flex-row justify-between w-full text-center items-center">
          <input type="file" onChange={handleFileChange} className=" w-2/3 py-2 px-4 border rounded-lg text-sm text-gray-600 focus:outline-none focus:ring " />
          <button onClick={handleUpload} className="relative inline-flex items-center  w-1/3 py-2 justify-center overflow-hidden text-lg font-medium  border-zinc-100 rounded-md group ">
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className="relative"> Enviar CSV</span>
          </button>

          <button
            onClick={async () => {
              setLoading(true);
              refetch().then(() => {
                toast.info("Atualizado");
              });
              setLoading(false);
            }}
            className="w-1/5"
          >
            Atualizar
          </button>
        </div>
      </div>
      <div>
        <CsvDataGrid data={data} isLoading={loading} />
      </div>
      <button
        onClick={() => {
          handleDelete();
        }}
        className="w-full bg-red-600 hover:bg-red-800"
      >
        Deletar todos dados da tabela
      </button>
    </div>
  );
};

export default FileUploader;
