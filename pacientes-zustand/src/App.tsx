import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { PatientForm, PatientsList } from "./components"


function App() {
  

  return (
    <>
      
        <div className="container mx-auto mt-20 text-slate-100">
          <h1 className=" font-black text-5xl text-center md:w-2/3 md:mx-auto text-slate-50">
            Seguimiento de Paciente {''}
            <span className=" text-indigo-700">Veterinaria</span>
          </h1>
        
          <div className=" mt-12 md:flex">
            <PatientForm />
            <PatientsList />
          </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default App
