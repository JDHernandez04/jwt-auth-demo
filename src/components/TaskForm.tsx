import { Alert, Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'

interface TaskFormProps {
  title: string
  setTitle: (val: string) => void
  description: string
  setDescription: (val: string) => void
  priority: string
  setPriority: (val: 'LOW' | 'MED' | 'HIGH') => void
  dueDate: string
  setDueDate: (val: string) => void
  projectId: string
  setProjectId: (val: string) => void
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
}

export function TaskForm(props: TaskFormProps) {
  return (
    <Stack spacing={3} component="form" onSubmit={props.handleSubmit}>
      <Typography variant="h6">Nueva tarea</Typography>

      {props.error && <Alert severity="error">{props.error}</Alert>}

      <TextField label="Título de la tarea" required fullWidth value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
      <TextField label="Descripción" fullWidth multiline rows={2} value={props.description} onChange={(e) => props.setDescription(e.target.value)} />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField 
          select label="Prioridad" fullWidth value={props.priority} 
          onChange={(e) => props.setPriority(e.target.value as 'LOW' | 'MED' | 'HIGH')}
        >
          <MenuItem value="LOW">Baja (LOW)</MenuItem>
          <MenuItem value="MED">Media (MED)</MenuItem>
          <MenuItem value="HIGH">Alta (HIGH)</MenuItem>
        </TextField>
        
        <TextField label="Fecha límite" type="date" required fullWidth slotProps={{ inputLabel: { shrink: true } }} value={props.dueDate} onChange={(e) => props.setDueDate(e.target.value)} />
      </Box>

      <TextField label="ID del Proyecto asociado" type="number" required fullWidth value={props.projectId} onChange={(e) => props.setProjectId(e.target.value)} />

      <Button type="submit" variant="contained" disabled={!props.valid || props.submitting}>
        {props.submitting ? 'Creando...' : 'CREAR TAREA'}
      </Button>
    </Stack>
  )
}