import { useCallback, useEffect, useState } from 'react'
import { getTasks, markTaskAsDone, updateTask, deleteTask } from '../services/taskService'
import type { Task, NewTask } from '../types'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])

  const completeTask = async (id: number) => {
    try {
      await markTaskAsDone(id)
      refetch()
    } catch (err) {
      console.error('Error al completar:', err)
    }
  }

  const editTask = async (id: number, body: Partial<NewTask>) => {
    try {
      await updateTask(id, body)
      refetch()
    } catch (err) {
      console.error('Error al editar:', err)
    }
  }

  const removeTask = async (id: number) => {
    try {
      await deleteTask(id)
      refetch()
    } catch (err) {
      console.error('Error al eliminar:', err)
    }
  }

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getTasks()
      .then((data) => { if (!cancelled) setTasks(data) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [reloadKey])

  return { tasks, loading, error, refetch, completeTask, editTask, removeTask }
}