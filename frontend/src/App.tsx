import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { SharedList } from "./pages/shared-list";
import { Home } from "./pages/home";
import { Favorites } from "./pages/favorites";
import { queryClient } from "./lib/react-query";
import { Register } from "./pages/register";
import { Details } from "./pages/details";
import { Toaster } from "sonner";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details/:movieId" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/share/:shareId" element={<SharedList />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
