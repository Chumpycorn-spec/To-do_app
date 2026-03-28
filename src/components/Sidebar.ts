import type { Task } from '../types/task'
import type { FilterType } from '../types/common'
import { getTaskStats } from '../utils/helpers'

export function renderSidebar(tasks: Task[], currentFilter: FilterType): string {
  const stats = getTaskStats(tasks)

  return `
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>TODO Dashboard</h2>
      </div>
      
      <div class="task-overview">
        <h3>Overview</h3>
        <div class="overview-stats">
          <div class="stat-item">
            <span class="stat-number">${stats.total}</span>
            <span class="stat-label">Total</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${stats.active}</span>
            <span class="stat-label">Active</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${stats.completed}</span>
            <span class="stat-label">Completed</span>
          </div>
        </div>
      </div>

      <div class="filter-section">
        <h3>Filters</h3>
        <div class="filter-buttons">
          <button 
            class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" 
            onclick="window.setFilter('all')"
          >
            All Tasks
          </button>
          <button 
            class="filter-btn ${currentFilter === 'active' ? 'active' : ''}" 
            onclick="window.setFilter('active')"
          >
            Active
          </button>
          <button 
            class="filter-btn ${currentFilter === 'completed' ? 'active' : ''}" 
            onclick="window.setFilter('completed')"
          >
            Completed
          </button>
        </div>
      </div>

      <div class="actions-section">
        <h3>Actions</h3>
        <button 
          class="action-btn clear-completed" 
          onclick="window.clearCompleted()"
          ${stats.completed === 0 ? 'disabled' : ''}
        >
          Clear Completed (${stats.completed})
        </button>
      </div>

      <div class="sidebar-footer">
        <div class="progress-section">
          <h3>Progress</h3>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${stats.percentage}%"></div>
          </div>
          <div class="progress-text">
            ${stats.percentage}% Complete
          </div>
        </div>
      </div>
    </aside>
  `
}
