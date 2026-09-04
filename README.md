# TaskFlow: Sistema de Gestión de Proyectos y Tareas

**Autor:** Julio Daniel Hernández Medrano  
**Repositorio:** [https://github.com/JDHernandez04/jwt-auth-demo](https://github.com/JDHernandez04/jwt-auth-demo)
**API utilizada** [[text](https://d3ujwk09smrk9z.cloudfront.net)]

## 1. Descripción y Problema a Resolver

TaskFlow es una plataforma web diseñada para solucionar la desorganización en la asignación y seguimiento de actividades dentro de equipos de trabajo o entornos académicos. 

El sistema centraliza la administración operativa permitiendo un control estricto mediante:
- **Estados de ejecución:** `TODO`, `IN_PROGRESS`, `DONE`.
- **Niveles de prioridad:** `LOW`, `MED`, `HIGH`.
- **Asignación y plazos:** Seguimiento de responsables (`assigneeId`) y fechas límite (`dueDate`).

Esta herramienta garantiza que el ciclo de vida de cada proyecto se monitoree correctamente de principio a fin desde cualquier navegador web.

---

## 2. Tecnologías y Herramientas

El proyecto está construido bajo un ecosistema moderno enfocado en el rendimiento y la mantenibilidad:

- **React 18:** Construcción de la interfaz de usuario basada en componentes reutilizables.
- **Vite:** Herramienta de empaquetado y entorno de desarrollo de alta velocidad.
- **TypeScript:** Implementación de tipado estático para asegurar contratos de datos robustos entre el cliente y el servidor.
- **Material UI (MUI):** Biblioteca principal para el diseño visual y la responsividad. Se hace uso intensivo de la propiedad `sx` para aplicar estilos dinámicos, eliminando en gran medida la dependencia de hojas de estilo externas.
- **Axios:** Cliente HTTP para la comunicación asíncrona con la API REST.
- **React Router DOM v6:** Gestión integral del enrutamiento interno de la aplicación.

---

## 3. Arquitectura y Estructura del Código

El código fuente se organiza bajo un enfoque de estricta separación de responsabilidades para favorecer la escalabilidad:

* **`src/components/`**: Componentes de presentación, formularios y listas modulares.
* **`src/contexts/`**: Manejo del estado global de la aplicación (ej. `AuthContext` para la sesión).
* **`src/hooks/`**: Encapsulamiento de la lógica de negocio y transacciones separada de la vista (ej. `useProjects`, `useTasks`).
* **`src/pages/`**: Vistas principales mapeadas por el enrutador.
* **`src/services/`**: Capa de red donde se centralizan los endpoints y la configuración de Axios.
* **`src/types.ts`**: Interfaces estrictas de TypeScript (`Project`, `Task`, etc.).

---

## 4. Configuración del Entorno y Despliegue

La aplicación utiliza variables de entorno para manejar la URL base de la API, separando la configuración de desarrollo y producción mediante archivos `.env.local` y `.env.example`. 

La base de datos compartida y el backend de producción apuntan a:
`VITE_API_URL=https://d3ujwk09smrk9z.cloudfront.net`

Para el empaquetado, `vite.config.ts` está configurado para resolver correctamente las rutas relativas en servidores estáticos, permitiendo su despliegue fluido en GitHub Pages bajo el repositorio `jwt-auth-demo`.

---

## 5. Autenticación y Seguridad (JWT)

El sistema integra seguridad mediante JSON Web Tokens (JWT):

- **Gestión de Sesión:** El token es almacenado de forma persistente a través de `AuthContext.tsx`.
- **Interceptores:** El archivo `httpClient.ts` intercepta todas las solicitudes HTTP salientes de Axios para adjuntar automáticamente el token en el encabezado `Authorization`.
- **Rutas Protegidas:** Cualquier intento de acceso a rutas internas sin credenciales válidas redirige automáticamente a la pantalla de inicio de sesión.

---

## 6. Operaciones CRUD y Manejo de Estado

La aplicación consume una API RESTful implementando el ciclo completo de datos:
- `GET`: Recuperación de listados de proyectos y tareas.
- `POST`: Creación de nuevas entidades.
- `PUT` / `PATCH`: Actualización de datos y modificación de estados.
- `DELETE`: Eliminación de registros.

**Validación y Optimización:** 
Los datos ingresados en los formularios son validados en el cliente antes de ser enviados, previniendo errores HTTP `400`. Además, funcionalidades de interfaz pesadas, como el ordenamiento y filtrado de listas, están optimizadas mediante `useMemo` para realizar cálculos en memoria y actualizar la interfaz sin peticiones redundantes.

---

## 7. Integración Continua (CI/CD)

El proyecto cuenta con automatización basada en GitHub Actions (`.github/workflows/ci.yml`). Ante cada evento de subida (`push`) a la rama principal, el pipeline ejecuta la instalación de dependencias, compila el código validando la rigurosidad de TypeScript y despliega la aplicación de manera automatizada.

---

## 8. Objetivo Final

TaskFlow busca ofrecer una solución limpia, escalable y segura que transforme la administración de proyectos en un proceso visual y eficiente, integrando las mejores prácticas actuales del desarrollo frontend.