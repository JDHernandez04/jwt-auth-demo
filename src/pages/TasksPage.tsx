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
        {!loading && !error && (
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} divider>
                <ListItemText 
                  primary={task.title} 
                  secondary={`Vence: ${task.dueDate.split('T')[0]} — Proyecto ID: ${task.projectId}`} 
                />
                <Chip label={task.status} color={task.status === 'DONE' ? 'success' : 'warning'} size="small" sx={{ ml: 1 }} />
                <Chip label={task.priority} size="small" sx={{ ml: 1 }} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}