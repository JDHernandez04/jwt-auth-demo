import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material'
import type { Project } from '../types'

interface ProjectListProps {
  projects: Project[]
  loading: boolean
  error: string | null
}

export function ProjectList({ projects, loading, error }: ProjectListProps) {
  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>
  if (!projects.length) return <Alert severity="info">No hay proyectos registrados.</Alert>

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
        Proyectos ({projects.length})
      </Typography>
      
      {/* Reemplazo preventivo: Usamos Box con flex-col en lugar de Stack */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {projects.map((project) => (
          <Box 
            key={project.id}
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: 'space-between', 
              alignItems: { xs: 'flex-start', sm: 'center' },
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
              gap: 2
            }}
          >
            <Box>
              <Typography variant="body1" sx={{ color: 'text.primary' }}>
                {project.name}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {project.description || 'Sin descripción'}
              </Typography>
              
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                ID {project.id} · Owner {project.ownerId || 'N/A'} · Creado {project.createdAt ? project.createdAt.split('T')[0] : 'Sin fecha'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
              <Button size="small" startIcon={<EditIcon />} sx={{ fontWeight: 'bold' }}>
                EDITAR
              </Button>
              <Button size="small" color="error" startIcon={<DeleteIcon />} sx={{ fontWeight: 'bold' }}>
                ELIMINAR
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}