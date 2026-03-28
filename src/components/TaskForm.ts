export function getTaskInput(): HTMLInputElement {
  return document.getElementById('taskInput') as HTMLInputElement
}

export function clearTaskInput(): void {
  const input = getTaskInput()
  input.value = ''
  input.focus()
}
