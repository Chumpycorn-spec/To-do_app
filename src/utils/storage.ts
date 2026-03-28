import type { Task } from '../types/task'
import type { FilterType } from '../types/common'

const STORAGE_KEYS = {
  TASKS: 'todo-tasks',
  FILTER: 'todo-filter',
  NEXT_ID: 'todo-next-id'
} as const

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks))
  } catch (error) {
    console.warn('Failed to save tasks to localStorage:', error)
  }
}

export function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.warn('Failed to load tasks from localStorage:', error)
    return []
  }
}

export function saveFilter(filter: FilterType): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FILTER, filter)
  } catch (error) {
    console.warn('Failed to save filter to localStorage:', error)
  }
}

export function loadFilter(): FilterType {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FILTER)
    return stored && ['all', 'completed', 'active'].includes(stored) 
      ? stored as FilterType 
      : 'all'
  } catch (error) {
    console.warn('Failed to load filter from localStorage:', error)
    return 'all'
  }
}

export function saveNextId(nextId: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NEXT_ID, nextId.toString())
  } catch (error) {
    console.warn('Failed to save nextId to localStorage:', error)
  }
}

export function loadNextId(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.NEXT_ID)
    return stored ? parseInt(stored, 10) : 1
  } catch (error) {
    console.warn('Failed to load nextId from localStorage:', error)
    return 1
  }
}

export function clearAllData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  } catch (error) {
    console.warn('Failed to clear localStorage:', error)
  }
}
