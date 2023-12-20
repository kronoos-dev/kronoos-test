import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./page";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}
