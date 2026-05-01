import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostSchedulerPage from "./pages/PostSchedulerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostSchedulerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
