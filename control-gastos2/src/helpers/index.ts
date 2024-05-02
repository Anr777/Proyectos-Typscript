
export function formatCurrency( amount : number ) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(amount)
}

export function formatDate( dateStr : string ) : string {

  const dateObj = new Date( dateStr );
  const options : Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return new Intl.DateTimeFormat('es-PE', options).format(dateObj);

}