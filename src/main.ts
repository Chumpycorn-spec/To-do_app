import './style.css'
import type { Task } from './types/task'
import type { FilterType } from './types/common'
import { renderDashboard } from './components/Dashboard'
import { getTaskInput, clearTaskInput } from './components/TaskForm'
import { 
  createTask, 
  toggleTaskCompletion, 
  deleteTaskById, 
  isValidTaskText,
  getTaskStats
} from './utils/helpers'
import { 
  saveTasks, 
  loadTasks, 
  saveFilter, 
  loadFilter, 
  saveNextId, 
  loadNextId 
} from './utils/storage'
import { APP_CONFIG, CSS_SELECTORS } from './utils/constants'

// State container
let tasks: Task[] = []
let nextId = 1
let currentFilter: FilterType = 'all'

// DOM elements
const app = document.querySelector<HTMLDivElement>(CSS_SELECTORS.APP)!

/**
 * Initialize app with stored data and proper ID management
 */
function initializeApp(): void {
  tasks = loadTasks()
  currentFilter = loadFilter()
  nextId = loadNextId()
  
  // Ensure nextId is greater than any existing task ID
  if (tasks.length > 0) {
    const maxId = Math.max(...tasks.map(task => task.id))
    nextId = Math.max(nextId, maxId + 1)
  }
  
  render()
}

/**
 * Main rendering function
 */
function render(): void {
  app.innerHTML = renderDashboard(tasks, currentFilter)
  updateUIElements()
}

/**
 * Updates UI elements with current data
 */
function updateUIElements(): void {
  const stats = getTaskStats(tasks)
  
  // Update overview stats
  updateElement(CSS_SELECTORS.STAT_TOTAL, stats.total.toString())
  updateElement(CSS_SELECTORS.STAT_ACTIVE, stats.active.toString())
  updateElement(CSS_SELECTORS.STAT_COMPLETED, stats.completed.toString())
  
  // Update progress bar
  const progressBar = document.querySelector(CSS_SELECTORS.PROGRESS_BAR) as HTMLElement
  const progressText = document.querySelector(CSS_SELECTORS.PROGRESS_TEXT)
  
  if (progressBar) progressBar.style.width = `${stats.percentage}%`
  if (progressText) progressText.textContent = `${stats.percentage}% Complete`
}

/**
 * Safely updates element text content
 */
function updateElement(selector: string, text: string): void {
  const element = document.querySelector(selector)
  if (element) element.textContent = text
}

/**
 * Adds a new task to the list
 */
function addTask(): void {
  const input = getTaskInput()
  const text = input.value
  
  if (isValidTaskText(text)) {
    const newTask = createTask(text, nextId++)
    tasks.push(newTask)
    
    saveTasks(tasks)
    saveNextId(nextId)
    clearTaskInput()
    render()
  }
}

/**
 * Toggles task completion status
 */
function toggleTask(id: number): void {
  tasks = toggleTaskCompletion(tasks, id)
  saveTasks(tasks)
  render()
}

/**
 * Deletes a task by ID
 */
function deleteTask(id: number): void {
  tasks = deleteTaskById(tasks, id)
  saveTasks(tasks)
  render()
}

/**
 * Handles keyboard events
 */
function handleKeyPress(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    addTask()
  }
}

/**
 * Sets the current filter and saves it
 */
function setFilter(filter: FilterType): void {
  currentFilter = filter
  saveFilter(filter)
  render()
}

/**
 * Clears all completed tasks with confirmation
 */
function clearCompleted(): void {
  const stats = getTaskStats(tasks)
  if (stats.completed === 0) return
  
  const message = APP_CONFIG.CONFIRMATION_MESSAGES.CLEAR_COMPLETED(stats.completed)
  if (confirm(message)) {
    tasks = tasks.filter(task => !task.completed)
    saveTasks(tasks)
    render()
  }
}

// Make functions globally accessible for inline event handlers
declare global {
  interface Window {
    addTask: typeof addTask
    toggleTask: typeof toggleTask
    deleteTask: typeof deleteTask
    handleKeyPress: typeof handleKeyPress
    setFilter: typeof setFilter
    clearCompleted: typeof clearCompleted
  }
}

window.addTask = addTask
window.toggleTask = toggleTask
window.deleteTask = deleteTask
window.handleKeyPress = handleKeyPress
window.setFilter = setFilter
window.clearCompleted = clearCompleted

// Initialize the app when DOM is ready
initializeApp()
