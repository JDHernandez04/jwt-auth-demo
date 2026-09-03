import { httpClient } from './httpClient'
import type { Task, NewTask } from '../types'

export async function getTasks(): Promise<Task[]> {
  const { data } = await httpClient.get<Task[]>('/tasks')
  return data
}

export async function createTask(body: NewTask): Promise<Task> {
  const { data } = await httpClient.post<Task>('/tasks', body)
  return data
}