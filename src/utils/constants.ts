/**
 * Application constants for better maintainability
 */

export const APP_CONFIG = {
  STORAGE_PREFIX: 'todo',
  MIN_TASK_LENGTH: 1,
  CONFIRMATION_MESSAGES: {
    CLEAR_COMPLETED: (count: number) => 
      `Are you sure you want to delete ${count} completed task${count === 1 ? '' : 's'}?`
  },
  EMPTY_STATE_MESSAGES: {
    NO_TASKS: 'No tasks found. Try adding a new task!',
    NO_FILTERED_TASKS: 'No tasks found for this filter.'
  }
} as const

export const CSS_SELECTORS = {
  APP: '#app',
  TASK_INPUT: '#taskInput',
  STAT_TOTAL: '.stat-item:nth-child(1) .stat-number',
  STAT_ACTIVE: '.stat-item:nth-child(2) .stat-number', 
  STAT_COMPLETED: '.stat-item:nth-child(3) .stat-number',
  PROGRESS_BAR: '.progress-fill',
  PROGRESS_TEXT: '.progress-text'
} as const

export const FILTER_TITLES = {
  all: 'All Tasks',
  active: 'Active Tasks', 
  completed: 'Completed Tasks'
} as const
