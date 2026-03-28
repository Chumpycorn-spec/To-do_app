import type { Task } from '../types/task'
import type { FilterType } from '../types/common'
import { renderTaskList } from './TaskList'
import { filterTasksByType, getFilterTitle } from '../utils/helpers'
import { APP_CONFIG } from '../utils/constants'

export function renderMainContent(tasks: Task[], currentFilter: FilterType): string {
  const filteredTasks = filterTasksByType(tasks, currentFilter)
  const totalCount = tasks.length
  const filteredCount = filteredTasks.length
  
  const emptyMessage = totalCount === 0 
    ? APP_CONFIG.EMPTY_STATE_MESSAGES.NO_TASKS
    : APP_CONFIG.EMPTY_STATE_MESSAGES.NO_FILTERED_TASKS
  
  return `
    <main class="main-content">
      <div class="content-header">
        <h1>${getFilterTitle(currentFilter)}</h1>
        <div class="task-count">
          ${filteredCount} ${filteredCount === 1 ? 'task' : 'tasks'}
          ${filteredCount !== totalCount ? ` of ${totalCount}` : ''}
        </div>
      </div>
      
      <div class="task-form-container">
        <div class="task-form">
          <input type="text" id="taskInput" placeholder="Add a new task..." 
                 onkeypress="window.handleKeyPress(event)">
          <button onclick="window.addTask()">Add Task</button>
        </div>
      </div>

      <div class="task-list-container">
        ${filteredTasks.length === 0 ? `<div class="empty-state">${emptyMessage}</div>` : renderTaskList(filteredTasks)}
      </div>
    </main>
  `
}
