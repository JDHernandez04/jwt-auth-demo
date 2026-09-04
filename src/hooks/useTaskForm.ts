import { useState } from 'react'
import { createTask } from '../services/taskService'

interface UseTaskFormOptions {
  onSuccess?: () => void
}

export function useTaskForm({ onSuccess }: UseTaskFormOptions = {}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'LOW' | 'MED' | 'HIGH'>('MED')
  const [dueDate, setDueDate] = useState('')
  const [projectId, setProjectId] = useState('')
  
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const valid = title.trim().length >= 3 && dueDate !== '' && projectId !== ''

  function reset() {
    setTitle('')
    setDescription('')
    setPriority('MED')
    setDueDate('')
    setProjectId('')
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || submitting) return

    setSubmitting(true)
    setError(null)

    try {
      await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate, 
        projectId: Number(projectId),
      })
      reset()
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la tarea')
    } finally {
      setSubmitting(false)
    }
  }

  return { title, setTitle, description, setDescription, priority, setPriority, dueDate, setDueDate, projectId, setProjectId, submitting, error, valid, handleSubmit }
}