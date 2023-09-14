import FileUploader from "./components/FileUploader";

import "./index.css";

const Home = () => {
  return (
    <main className="w-full">
      <div className="">
        <h1>Enviar Arquivo CSV</h1>

        <FileUploader />
      </div>
    </main>
  );
};
export default Home;
