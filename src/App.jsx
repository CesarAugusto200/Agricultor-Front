import {BrowserRouter , Route , Routes } from "react-router-dom"
import AgricultPage from "./Page/AgricultPage";
import SoftwarePage from "./Page/SoftwarePage"
import DatosPage from "./Page/DatosPage";
import InforPage from "./Page/InforPage";

function RoutePrincipal(){
    return(



<div>
      
    <BrowserRouter>
      <Routes>

      <Route exact path="/" element={ <AgricultPage/>} />
              <Route path="/Software" element={<SoftwarePage/>} />
              <Route path="/Datos" element={<DatosPage/>} />
              <Route path="/Informacion" element={<InforPage/>} />
      </Routes>
    </BrowserRouter>
</div>
  );




    
}
export default RoutePrincipal