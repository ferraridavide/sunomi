import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import ErrorPage from "./ErrorPage.tsx";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Login.tsx";
import SignUp from "./SignUp.tsx";
import Watch from "./Watch.tsx";
import Upload from "./Upload.tsx";
import Search from "./Search.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./services/authService.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import Bench from "./Bench.tsx";
import { Configuration, DefaultConfig } from "./api/runtime.ts";
import HomePage from "./HomePage.tsx";
import '@fontsource/geist-sans/100.css';
import '@fontsource/geist-sans/200.css';
import '@fontsource/geist-sans/300.css';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/800.css';
import '@fontsource/geist-sans/900.css';
import { API_BASE_PATH } from "./lib/consts.ts";

DefaultConfig.config = new Configuration({basePath: API_BASE_PATH});

const theme = createTheme({
  typography: {
    fontFamily: "'Geist Sans', sans-serif",
  },
});



const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter basename="/cloudwatch-web">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/bench" element={<Bench />} />
              <Route path="/" element={<App />} errorElement={<ErrorPage />}>
                <Route element={<ProtectedRoute />}>
                  <Route index element={<HomePage />} />
                  <Route path="watch" element={<Watch />} />
                  <Route path="upload" element={<Upload />} />
                  <Route path="search" element={<Search />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </StrictMode>
    </AuthProvider>
  </QueryClientProvider>,
);
