import { PatientDetails } from ".";
import { usePatientStore } from "../store"


export function PatientsList() {

  const patient = usePatientStore( state => state.patients );
  console.log(patient);

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      {
        patient.length ? (
          <>
            <h2 className=" font-black text-3xl text-center">
              Listado de Pacientes
            </h2>
            <p className=" text-xl mt-5 mb-10 text-center">
              Administra tus {''}
              <span className=" text-indigo-600 font-bold">
                Pacientes y Citas
              </span>
            </p>
            {
              patient.map( patient => (
                <PatientDetails key={ patient.id } patient={ patient } />
              ))
            }
          </>
        ) : (
          <>
            <h2 className=" font-black text-3xl text-center">
              No hay Pacientes
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando pacientes {''}
              <span className=" text-indigo-600 font-bold">
                y apareceran en este lugar
              </span>
            </p>
          </>
        )
      }
    </div>
  )
}

