import type { Task } from '../types/task'
import type { FilterType } from '../types/common'
import { renderSidebar } from './Sidebar'
import { renderMainContent } from './MainContent'

export function renderDashboard(tasks: Task[], currentFilter: FilterType): string {
  return `
    <div class="dashboard">
      ${renderSidebar(tasks, currentFilter)}
      ${renderMainContent(tasks, currentFilter)}
    </div>
  `
}
