(() => {
 'use strict';

 //========================================================
 // NEUROLEARN 2.0
 // Motor de estudiantes, evaluaciones y panel docente
 //========================================================

 const $ = (selector, root = document) => root.querySelector(selector);

 const read = key => {
  try {
   const value = JSON.parse(localStorage.getItem(key));
   return Array.isArray(value) ? value : [];
  } catch {
   return [];
  }
 };

 const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
 };

 const nl = window.NEUROLEARN || {};

 const questions = nl.questions || {};
 const courses = nl.courses || [];
 const levels = nl.levels || ['Básico', 'Intermedio', 'Avanzado'];
 const subjects = nl.subjects || ['Administración', 'Contabilidad'];

 const getResults = () => read('nl_results');
 const getAssignments = () => read('nl_assignments');

 const studentName = () =>
  (localStorage.getItem('nl_student_name') || '').trim() || 'Estudiante';

 const escapeHTML = value =>
  String(value ?? '').replace(/[&<>"']/g, c => ({
   '&': '&amp;',
   '<': '&lt;',
   '>': '&gt;',
   '"': '&quot;',
   "'": '&#39;'
  }[c]));

 const formatDate = value => {
  const date = new Date(value);
  return isNaN(date.getTime())
   ? 'Sin fecha'
   : date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
     });
 };

 const getScore = record => Number(record.score) || 0;

 //========================================================
 // MODAL GENERAL
 //========================================================

 let lastFocus = null;

 function ensureModal() {
  let root = $('#nlModal');
  if (root) return root;

  root = document.createElement('div');
  root.id = 'nlModal';
  root.className = 'modal-backdrop hidden';

  root.innerHTML = `
   <section class="app-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="nlModalTitle"
    tabindex="-1">

    <header class="modal-header">
     <h2 id="nlModalTitle"></h2>

     <button type="button"
      class="close-button"
      data-modal-close
      aria-label="Cerrar ventana">×</button>
    </header>

    <div class="modal-content" id="nlModalContent"></div>
   </section>
  `;

  document.body.append(root);

  root.addEventListener('click', event => {
   if (
    event.target === root ||
    event.target.closest('[data-modal-close]')
   ) {
    closeModal();
   }
  });

  document.addEventListener('keydown', event => {
   if (
    event.key === 'Escape' &&
    !root.classList.contains('hidden')
   ) {
    closeModal();
   }
  });

  return root;
 }

 function openModal(title, content) {
  const root = ensureModal();

  lastFocus = document.activeElement;

  $('#nlModalTitle', root).textContent = title;
  $('#nlModalContent', root).innerHTML = content;

  root.classList.remove('hidden');
  document.body.classList.add('modal-open');

  $('.app-modal', root).focus();
 }

 function closeModal() {
  const root = $('#nlModal');
  if (!root) return;

  root.classList.add('hidden');
  document.body.classList.remove('modal-open');

  if (lastFocus?.isConnected) {
   lastFocus.focus();
  }
 }

 //========================================================
 // PROGRESO DEL ESTUDIANTE
 //========================================================

 const passedLevels = (student, subject) =>
  new Set(
   getResults()
    .filter(record =>
     String(record.student).toLowerCase() === student.toLowerCase() &&
     record.subject === subject &&
     record.passed === true
    )
    .map(record => record.level)
  );

 const passedCount = (student, subject) =>
  levels.filter(level =>
   passedLevels(student, subject).has(level)
  ).length;

 const currentLevel = (student, subject) =>
  levels.find(level =>
   !passedLevels(student, subject).has(level)
  ) || null;

 //========================================================
 // INICIALIZACIÓN ESTUDIANTE
 //========================================================

 const nameInput = $('#studentName');

 if (nameInput) {
  nameInput.value = localStorage.getItem('nl_student_name') || '';

  nameInput.addEventListener('input', () => {
   localStorage.setItem('nl_student_name', nameInput.value.trim());
   renderStudent();
  });

  renderStudent();
 }

 function renderStudent() {
  if (!$('#studentSummary') || !$('#subjects')) return;

  const name = studentName();

  const results = getResults().filter(record =>
   String(record.student).toLowerCase() === name.toLowerCase()
  );

  const assignments = getAssignments().filter(record =>
   String(record.student).toLowerCase() === name.toLowerCase()
  );

  const avg = results.length
   ? Math.round(
    results.reduce((sum, record) =>
     sum + getScore(record), 0
    ) / results.length
   )
   : 0;

  // Resumen
  $('#studentSummary').innerHTML = `
   <div class="stat-card">
    <small>Evaluaciones</small>
    <strong>${results.length}</strong>
    <span>completadas</span>
   </div>

   <div class="stat-card">
    <small>Promedio</small>
    <strong>${avg}%</strong>
    <span>de tus intentos</span>
   </div>

   <div class="stat-card">
    <small>Cursos asignados</small>
    <strong>${assignments.length}</strong>
    <span>por tu docente</span>
   </div>
  `;

  // Materias
  $('#subjects').innerHTML = subjects.map(subject => {
   const level = currentLevel(name, subject);
   const done = passedCount(name, subject);
   const complete = !level;
   const passed = passedLevels(name, subject);

   return `
    <article class="subject-card">

     <div class="subject-head">
      <span class="subject-symbol">
       ${subject === 'Administración' ? 'A' : 'C'}
      </span>

      <span class="level-pill">
       ${complete ? 'Completado' : `Nivel ${done + 1} de ${levels.length}`}
      </span>
     </div>

     <h3>${escapeHTML(subject)}</h3>

     <p>
      ${complete
       ? 'Has completado todos los niveles.'
       : `Tu siguiente evaluación es de nivel ${escapeHTML(level)}.`
      }
     </p>

     <div class="level-track">
      ${levels.map(l => `
       <span class="${passed.has(l) ? 'filled' : ''}"></span>
      `).join('')}
     </div>

     <button class="button"
      data-start="${escapeHTML(subject)}"
      ${complete ? 'disabled' : ''}>
      ${complete ? 'Completado' : 'Iniciar evaluación'}
     </button>

    </article>
   `;
  }).join('');

  $('#subjects').querySelectorAll('[data-start]').forEach(button => {
   button.addEventListener('click', () => {
    startExam(button.dataset.start, name);
   });
  });

  // Cursos asignados
  const assignedContainer = $('#assignedCourses');

  if (assignedContainer) {
   assignedContainer.innerHTML = assignments.length
    ? assignments.map(assignment => {
     const course = courses.find(c => c.id === assignment.courseId);

     if (!course) return '';

     return `
      <article class="course-row">
       <div>
        <span class="eyebrow">${escapeHTML(course.subject)}</span>
        <h3>${escapeHTML(course.title)}</h3>
        <p>${escapeHTML(course.description)}</p>

        ${assignment.message
         ? `<small>Mensaje: ${escapeHTML(assignment.message)}</small>`
         : ''}
       </div>

       <span class="status-tag">Asignado</span>
      </article>
     `;
    }).join('')
    : `
     <div class="empty-state">
      Todavía no tienes cursos asignados.
      Cuando tu docente te asigne uno, aparecerá aquí.
     </div>
    `;
  }

  // Historial
  const historyContainer = $('#studentHistory');

  if (historyContainer) {
   historyContainer.innerHTML = results.length
    ? `
     <table>
      <thead>
       <tr>
        <th>Materia</th>
        <th>Nivel</th>
        <th>Resultado</th>
        <th>Fecha</th>
        <th>Estado</th>
        <th>Revisión</th>
       </tr>
      </thead>

      <tbody>
       ${results.slice().reverse().map(record => `
        <tr>
         <td>${escapeHTML(record.subject)}</td>
         <td>${escapeHTML(record.level)}</td>
         <td>${getScore(record)}/100</td>
         <td>${formatDate(record.date)}</td>

         <td>
          <span class="${record.passed
           ? 'status-tag'
           : 'status-tag status-warn'}">
           ${record.passed ? 'Aprobado' : 'Por reforzar'}
          </span>
         </td>

         <td>
          <button type="button"
           class="table-action"
           data-review="${record.id}">
           Ver examen
          </button>
         </td>
        </tr>
       `).join('')}
      </tbody>
     </table>
    `
    : `
     <div class="empty-state">
      Aún no hay evaluaciones registradas.
     </div>
    `;

   historyContainer.querySelectorAll('[data-review]').forEach(button => {
    button.addEventListener('click', () => {
     const record = getResults().find(r =>
      String(r.id) === button.dataset.review
     );

     if (record) showReview(record);
    });
   });
  }
 }

 //========================================================
 // MOTOR DE EVALUACIONES
 //========================================================

 function startExam(subject, student) {
  const level = currentLevel(student, subject);

  if (!level) {
   openModal(
    'Materia completada',
    '<p>Ya aprobaste todos los niveles de esta materia.</p>'
   );
   return;
  }

  // Genera un nuevo examen mezclando opciones
  const list = typeof nl.getAssessment === 'function'
   ? nl.getAssessment(subject, level)
   : questions[`${subject}|${level}`];

  if (!Array.isArray(list) || !list.length) {
   openModal(
    'Evaluación no disponible',
    '<p>No se encontró un banco de preguntas para esta materia y nivel.</p>'
   );
   return;
  }

  let index = 0;
  const answers = Array(list.length).fill(null);

  function draw() {
   const q = list[index];
   const selected = answers[index];

   openModal(
    `Evaluación · ${subject}`,
    `
     <div class="exam-modal">

      <div class="exam-top">
       <div>
        <span class="eyebrow">${escapeHTML(level)}</span>
        <h3>Pregunta ${index + 1} de ${list.length}</h3>
       </div>

       <span class="exam-meta">
        ${Math.round(((index + 1) / list.length) * 100)}%
       </span>
      </div>

      <div class="exam-progress">
       <span style="width:${((index + 1) / list.length) * 100}%"></span>
      </div>

      <p class="question-text">${escapeHTML(q.text)}</p>

      <div class="answer-options">
       ${q.options.map((option, i) => `
        <button type="button"
         class="answer-option ${selected === i ? 'selected' : ''}"
         data-answer="${i}">

         <span>${String.fromCharCode(65 + i)}</span>
         ${escapeHTML(option)}

        </button>
       `).join('')}
      </div>

      <div class="exam-actions">

       <button type="button"
        class="button button-outline"
        id="cancelExam">
        Salir
       </button>

       <button type="button"
        class="button button-outline"
        id="previousQuestion"
        ${index === 0 ? 'disabled' : ''}>
        ← Anterior
       </button>

       <button type="button"
        class="button"
        id="nextQuestion"
        ${selected === null ? 'disabled' : ''}>
        ${index === list.length - 1
         ? 'Revisar y finalizar'
         : 'Siguiente →'}
       </button>

      </div>
     </div>
    `
   );

   // Seleccionar respuesta
   $('#nlModalContent').querySelectorAll('[data-answer]').forEach(button => {
    button.addEventListener('click', () => {
     answers[index] = Number(button.dataset.answer);

     $('#nlModalContent').querySelectorAll('[data-answer]').forEach(option => {
      option.classList.toggle(
       'selected',
       Number(option.dataset.answer) === answers[index]
      );
     });

     $('#nextQuestion').disabled = false;
    });
   });

   // Salir del examen
   $('#cancelExam').addEventListener('click', () => {
    openModal(
     '¿Salir de la evaluación?',
     `
      <p>Si sales ahora, este intento no se guardará.</p>

      <div class="modal-actions">
       <button class="button button-outline" id="keepExam">
        Continuar
       </button>

       <button class="button" id="confirmExit">
        Salir
       </button>
      </div>
     `
    );

    $('#keepExam').addEventListener('click', draw);
    $('#confirmExit').addEventListener('click', () => {
     closeModal();
     renderStudent();
    });
   });

   // Regresar
   $('#previousQuestion').addEventListener('click', () => {
    if (index > 0) {
     index--;
     draw();
    }
   });

   // Avanzar
   $('#nextQuestion').addEventListener('click', () => {
    if (answers[index] === null) return;

    if (index < list.length - 1) {
     index++;
     draw();
    } else {
     confirmFinish();
    }
   });
  }

  // Confirmar entrega
  function confirmFinish() {
   const unanswered = answers.filter(answer => answer === null).length;

   openModal(
    unanswered
     ? 'Evaluación incompleta'
     : '¿Finalizar evaluación?',
    `
     <p>
      ${unanswered
       ? `Tienes ${unanswered} ${unanswered === 1
        ? 'pregunta sin responder'
        : 'preguntas sin responder'}.`
       : 'Revisa tus respuestas antes de entregar.'}
     </p>

     <p>
      Una vez entregada, no podrás modificar tus respuestas.
     </p>

     <div class="modal-actions">
      <button class="button button-outline" id="returnExam">
       Seguir revisando
      </button>

      <button class="button" id="confirmFinish">
       Entregar evaluación
      </button>
     </div>
    `
   );

   $('#returnExam').addEventListener('click', draw);
   $('#confirmFinish').addEventListener('click', finish);
  }

  // Calificar y guardar
  function finish() {
   const correct = answers.filter((answer, i) =>
    answer === list[i].answer
   ).length;

   const score = Math.round((correct / list.length) * 100);
   const passed = score >= 80;

   const review = list.map((q, i) => ({
    question: q.text,
    options: q.options.slice(),
    selectedIndex: answers[i],
    selectedAnswer: answers[i] === null
     ? 'Sin responder'
     : q.options[answers[i]],
    correctIndex: q.answer,
    correctAnswer: q.options[q.answer],
    topic: q.topic,
    explanation: q.explanation || 'Repasa este concepto para fortalecer tus conocimientos.'
   }));

   const mistakes = list
    .filter((q, i) => answers[i] !== q.answer)
    .map(q => ({
     topic: q.topic,
     question: q.text,
     correctAnswer: q.options[q.answer]
    }));

   const record = {
    id: Date.now(),
    student,
    subject,
    level,
    score,
    correct,
    total: list.length,
    passed,
    date: new Date().toISOString(),
    mistakes,
    review
   };

   const all = getResults();
   all.push(record);
   write('nl_results', all);

   renderStudent();
   showResult(record);
  }

  draw();
 }

 //========================================================
 // RESULTADOS
 //========================================================

 function showResult(record) {
  const mistakes = record.mistakes || [];

  openModal(
   'Resultado de evaluación',
   `
    <div class="result-card">

     <span class="eyebrow">EVALUACIÓN FINALIZADA</span>

     <div class="result-score">
      ${getScore(record)}<small>/100</small>
     </div>

     <h3>
      ${record.passed
       ? '¡Buen trabajo!'
       : 'Vamos a reforzar algunos temas'}
     </h3>

     <p>
      Respondiste correctamente ${record.correct} de ${record.total} preguntas.
      ${record.passed
       ? 'Aprobaste este nivel.'
       : 'Necesitas al menos 80% para aprobar.'}
     </p>

     <div class="result-stats">
      <div>
       <strong>${record.correct}</strong>
       <span>Correctas</span>
      </div>

      <div>
       <strong>${record.total - record.correct}</strong>
       <span>Incorrectas</span>
      </div>

      <div>
       <strong>${record.score}%</strong>
       <span>Calificación</span>
      </div>
     </div>

     ${mistakes.length
      ? `
       <div class="mistake-list">
        <h4>Temas para repasar</h4>

        ${mistakes.map(m => `
         <div>
          <b>${escapeHTML(m.topic || 'Tema general')}</b>
          <p>${escapeHTML(m.question)}</p>
         </div>
        `).join('')}
       </div>
      `
      : `
       <p class="success-note">
        Todas tus respuestas fueron correctas.
       </p>
      `
     }

     <div class="modal-actions">
      <button class="button button-outline" id="reviewAnswers">
       Revisar mis respuestas
      </button>

      <button class="button" id="backToSubjects">
       Volver a mis materias
      </button>
     </div>

    </div>
   `
  );

  $('#reviewAnswers').addEventListener('click', () => {
   showReview(record);
  });

  $('#backToSubjects').addEventListener('click', () => {
   closeModal();
   renderStudent();
  });
 }

 //========================================================
 // REVISIÓN DE EXAMEN
 // Compatible con resultados anteriores
 //========================================================

 
