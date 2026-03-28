import type { Task } from '../types/task'
import type { FilterType } from '../types/common'
import { APP_CONFIG, FILTER_TITLES } from './constants'

/**
 * Creates a new task with the given text and ID
 */
export function createTask(text: string, id: number): Task {
  return {
    id,
    text: text.trim(),
    completed: false
  }
}

/**
 * Toggles the completion status of a task by ID
 */
export function toggleTaskCompletion(tasks: Task[], id: number): Task[] {
  return tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  )
}

/**
 * Removes a task by ID
 */
export function deleteTaskById(tasks: Task[], id: number): Task[] {
  return tasks.filter(task => task.id !== id)
}

/**
 * Validates if task text is valid (not empty after trimming)
 */
export function isValidTaskText(text: string): boolean {
  return text.trim().length >= APP_CONFIG.MIN_TASK_LENGTH
}

/**
 * Filters tasks based on the specified filter type
 */
export function filterTasksByType(tasks: Task[], filter: FilterType): Task[] {
  switch (filter) {
    case 'active':
      return tasks.filter(task => !task.completed)
    case 'completed':
      return tasks.filter(task => task.completed)
    default:
      return tasks
  }
}

/**
 * Gets the display title for a filter type
 */
export function getFilterTitle(filter: FilterType): string {
  return FILTER_TITLES[filter]
}

/**
 * Calculates task statistics
 */
export function getTaskStats(tasks: Task[]) {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const active = total - completed
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return { total, completed, active, percentage }
}
