import LogoutIcon from '@mui/icons-material/Logout'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { ProjectForm } from '../components/ProjectForm'
import { ProjectList } from '../components/ProjectList'
import { useAuth } from '../hooks/useAuth'
import { useProjectForm } from '../hooks/useProjectForm'
import { useProjects } from '../hooks/useProjects'

export function DashboardPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { projects, loading, error, refetch } = useProjects()
  const projectForm = useProjectForm({ onSuccess: refetch })

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', mt: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, width: '100%' }}>
        <Box>
          <Typography variant="h4">
            Mis Proyectos
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => navigate('/tasks')}>
            Ir a Tareas
          </Button>
          <Button startIcon={<LogoutIcon />} color="error" variant="outlined" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Stack>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <ProjectForm {...projectForm} />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <ProjectList projects={projects} loading={loading} error={error} />
      </Paper>
    </Box>
  )
}