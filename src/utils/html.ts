
export function decodeHtml(value: string): string {
  if (!value) return ''
  
  const txt = document.createElement('textarea')
  txt.innerHTML = value
  return txt.value
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '')
}
