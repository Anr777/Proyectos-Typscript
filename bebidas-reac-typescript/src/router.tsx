
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesPage, IndexPage } from "./views";
import { Layout } from "./Layouts/Layout";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Layout /> } >
          <Route path="/" element={ <IndexPage /> } index />
          <Route path="/favoritos" element={ <FavoritesPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

