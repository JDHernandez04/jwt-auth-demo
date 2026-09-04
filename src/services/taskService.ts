import { httpClient } from './httpClient'
import type { Task, NewTask } from '../types'

export async function getTasks(): Promise<Task[]> {
  const { data } = await httpClient.get<Task[]>('/tasks')
  return data
}

export async function createTask(body: NewTask): Promise<Task> {
  const { data } = await httpClient.post<Task>(`/projects/${body.projectId}/tasks`, body)
  return data
}

export async function markTaskAsDone(id: number): Promise<Task> {
  const { data } = await httpClient.patch<Task>(`/tasks/${id}`, { status: 'DONE' })
  return data
}

export async function updateTask(id: number, body: Partial<NewTask>): Promise<Task> {
  const { data } = await httpClient.put<Task>(`/tasks/${id}`, body)
  return data
}

export async function deleteTask(id: number): Promise<void> {
  await httpClient.delete(`/tasks/${id}`)
}