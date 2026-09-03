import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import type { Task, NewTask } from '../types'

interface TaskEditDialogProps {
  open: boolean
  task: Task | null
  onClose: () => void
  onSave: (id: number, data: Partial<NewTask>) => Promise<void>
}

export function TaskEditDialog({ open, task, onClose, onSave }: TaskEditDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'LOW' | 'MED' | 'HIGH'>('MED')
  const [dueDate, setDueDate] = useState('')
  const [projectId, setProjectId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Cuando se abre la ventana, llenamos los campos con los datos de la tarea seleccionada
  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || '')
      setPriority(task.priority)
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '')
      setProjectId(task.projectId.toString())
    }
  }, [task])

  const valid = title.trim().length >= 3 && dueDate !== '' && projectId !== ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || !task) return
    setSubmitting(true)
    
    await onSave(task.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: new Date(dueDate).toISOString(),
      projectId: Number(projectId)
    })
    
    setSubmitting(false)
    onClose() // Cerramos el modal tras guardar
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Editar Tarea</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField label="Título de la tarea" required fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField label="Descripción" fullWidth multiline rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField select label="Prioridad" fullWidth value={priority} onChange={(e) => setPriority(e.target.value as 'LOW' | 'MED' | 'HIGH')}>
                <MenuItem value="LOW">Baja (LOW)</MenuItem>
                <MenuItem value="MED">Media (MED)</MenuItem>
                <MenuItem value="HIGH">Alta (HIGH)</MenuItem>
              </TextField>
            <TextField label="Fecha límite" type="date" required fullWidth slotProps={{ inputLabel: { shrink: true } }} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </Box>
            <TextField label="ID del Proyecto asociado" type="number" required fullWidth value={projectId} onChange={(e) => setProjectId(e.target.value)} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={submitting}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={!valid || submitting}>
            {submitting ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}