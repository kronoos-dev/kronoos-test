import React from 'react';
import './App.css';
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import Router from "./routes";
import {QueryClient, QueryClientProvider} from 'react-query';
import TopBar from "./components/TopBar";

function App() {
    const queryClient = new QueryClient();
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <TopBar/>
                <Router/>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
