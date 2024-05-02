
type PatientDetailItemProps = {
  label: string;
  data: string;
}

export function PatientDetailItem( { label, data }: PatientDetailItemProps ) {
  return (
    <p className=" font-bold mb-3 text-slate-300 uppercase">
      { label }: { '' }
      <span className="font-normal text-gray-400 normal-case">
        { data }
      </span>
    </p>
  )
}

