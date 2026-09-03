import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, CircularProgress, List, ListItem, ListItemText, Paper, Typography, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'

export function TasksPage() {
  const navigate = useNavigate()
  const { tasks, loading, error } = useTasks()

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', mt: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')}>
          Volver
        </Button>
        <Typography variant="h4">Gestión de Tareas</Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        
        {/* Validamos explícitamente que 'tasks' sea un arreglo para evitar crasheos si la API devuelve algo distinto */}
        {!loading && !error && Array.isArray(tasks) && (
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} divider>
                <ListItemText 
                  primary={task.title} 
                  /* Usamos un operador ternario para comprobar que dueDate exista antes de cortarlo */
                  secondary={`Vence: ${task.dueDate ? task.dueDate.split('T')[0] : 'Sin fecha'} — Proyecto ID: ${task.projectId}`} 
                />
                <Chip label={task.status || 'TODO'} color={task.status === 'DONE' ? 'success' : 'warning'} size="small" sx={{ ml: 1 }} />
                <Chip label={task.priority || 'LOW'} size="small" sx={{ ml: 1 }} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}