import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
 
import { Dashboard } from './dashboard';
import { TaskService } from '../../task.service';
import { Task } from '../../task';

function isoDate(daysAgo: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
 
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
 
  return `${year}-${month}-${day}`;
}
 
function createTask(id: number, status: string, completedAt: string | null = null): Task {
  return {
    id: id,
    title: `Task ${id}`,
    status: status,
    description: '',
    createdAt: isoDate(),
    updatedAt: null,
    completedAt: completedAt
  };
}
 
describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  const tasks = signal<Task[]>([]);
 
  beforeEach(async () => {
    tasks.set([]);
 
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        {
          provide: TaskService,
          useValue: {
            tasks: tasks,
            loadTasks: () => {}
          }
        }
      ]
    }).compileComponents();
 
    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('berechnet die Erledigungsquote gerundet und kommt ohne Tasks auf 0', () => {
    expect(component.completionRate()).toBe(0);
 
    tasks.set([
      createTask(1, 'NICHT_ANGEFANGEN'),
      createTask(2, 'IN_ARBEIT'),
      createTask(3, 'FERTIG', isoDate())
    ]);
 
    expect(component.completionRate()).toBe(33);
  });
 
  it('zaehlt erledigte Tasks der letzten 7 Tage pro Tag', () => {
    tasks.set([
      createTask(1, 'FERTIG', isoDate(0)),
      createTask(2, 'FERTIG', isoDate(0)),
      createTask(3, 'FERTIG', isoDate(2)),
      createTask(4, 'FERTIG', isoDate(10)),
      createTask(5, 'IN_ARBEIT')          
    ]);
 
    const days = component.last7Days();
 
    expect(days.length).toBe(7);
    expect(days[6].count).toBe(2);   // heute
    expect(days[4].count).toBe(1);   // vorgestern
    expect(days[6].height).toBe(100);
    expect(days[4].height).toBe(50);
    expect(days.reduce((sum, day) => sum + day.count, 0)).toBe(3);
  });
});
 