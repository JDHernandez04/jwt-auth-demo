import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, CircularProgress, List, ListItem, ListItemText, Paper, Typography, Chip, IconButton } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'
import { useTaskForm } from '../hooks/useTaskForm'
import { TaskForm } from '../components/TaskForm'
import { TaskEditDialog } from '../components/TaskEditDialog'
import type { Task } from '../types'

export function TasksPage() {
  const navigate = useNavigate()
  const { tasks, loading, error, refetch, completeTask, editTask, removeTask } = useTasks()
  const taskForm = useTaskForm({ onSuccess: refetch })
  
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', mt: 6, mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')}>
          Volver
        </Button>
        <Typography variant="h4">Gestión de Tareas</Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TaskForm {...taskForm} />
      </Paper>

      <Paper sx={{ p: 3 }}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        
        {!loading && !error && Array.isArray(tasks) && (
          <List>
            {tasks.map((task) => (
              <ListItem 
                key={task.id} 
                divider
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  py: 1.5 // Un poco más de espacio vertical para respirar
                }}
              >
                <ListItemText 
                  primary={task.title} 
                  secondary={`Vence: ${task.dueDate ? task.dueDate.split('T')[0] : 'Sin fecha'} — Proyecto ID: ${task.projectId}`} 
                  sx={{ width: '100%', mb: { xs: 1.5, sm: 0 }, pr: 2 }} 
                />
                
                {/* flexShrink: 0 evita que los botones se aplasten si el texto es muy largo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                  <Chip 
                    label={task.status || 'TODO'} 
                    color={task.status === 'DONE' ? 'success' : 'warning'} 
                    size="small" 
                    onClick={task.status !== 'DONE' ? () => completeTask(task.id) : undefined}
                    sx={{ cursor: task.status !== 'DONE' ? 'pointer' : 'default' }} 
                  />
                  <Chip label={task.priority || 'LOW'} size="small" />

                  <IconButton color="primary" size="small" onClick={() => setEditingTask(task)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" size="small" onClick={() => removeTask(task.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <TaskEditDialog 
        open={editingTask !== null} 
        task={editingTask} 
        onClose={() => setEditingTask(null)} 
        onSave={editTask} 
      />
    </Box>
  )
}