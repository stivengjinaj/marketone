import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import LandingPage from "./pages/LandingPage.tsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<Navigate to={"/"}/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
