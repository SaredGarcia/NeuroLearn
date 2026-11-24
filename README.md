# NeuroLearn

<p align="center">
  <strong>El aprendizaje debe adaptarse al estudiante, no al revés.</strong>
</p>

<p align="center">
  Plataforma educativa para evaluar conocimientos, identificar áreas de oportunidad y dar seguimiento al progreso académico.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Status-Prototipo%20funcional-00A884?style=for-the-badge" />
</p>

---

## Descripción

NeuroLearn es un prototipo de plataforma educativa que busca fortalecer el proceso de aprendizaje mediante evaluaciones y seguimiento académico.

Está diseñado para ofrecer herramientas tanto a estudiantes como a docentes. Los estudiantes pueden realizar evaluaciones, consultar sus resultados e identificar temas que necesitan reforzar. Los docentes pueden revisar el desempeño académico y asignar cursos de manera manual.

El objetivo es facilitar la identificación de áreas de oportunidad y proporcionar información útil para orientar el aprendizaje.

## Funcionalidades principales

### Para estudiantes

- Acceso al apartado de estudiante.
- Consulta de materias disponibles.
- Evaluaciones organizadas por niveles.
- Visualización de resultados.
- Historial de evaluaciones.
- Identificación de temas por reforzar.
- Desbloqueo progresivo de niveles.
- Consulta de cursos asignados.

### Para docentes

- Consulta de resultados de estudiantes.
- Análisis de errores y áreas de oportunidad.
- Consulta del catálogo de cursos.
- Asignación manual de cursos.
- Confirmación de asignaciones.

### Sistema de evaluaciones

- Materias iniciales: Administración y Contabilidad.
- Niveles: Básico, Intermedio y Avanzado.
- Diez preguntas por evaluación.
- Calificación mínima aprobatoria del 80%.
- Aprobación necesaria para desbloquear el siguiente nivel.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de las páginas |
| CSS3 | Diseño y estilos responsive |
| JavaScript | Lógica e interactividad |
| LocalStorage | Persistencia local de información |
| GitHub Pages | Publicación de la demo |

El proyecto utiliza JavaScript puro, sin dependencias de React, Node.js o Python.

## Estructura del proyecto

```text
NeuroLearn/
│
├── assets/
│   └── img/
│
├── css/
│   └── styles.css
│
├── js/
│   ├── data.js
│   └── app.js
│
├── pages/
│   ├── acceso.html
│   ├── estudiante.html
│   └── docente.html
│
├── index.html
└── README.md
```

## Cómo ejecutar el proyecto

NeuroLearn no requiere instalación de dependencias ni procesos de compilación.

### Opción 1. Ejecutar localmente

1. Clona el repositorio:

```bash
git clone https://github.com/SaredGarcia/NeuroLearn.git
```

2. Entra en la carpeta:

```bash
cd NeuroLearn
```

3. Abre `index.html` en un navegador moderno.

También puedes utilizar la extensión Live Server de Visual Studio Code para ejecutarlo desde un servidor local.

### Opción 2. Consultar la demo

La aplicación está publicada mediante GitHub Pages:

**[Abrir NeuroLearn](https://saredgp-beep.github.io/NeuroLearn/)**

## Almacenamiento de información

El prototipo utiliza `localStorage` del navegador para conservar información como evaluaciones, resultados e información de seguimiento.

Esto significa que los datos permanecen en el navegador donde se utiliza la aplicación. Actualmente no existe sincronización entre diferentes dispositivos mediante un servidor central.

## Alcance actual

NeuroLearn es un prototipo funcional de interfaz y lógica de aprendizaje.

Actualmente:

- No cuenta con autenticación real de usuarios.
- No utiliza una API externa de inteligencia artificial.
- No cuenta con backend ni base de datos centralizada.
- Las preguntas y recomendaciones iniciales son contenido demostrativo.
- La asignación de cursos permanece bajo decisión del docente.

Las recomendaciones son orientativas y no sustituyen la evaluación ni las decisiones pedagógicas del docente.

## Próximas mejoras

Entre las posibles etapas de evolución del proyecto se encuentran:

- Implementación de backend con Java.
- Integración de PostgreSQL.
- Autenticación y gestión real de perfiles.
- Persistencia centralizada de resultados.
- Ampliación del banco de preguntas.
- Incorporación de contenidos académicos validados.
- Recomendaciones de aprendizaje más personalizadas.

## Autor

**Sared García**

Desarrollador Web Junior.

[GitHub](https://github.com/SaredGarcia)

---

<p align="center">
  <strong>SARED × GAPE</strong><br>
  Tecnología orientada al aprendizaje.
</p>
