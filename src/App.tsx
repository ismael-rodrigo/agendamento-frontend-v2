import SchedulePage from "./pages/schedulePage"
import './Global.css'
import { RecoveryUserPage } from "./pages/RecoveryUserPage"
import { Route, Routes } from "react-router-dom"
import { ChangePasswordPage } from "./pages/ChangePasswordPage"
import { LandingPage } from "./pages/landingPage"
import EasySchedulePage from "./pages/EasySchedulePage"


function App() {



  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/agendamento" element={<SchedulePage/>} />
        <Route path="/agendamento-facil" element={<EasySchedulePage/>} />
        <Route path="/recuperar" element={<RecoveryUserPage/>} />
        <Route path="/redefinir-senha" element={<ChangePasswordPage/>} />
      </Routes>
    </div>
  )
}

export default App
