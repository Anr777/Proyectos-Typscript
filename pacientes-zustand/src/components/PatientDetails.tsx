import { toast } from "react-toastify";
import { Button, PatientDetailItem } from "."
import { usePatientStore } from "../store"
import { Patient } from "../types"


type PatientDetailProps = {
  patient: Patient,
}

export function PatientDetails({ patient } : PatientDetailProps ) {

  const deletPatient = usePatientStore( state => state.deletePatient );
  const getPatiendById = usePatientStore( state => state.getPatientById );

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-slate-800 shadow-md rounded-xl">
      <PatientDetailItem label="ID" data={ patient.id } />
      <PatientDetailItem label="Nombre Paciente" data={ patient.name } />
      <PatientDetailItem label="Propietario" data={ patient.caretaker } />
      <PatientDetailItem label="Correo Electronico" data={ patient.email } />
      <PatientDetailItem label="Fecha" data={ patient.date.toString() } />
      <PatientDetailItem label="Sintomas" data={ patient.symptoms } />

      {/*? Buttons */}
      <div className=" flex flex-col lg:flex-row gap-3 justify-between mt-10">
        <Button onClick={ () => getPatiendById( patient.id ) } >
          Editar
        </Button>
        <Button type="eliminar" onClick={ () => {
          deletPatient( patient.id )
          toast.error(`Paciente: ${patient.name} fue eliminado correctamente`)
        } }>
          Eliminar
        </Button>
      </div>
    </div>
  )
}

