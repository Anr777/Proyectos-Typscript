import { PropsWithChildren } from "react";

export function ErrorMessage({ children } : PropsWithChildren) {
  return (
    <div>
      { children }
    </div>
  )
}