function showReview(record) {
    if (!record) return;

    const review = Array.isArray(record.review) ? record.review : [];

    const safe = value => {
        const div = document.createElement('div');
        div.textContent = String(value ?? '');
        return div.innerHTML;
    };

    const total = review.length;
    const correct = review.filter(item => {
        if (Number.isInteger(item.selectedIndex) &&
            Number.isInteger(item.correctIndex)) {
            return item.selectedIndex === item.correctIndex;
        }

        return item.selectedAnswer != null &&
            item.correctAnswer != null &&
            item.selectedAnswer === item.correctAnswer;
    }).length;

    const incorrect = total - correct;
    const percentage = total ? Math.round((correct / total) * 100) : 0;

    const subject = safe(record.subject || 'Evaluación');
    const level = safe(record.level || '');
    const passed = typeof record.passed === 'boolean'
        ? record.passed
        : percentage >= 80;

    const questionsHTML = review.length
        ? review.map((item, index) => {
            const isAnswered = item.selectedAnswer != null ||
                Number.isInteger(item.selectedIndex);

            const isCorrect = Number.isInteger(item.selectedIndex) &&
                Number.isInteger(item.correctIndex)
                ? item.selectedIndex === item.correctIndex
                : item.selectedAnswer != null &&
                    item.correctAnswer != null &&
                    item.selectedAnswer === item.correctAnswer;

            const statusClass = isCorrect ? 'review-correct' : 'review-incorrect';
            const statusText = isCorrect ? 'Correcta' : 'Incorrecta';

            const selectedAnswer = isAnswered
                ? safe(item.selectedAnswer ?? 'Respuesta seleccionada')
                : 'Sin responder';

            const correctAnswer = safe(item.correctAnswer || 'No disponible');
            const explanation = safe(
                item.explanation || 'No hay una explicación disponible para este reactivo.'
            );
            const topic = safe(item.topic || 'Tema general');
            const question = safe(item.question || `Pregunta ${index + 1}`);

            return `
                <article class="review-question ${statusClass}">
                    <div class="review-question-head">
                        <div class="review-number">${String(index + 1).padStart(2, '0')}</div>
                        <div class="review-question-title">
                            <span class="review-topic">${topic}</span>
                            <h3>${question}</h3>
                        </div>
                        <span class="review-status">
                            <span class="review-status-dot"></span>
                            ${statusText}
                        </span>
                    </div>

                    <div class="review-answers">
                        <div class="review-answer review-user-answer ${isCorrect ? 'answer-success' : 'answer-error'}">
                            <span class="review-answer-label">
                                <span class="review-answer-icon">${isCorrect ? '✓' : '✕'}</span>
                                Tu respuesta
                            </span>
                            <p>${selectedAnswer}</p>
                        </div>

                        ${!isCorrect ? `
                            <div class="review-answer review-right-answer">
                                <span class="review-answer-label">
                                    <span class="review-answer-icon">✓</span>
                                    Respuesta correcta
                                </span>
                                <p>${correctAnswer}</p>
                            </div>
                        ` : ''}
                    </div>

                    <div class="review-explanation">
                        <div class="review-explanation-icon">✦</div>
                        <div>
                            <strong>Explicación pedagógica</strong>
                            <p>${explanation}</p>
                        </div>
                    </div>
                </article>
            `;
        }).join('')
        : `
            <div class="review-empty">
                <span class="review-empty-icon">ⓘ</span>
                <h3>No hay respuestas disponibles</h3>
                <p>No se encontró el detalle de esta evaluación.</p>
            </div>
        `;

    const html = `
        <div class="review-container">

            <section class="review-summary">
                <div class="review-summary-top">
                    <div>
                        <span class="review-eyebrow">RESULTADO DE APRENDIZAJE</span>
                        <h2>Revisión de respuestas</h2>
                        <p>${subject}${level ? ` · Nivel ${level}` : ''}</p>
                    </div>

                    <span class="review-result-badge ${passed ? 'result-approved' : 'result-pending'}">
                        <span></span>
                        ${passed ? 'Nivel aprobado' : 'Necesitas reforzar'}
                    </span>
                </div>

                <div class="review-score-area">
                    <div class="review-score-circle" style="--score:${percentage}%">
                        <div class="review-score-inner">
                            <strong>${percentage}%</strong>
                            <span>Resultado</span>
                        </div>
                    </div>

                    <div class="review-score-details">
                        <strong>${correct} de ${total}</strong>
                        <span>respuestas correctas</span>
                        <div class="review-progress">
                            <span style="width:${percentage}%"></span>
                        </div>
                        <small>${passed
                            ? '¡Buen trabajo! Continúa fortaleciendo tus conocimientos.'
                            : 'Revisa las explicaciones para identificar tus áreas de oportunidad.'
                        }</small>
                    </div>
                </div>

                <div class="review-statistics">
                    <div class="review-stat review-stat-correct">
                        <span class="review-stat-icon">✓</span>
                        <div>
                            <strong>${correct}</strong>
                            <small>Correctas</small>
                        </div>
                    </div>

                    <div class="review-stat review-stat-incorrect">
                        <span class="review-stat-icon">✕</span>
                        <div>
                            <strong>${incorrect}</strong>
                            <small>Incorrectas</small>
                        </div>
                    </div>

                    <div class="review-stat review-stat-total">
                        <span class="review-stat-icon">☰</span>
                        <div>
                            <strong>${total}</strong>
                            <small>Reactivos</small>
                        </div>
                    </div>
                </div>
            </section>

            <div class="review-list-heading">
                <div>
                    <span class="review-eyebrow">ANÁLISIS INDIVIDUAL</span>
                    <h3>Detalle de tus respuestas</h3>
                </div>
                <span class="review-count">${total} preguntas</span>
            </div>

            <section class="review-list">
                ${questionsHTML}
            </section>

            <div class="review-footer">
                <div>
                    <strong>El aprendizaje continúa</strong>
                    <p>Utiliza estas explicaciones para reforzar los temas que necesitas mejorar.</p>
                </div>
                <button type="button" class="review-close-button" id="reviewClose">
                    Cerrar revisión
                </button>
            </div>
        </div>
    `;

    openModal('Revisión de respuestas', html);

    const closeButton = document.querySelector('#reviewClose');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
}


 //========================================================
 // PANEL DOCENTE - CORREGIDO
 //========================================================

 const teacherStats = $('#teacherStats');

 if (teacherStats) {

  const table = $('#evaluationTable');
  const courseSelect = $('#courseSelect');
  const courseCatalog = $('#courseCatalog');
  const assignForm = $('#assignForm');
  const exportButton = $('#exportResults');

  // Validar catálogo
  const availableCourses = Array.isArray(courses)
   ? courses.filter(course =>
      course &&
      course.id &&
      course.title &&
      course.subject
     )
   : [];

  //========================================================
  // ESTADÍSTICAS DOCENTES
  //========================================================

  function renderTeacher() {
   const results = getResults();

   const students = new Set(
    results.map(record =>
     String(record.student || '').trim().toLowerCase()
    ).filter(Boolean)
   );

   const avg = results.length
    ? Math.round(
     results.reduce((sum, record) =>
      sum + getScore(record), 0
     ) / results.length
    )
    : 0;

   teacherStats.innerHTML = `
    <div class="stat-card">
     <small>Evaluaciones realizadas</small>
     <strong>${results.length}</strong>
     <span>Intentos registrados</span>
    </div>

    <div class="stat-card">
     <small>Estudiantes activos</small>
     <strong>${students.size}</strong>
     <span>Con actividad académica</span>
    </div>

    <div class="stat-card">
     <small>Promedio general</small>
     <strong>${avg}%</strong>
     <span>Resultados de evaluaciones</span>
    </div>
   `;
  }

  //========================================================
  // TABLA DE EVALUACIONES
  //========================================================

  function renderTable() {
   if (!table) return;

   const rows = getResults().slice().reverse();

   if (!rows.length) {
    table.innerHTML = `
     <div class="empty-state">
      Aún no hay evaluaciones registradas.
      Los resultados aparecerán aquí cuando los estudiantes
      completen sus evaluaciones.
     </div>
    `;
    return;
   }

   table.innerHTML = `
    <table>
     <thead>
      <tr>
       <th>Estudiante</th>
       <th>Materia</th>
       <th>Nivel</th>
       <th>Resultado</th>
       <th>Fecha</th>
       <th>Análisis</th>
      </tr>
     </thead>

     <tbody>
      ${rows.map(record => `
       <tr>
        <td>${escapeHTML(record.student)}</td>
        <td>${escapeHTML(record.subject)}</td>
        <td>${escapeHTML(record.level)}</td>
        <td>
         <strong>${getScore(record)}%</strong>
        </td>
        <td>${formatDate(record.date)}</td>
        <td>
         <button
          type="button"
          class="table-action"
          data-detail="${escapeHTML(record.id)}">
          Ver análisis
         </button>
        </td>
       </tr>
      `).join('')}
     </tbody>
    </table>
   `;

   table.querySelectorAll('[data-detail]').forEach(button => {
    button.addEventListener('click', () => {
     showDetail(button.dataset.detail);
    });
   });
  }

  //========================================================
  // ANÁLISIS INDIVIDUAL
  //========================================================

  function showDetail(id) {
   const record = getResults().find(item =>
    String(item.id) === String(id)
   );

   if (!record) return;

   const mistakes = Array.isArray(record.mistakes)
    ? record.mistakes
    : [];

   const related = availableCourses.filter(course =>
    course.subject === record.subject
   );

   openModal(
    'Análisis de evaluación',
    `
     <div class="detail-card">

      <div class="detail-heading">
       <div>
        <span class="eyebrow">
         ${escapeHTML(record.subject)} · ${escapeHTML(record.level)}
        </span>

        <h3>${escapeHTML(record.student)}</h3>
       </div>

       <strong>${getScore(record)}%</strong>
      </div>

      <p>
       ${record.passed
        ? 'El estudiante aprobó la evaluación.'
        : 'El estudiante necesita reforzar los conocimientos de este nivel.'}
      </p>

      <div class="result-stats">
       <div>
        <strong>${record.correct ?? 0}</strong>
        <span>Correctas</span>
       </div>

       <div>
        <strong>${Math.max(0, (record.total || 0) - (record.correct || 0))}</strong>
        <span>Incorrectas</span>
       </div>

       <div>
        <strong>${getScore(record)}%</strong>
        <span>Resultado</span>
       </div>
      </div>

      <h4>Temas que requieren atención</h4>

      ${mistakes.length
       ? `
        <ul>
         ${mistakes.map(m => `
          <li>
           <b>${escapeHTML(m.topic || 'Tema general')}</b>
           ${m.question
            ? ` — ${escapeHTML(m.question)}`
            : ''}
          </li>
         `).join('')}
        </ul>
       `
       : `
        <p>
         No se registraron temas con respuestas incorrectas.
        </p>
       `
      }

      <h4>Cursos relacionados</h4>

      ${related.length
       ? related.map(course => `
        <article class="catalog-item">
         <b>${escapeHTML(course.title)}</b>

         <span>
          ${escapeHTML(course.subject)} · ${escapeHTML(course.level)}
         </span>

         <p>${escapeHTML(course.description || '')}</p>
        </article>
       `).join('')
       : `
        <p>
         No hay cursos registrados para esta materia.
        </p>
       `
      }

      <div class="modal-actions">

       ${Array.isArray(record.review) && record.review.length
        ? `
         <button
          type="button"
          class="button button-outline"
          id="teacherReview">
          Revisar examen completo
         </button>
        `
        : ''
       }

       <button
        type="button"
        class="button"
        id="prefillAssign">
        Preparar asignación
       </button>

      </div>

     </div>
    `
   );

   const teacherReview = $('#teacherReview');

   if (teacherReview) {
    teacherReview.addEventListener('click', () => {
     showReview(record);
    });
   }

   const prefillAssign = $('#prefillAssign');

   if (prefillAssign) {
    prefillAssign.addEventListener('click', () => {
     closeModal();

     const studentField = $('#assignStudent');

     if (studentField) {
      studentField.value = record.student || '';
     }

     if (courseSelect && related.length) {
      courseSelect.value = related[0].id;
     }

     if (assignForm) {
      assignForm.scrollIntoView({
       behavior: 'smooth',
       block: 'center'
      });
     }

     if (studentField) {
      studentField.focus();
     }
    });
   }
  }

  //========================================================
  // CARGAR SELECTOR DE CURSOS
  //========================================================

  function renderCourseSelect() {
   if (!courseSelect) return;

   courseSelect.innerHTML = `
    <option value="" disabled selected>
     Selecciona un curso
    </option>

    ${availableCourses.map(course => `
     <option value="${escapeHTML(course.id)}">
      ${escapeHTML(course.title)} · ${escapeHTML(course.subject)} · ${escapeHTML(course.level)}
     </option>
    `).join('')}
   `;

   if (!availableCourses.length) {
    courseSelect.innerHTML = `
     <option value="" selected disabled>
      No hay cursos disponibles
     </option>
    `;
   }
  }

  //========================================================
  // CATÁLOGO DE CURSOS
  //========================================================

  function renderCourseCatalog() {
   if (!courseCatalog) return;

   if (!availableCourses.length) {
    courseCatalog.innerHTML = `
     <div class="empty-state">
      <strong>Catálogo vacío</strong>
      <p>
       No se encontraron cursos disponibles.
       Verifica el archivo data.js.
      </p>
     </div>
    `;
    return;
   }

   courseCatalog.innerHTML = availableCourses.map(course => `
    <article class="catalog-item">

     <b>${escapeHTML(course.title)}</b>

     <span>
      ${escapeHTML(course.subject)} · ${escapeHTML(course.level)}
     </span>

     <p>
      ${escapeHTML(course.description || 'Curso de aprendizaje NeuroLearn.')}
     </p>

    </article>
   `).join('');
  }

  //========================================================
  // ASIGNAR CURSOS
  //========================================================

  if (assignForm) {
   assignForm.addEventListener('submit', event => {
    event.preventDefault();

    const student = $('#assignStudent')?.value.trim();
    const courseId = courseSelect?.value;

    if (!student || !courseId) {
     openModal(
      'Datos incompletos',
      '<p>Selecciona un estudiante y un curso antes de continuar.</p>'
     );
     return;
    }

    const selectedCourse = availableCourses.find(course =>
     String(course.id) === String(courseId)
    );

    if (!selectedCourse) {
     openModal(
      'Curso no disponible',
      '<p>El curso seleccionado ya no está disponible en el catálogo.</p>'
     );
     renderCourseSelect();
     return;
    }

    const assignments = getAssignments();

    assignments.push({
     id: Date.now(),
     student,
     courseId: selectedCourse.id,
     message: $('#assignMessage')?.value.trim() || '',
     date: new Date().toISOString()
    });

    write('nl_assignments', assignments);

    assignForm.reset();

    renderCourseSelect();

    openModal(
     'Asignación completada',
     `
      <div class="result-card">
       <h3>Curso asignado correctamente</h3>

       <p>
        Se asignó <strong>${escapeHTML(selectedCourse.title)}</strong>
        a <strong>${escapeHTML(student)}</strong>.
       </p>

       <p>
        El recurso aparecerá en el panel del estudiante
        cuando ingrese con el mismo nombre.
       </p>

       <button
        type="button"
        class="button"
        id="closeAssignNotice">
        Aceptar
       </button>
      </div>
     `
    );

    $('#closeAssignNotice')?.addEventListener('click', closeModal);
   });
  }

  //========================================================
  // EXPORTAR RESULTADOS CSV
  //========================================================

  if (exportButton) {
   exportButton.addEventListener('click', () => {
    const rows = getResults();

    if (!rows.length) {
     openModal(
      'Sin resultados',
      '<p>No hay evaluaciones que puedan exportarse todavía.</p>'
     );
     return;
    }

    const csvRows = [
     [
      'Estudiante',
      'Materia',
      'Nivel',
      'Resultado',
      'Correctas',
      'Total',
      'Aprobado',
      'Fecha'
     ],

     ...rows.map(record => [
      record.student || '',
      record.subject || '',
      record.level || '',
      getScore(record),
      record.correct ?? '',
      record.total ?? '',
      record.passed ? 'Sí' : 'No',
      record.date
       ? new Date(record.date).toLocaleString('es-MX')
       : ''
     ])
    ];

    const csv = csvRows.map(row =>
     row.map(value =>
      `"${String(value ?? '').replace(/"/g, '""')}"`
     ).join(',')
    ).join('\r\n');

    const blob = new Blob(
     ['\ufeff' + csv],
     { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'reporte-neurolearn.csv';

    document.body.append(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
   });
  }

  //========================================================
  // ARRANQUE DOCENTE
  //========================================================

  renderTeacher();
  renderTable();
  renderCourseSelect();
  renderCourseCatalog();

 }

})();