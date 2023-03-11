import SchedulePage from "./pages/schedulePage"
import './Global.css'
import { RecoveryUserPage } from "./pages/RecoveryUserPage"

import { Route, Routes } from "react-router-dom"
import { ChangePasswordPage } from "./pages/ChangePasswordPage"
function App() {


  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<SchedulePage/>} />
        <Route path="/recuperar" element={<RecoveryUserPage/>} />
        <Route path="/redefinir-senha" element={<ChangePasswordPage/>} />
      </Routes>
    </div>
  )
}

export default App
