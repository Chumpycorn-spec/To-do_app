import type { Task } from '../types/task'

/**
 * Renders a single task item
 */
function renderTaskItem(task: Task): string {
  return `
    <div class="task-item" data-id="${task.id}">
      <input type="checkbox" ${task.completed ? 'checked' : ''} 
             onchange="window.toggleTask(${task.id})">
      <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      <button onclick="window.deleteTask(${task.id})" class="delete-btn">×</button>
    </div>
  `
}

/**
 * Renders the complete task list
 */
export function renderTaskList(tasks: Task[]): string {
  if (tasks.length === 0) {
    return '<div class="empty-state">No tasks found. Try adding a new task!</div>'
  }

  return tasks.map(renderTaskItem).join('')
}
