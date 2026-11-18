
// ============================================================
// NEUROLEARN 3.0
// MOTOR DE EVALUACIONES Y CATÁLOGO DE CURSOS
// Compatible con app.js 2.0
// ============================================================

window.NEUROLEARN = (() => {
    'use strict';

    // --------------------------------------------------------
    // CONFIGURACIÓN GENERAL
    // --------------------------------------------------------

    const levels = ['Básico', 'Intermedio', 'Avanzado'];
    const subjects = ['Administración', 'Contabilidad'];

    const questions = {};
    const explanations = {};

    // Estructura:
    // [pregunta, opciones, índice de respuesta correcta, tema]

    const topics = {

        // ====================================================
        // ADMINISTRACIÓN - BÁSICO
        // ====================================================

        'Administración': {
            'Básico': [
                [
                    '¿Qué es la administración?',
                    ['Coordinar recursos para alcanzar objetivos', 'Registrar únicamente ingresos y gastos', 'Supervisar exclusivamente las ventas', 'Fabricar productos sin planificación'],
                    0, 'Concepto de administración'
                ],
                [
                    '¿Cuál es el propósito principal de la planeación?',
                    ['Establecer objetivos y determinar cómo alcanzarlos', 'Contratar más trabajadores', 'Eliminar todas las actividades de control', 'Registrar las operaciones contables'],
                    0, 'Planeación'
                ],
                [
                    '¿Qué permite la función de organización?',
                    ['Distribuir actividades, responsabilidades y recursos', 'Determinar exclusivamente los precios', 'Eliminar la comunicación interna', 'Evitar la asignación de responsabilidades'],
                    0, 'Organización'
                ],
                [
                    '¿Qué representan los objetivos organizacionales?',
                    ['Los resultados que una organización busca alcanzar', 'Los gastos personales de los empleados', 'Las actividades que no necesitan planificación', 'Los documentos utilizados para contratar personal'],
                    0, 'Objetivos organizacionales'
                ],
                [
                    '¿Cuál es una función del área de recursos humanos?',
                    ['Gestionar la contratación y capacitación del personal', 'Calcular exclusivamente los impuestos', 'Diseñar los productos de la empresa', 'Controlar únicamente las ventas'],
                    0, 'Recursos humanos'
                ],
                [
                    '¿Qué caracteriza a la función de dirección?',
                    ['Orientar, motivar y coordinar al personal', 'Registrar las facturas de proveedores', 'Almacenar productos terminados', 'Calcular los activos de la empresa'],
                    0, 'Dirección'
                ],
                [
                    '¿Para qué sirve el control administrativo?',
                    ['Comparar resultados con objetivos y corregir desviaciones', 'Evitar que se establezcan objetivos', 'Eliminar la supervisión de actividades', 'Sustituir la planeación'],
                    0, 'Control administrativo'
                ],
                [
                    '¿Qué es una empresa?',
                    ['Una organización que combina recursos para producir bienes o servicios', 'Un documento que registra impuestos', 'Una actividad que no necesita recursos', 'Un sistema utilizado únicamente por bancos'],
                    0, 'Concepto de empresa'
                ],
                [
                    '¿Qué busca la comunicación organizacional?',
                    ['Transmitir información y coordinar actividades', 'Impedir el intercambio de información', 'Eliminar la colaboración entre departamentos', 'Sustituir todas las funciones administrativas'],
                    0, 'Comunicación organizacional'
                ],
                [
                    '¿Qué significa eficiencia en una organización?',
                    ['Utilizar adecuadamente los recursos para obtener resultados', 'Aumentar los gastos sin evaluar resultados', 'Realizar más actividades sin objetivos', 'Reducir la calidad para terminar más rápido'],
                    0, 'Eficiencia'
                ]
            ],

            // ====================================================
            // ADMINISTRACIÓN - INTERMEDIO
            // ====================================================

            'Intermedio': [
                [
                    '¿Qué busca la planeación estratégica?',
                    ['Definir la dirección y los objetivos de largo plazo', 'Resolver únicamente problemas diarios', 'Eliminar la evaluación de resultados', 'Sustituir la estructura organizacional'],
                    0, 'Planeación estratégica'
                ],
                [
                    '¿Qué significa la letra F en el análisis FODA?',
                    ['Fortalezas', 'Finanzas', 'Funciones', 'Factores'],
                    0, 'Análisis FODA'
                ],
                [
                    '¿Cuál es la función principal de un organigrama?',
                    ['Representar la estructura y jerarquía de una organización', 'Registrar los ingresos mensuales', 'Calcular los costos de producción', 'Mostrar únicamente los productos disponibles'],
                    0, 'Organigrama'
                ],
                [
                    '¿Qué caracteriza al liderazgo participativo?',
                    ['Involucrar al equipo en la toma de decisiones', 'Imponer decisiones sin escuchar opiniones', 'Evitar la comunicación con los trabajadores', 'Delegar todas las responsabilidades sin seguimiento'],
                    0, 'Liderazgo participativo'
                ],
                [
                    '¿Qué son los indicadores KPI?',
                    ['Indicadores clave para medir el desempeño', 'Documentos utilizados para contratar personal', 'Registros exclusivos de inventarios', 'Métodos para eliminar presupuestos'],
                    0, 'Indicadores de desempeño'
                ],
                [
                    '¿Qué implica delegar correctamente?',
                    ['Asignar tareas, responsabilidades y autoridad', 'Transferir tareas sin proporcionar información', 'Evitar cualquier seguimiento', 'Eliminar la responsabilidad de los directivos'],
                    0, 'Delegación'
                ],
                [
                    '¿Cuál es el propósito de la mejora continua?',
                    ['Perfeccionar constantemente los procesos y resultados', 'Mantener todos los procesos sin cambios', 'Eliminar la evaluación de calidad', 'Aumentar actividades innecesarias'],
                    0, 'Mejora continua'
                ],
                [
                    '¿Qué comprende la cultura organizacional?',
                    ['Valores, creencias y comportamientos compartidos', 'Únicamente los recursos financieros', 'Solo los productos de una empresa', 'Exclusivamente las instalaciones físicas'],
                    0, 'Cultura organizacional'
                ],
                [
                    '¿Para qué sirve un presupuesto?',
                    ['Estimar y controlar ingresos y gastos', 'Eliminar la necesidad de planificar', 'Registrar únicamente la asistencia', 'Determinar la personalidad de los empleados'],
                    0, 'Presupuesto'
                ],
                [
                    '¿Qué es una ventaja competitiva?',
                    ['Una característica que diferencia favorablemente a una empresa', 'Una obligación fiscal de la organización', 'Un gasto que todas las empresas deben evitar', 'Una actividad que no aporta valor al cliente'],
                    0, 'Ventaja competitiva'
                ]
            ],

            // ====================================================
            // ADMINISTRACIÓN - AVANZADO
            // ====================================================

            'Avanzado': [
                [
                    '¿Cuál es el objetivo principal de Lean Management?',
                    ['Maximizar el valor y reducir actividades que no aportan valor', 'Aumentar inventarios sin analizar la demanda', 'Eliminar la evaluación de procesos', 'Incrementar actividades que generan desperdicio'],
                    0, 'Lean Management'
                ],
                [
                    '¿Cuáles son las cuatro perspectivas del Cuadro de Mando Integral?',
                    ['Financiera, clientes, procesos internos y aprendizaje y crecimiento', 'Ventas, publicidad, inventarios y producción', 'Personal, proveedores, impuestos y almacenes', 'Costos, compras, logística y contratación'],
                    0, 'Cuadro de Mando Integral'
                ],
                [
                    '¿Para qué sirve una matriz de decisión?',
                    ['Comparar alternativas mediante criterios establecidos', 'Registrar exclusivamente los movimientos bancarios', 'Eliminar las opciones disponibles', 'Sustituir la evaluación de riesgos'],
                    0, 'Matrices de decisión'
                ],
                [
                    '¿Qué busca la gestión del cambio?',
                    ['Facilitar la adaptación de las personas a transformaciones organizacionales', 'Evitar cualquier modificación de los procesos', 'Eliminar la capacitación del personal', 'Sustituir la comunicación interna'],
                    0, 'Gestión del cambio'
                ],
                [
                    '¿Qué analiza la gestión por procesos?',
                    ['Las actividades relacionadas para generar resultados', 'Únicamente los puestos directivos', 'Solo los movimientos financieros', 'Exclusivamente las campañas publicitarias'],
                    0, 'Gestión por procesos'
                ],
                [
                    '¿Qué representa el costo de oportunidad?',
                    ['El valor de la mejor alternativa a la que se renuncia', 'El total de los gastos administrativos', 'El precio original de un producto', 'El impuesto pagado por una empresa'],
                    0, 'Costo de oportunidad'
                ],
                [
                    '¿Cuál es el propósito de una estrategia de diferenciación?',
                    ['Ofrecer características valoradas que distingan a la empresa', 'Reducir todas las características del producto', 'Evitar conocer las necesidades del cliente', 'Competir únicamente mediante descuentos'],
                    0, 'Estrategia de diferenciación'
                ],
                [
                    '¿Qué busca la gestión del conocimiento?',
                    ['Organizar y aprovechar el conocimiento de la organización', 'Restringir el aprendizaje de los trabajadores', 'Eliminar la documentación de procesos', 'Evitar el intercambio de experiencias'],
                    0, 'Gestión del conocimiento'
                ],
                [
                    '¿Qué implica la responsabilidad social empresarial?',
                    ['Considerar los impactos económicos, sociales y ambientales', 'Buscar ganancias sin considerar consecuencias', 'Eliminar las relaciones con la comunidad', 'Evitar cualquier compromiso ambiental'],
                    0, 'Responsabilidad social empresarial'
                ],
                [
                    '¿Para qué sirve la planeación por escenarios?',
                    ['Prepararse para diferentes situaciones futuras posibles', 'Predecir con certeza un único futuro', 'Eliminar la evaluación de riesgos', 'Sustituir todos los objetivos organizacionales'],
                    0, 'Planeación por escenarios'
                ]
            ]
        },

        // ====================================================
        // CONTABILIDAD
        // ====================================================

        'Contabilidad': {

            // ====================================================
            // CONTABILIDAD - BÁSICO
            // ====================================================

            'Básico': [
                [
                    '¿Cuál es el objetivo principal de la contabilidad?',
                    ['Registrar y comunicar información financiera', 'Diseñar campañas publicitarias', 'Administrar exclusivamente al personal', 'Fabricar productos para su venta'],
                    0, 'Concepto de contabilidad'
                ],
                [
                    '¿Cuál es la ecuación contable fundamental?',
                    ['Activo = Pasivo + Capital', 'Activo = Ingresos - Gastos', 'Pasivo = Activo + Capital', 'Capital = Pasivo + Gastos'],
                    0, 'Ecuación contable'
                ],
                [
                    '¿Cuál de los siguientes elementos es un activo?',
                    ['Dinero disponible en caja', 'Deuda pendiente con proveedores', 'Préstamo bancario por pagar', 'Impuesto pendiente de liquidar'],
                    0, 'Activo'
                ],
                [
                    '¿Qué representa un pasivo?',
                    ['Una obligación pendiente de pago', 'El dinero aportado por los propietarios', 'Los bienes disponibles de la empresa', 'Los ingresos obtenidos por ventas'],
                    0, 'Pasivo'
                ],
                [
                    '¿Qué representa el capital contable?',
                    ['La participación residual de los propietarios', 'Las deudas totales con proveedores', 'Los gastos de operación', 'El efectivo utilizado para pagar servicios'],
                    0, 'Capital contable'
                ],
                [
                    '¿Qué información presenta el balance general?',
                    ['Activos, pasivos y capital en una fecha determinada', 'Únicamente los ingresos de un mes', 'Solo las ventas realizadas durante el año', 'Las actividades diarias de los empleados'],
                    0, 'Balance general'
                ],
                [
                    '¿Qué representan los ingresos?',
                    ['Aumentos de beneficios económicos de una entidad', 'Disminuciones de efectivo por gastos', 'Obligaciones pendientes de pago', 'Recursos utilizados exclusivamente en producción'],
                    0, 'Ingresos'
                ],
                [
                    '¿Cuál de los siguientes conceptos es un gasto?',
                    ['Pago por consumo de electricidad', 'Dinero recibido por una venta', 'Aportación de capital del propietario', 'Préstamo recibido del banco'],
                    0, 'Gastos'
                ],
                [
                    '¿Qué es una factura en una operación comercial?',
                    ['Un documento que acredita y detalla una operación', 'Un documento que sustituye todos los registros contables', 'Una autorización para contratar trabajadores', 'Un informe que presenta únicamente utilidades'],
                    0, 'Factura'
                ],
                [
                    '¿Qué registra el libro diario?',
                    ['Las operaciones económicas en orden cronológico', 'Únicamente los bienes de la empresa', 'Las metas de producción', 'Las actividades de recursos humanos'],
                    0, 'Libro diario'
                ]
            ],

            // ====================================================
            // CONTABILIDAD - INTERMEDIO
            // ====================================================

            'Intermedio': [
                [
                    '¿Qué establece el principio de partida doble?',
                    ['Cada operación mantiene el equilibrio entre cargos y abonos', 'Todas las operaciones generan únicamente ingresos', 'Los activos siempre deben ser iguales a los gastos', 'Cada operación se registra en una sola cuenta'],
                    0, 'Partida doble'
                ],
                [
                    '¿Qué tipo de saldo presenta normalmente la cuenta Caja?',
                    ['Deudor', 'Acreedor', 'Siempre nulo', 'Exclusivamente negativo'],
                    0, 'Cuenta Caja'
                ],
                [
                    '¿Qué permite conocer el estado de resultados?',
                    ['La utilidad o pérdida de un periodo', 'El domicilio fiscal de los clientes', 'La cantidad de empleados contratados', 'El valor comercial de todos los edificios'],
                    0, 'Estado de resultados'
                ],
                [
                    '¿Qué representan las cuentas por cobrar?',
                    ['Derechos de cobro a favor de la entidad', 'Deudas pendientes con proveedores', 'Gastos de mantenimiento', 'Aportaciones de los socios'],
                    0, 'Cuentas por cobrar'
                ],
                [
                    '¿Qué significa el método PEPS?',
                    ['Primeras entradas, primeras salidas', 'Primeras existencias, primeras ventas', 'Pagos estimados por periodos semanales', 'Precios establecidos para productos similares'],
                    0, 'Método PEPS'
                ],
                [
                    '¿Qué es la depreciación de un activo?',
                    ['La distribución de su importe depreciable durante su vida útil', 'El aumento automático de su valor comercial', 'La eliminación inmediata de todos sus costos', 'El registro exclusivo de su precio de compra'],
                    0, 'Depreciación'
                ],
                [
                    '¿Para qué sirve una conciliación bancaria?',
                    ['Comparar los registros contables con los del banco', 'Calcular los salarios del personal', 'Determinar los precios de venta', 'Registrar únicamente las compras a crédito'],
                    0, 'Conciliación bancaria'
                ],
                [
                    '¿Qué representan las cuentas de proveedores?',
                    ['Obligaciones por compras de bienes o servicios a crédito', 'Derechos de cobro a los clientes', 'Aportaciones de los propietarios', 'Ingresos por ventas de contado'],
                    0, 'Proveedores'
                ],
                [
                    '¿Qué es el IVA acreditable?',
                    ['IVA de compras y gastos que puede acreditarse si cumple los requisitos fiscales', 'IVA cobrado a los clientes que siempre representa una utilidad', 'Un impuesto que sustituye al ISR', 'Un ingreso adicional por ventas'],
                    0, 'IVA acreditable'
                ],
                [
                    '¿Cuál es la finalidad de los asientos de ajuste?',
                    ['Actualizar los saldos contables al cierre del periodo', 'Eliminar todas las operaciones anteriores', 'Registrar exclusivamente las ventas futuras', 'Sustituir el libro diario por el inventario'],
                    0, 'Asientos de ajuste'
                ]
            ],

            // ====================================================
            // CONTABILIDAD - AVANZADO
            // ====================================================

            'Avanzado': [
                [
                    '¿Qué significa el criterio de devengación?',
                    ['Reconocer los efectos cuando ocurren las transacciones', 'Registrar operaciones únicamente cuando se recibe efectivo', 'Reconocer ingresos solo al cierre anual', 'Registrar únicamente movimientos bancarios'],
                    0, 'Devengación'
                ],
                [
                    '¿Cómo se calcula la razón circulante?',
                    ['Activo circulante dividido entre pasivo circulante', 'Pasivo total dividido entre capital', 'Ventas netas divididas entre gastos', 'Capital dividido entre activo fijo'],
                    0, 'Razón circulante'
                ],
                [
                    '¿Cómo se calcula el margen bruto en importe?',
                    ['Ventas netas menos costo de ventas', 'Ventas netas menos impuestos por pagar', 'Activo circulante menos pasivo circulante', 'Ingresos menos aportaciones de capital'],
                    0, 'Margen bruto'
                ],
                [
                    '¿En qué consiste la depreciación por línea recta?',
                    ['Distribuir uniformemente el importe depreciable durante la vida útil', 'Incrementar el valor del activo cada año', 'Registrar todo el costo como gasto en el primer día', 'Calcular la depreciación únicamente según las ventas'],
                    0, 'Depreciación por línea recta'
                ],
                [
                    '¿Qué es una provisión contable?',
                    ['Una obligación presente de cuantía o vencimiento incierto que cumple los criterios de reconocimiento', 'Una aportación voluntaria de los socios', 'Un ingreso recibido por anticipado en todos los casos', 'Un activo cuyo valor siempre aumenta'],
                    0, 'Provisiones'
                ],
                [
                    '¿Qué representa el valor presente?',
                    ['El valor actual de flujos futuros descontados mediante una tasa', 'El importe histórico de una compra', 'El valor futuro sin considerar el tiempo', 'El total de las ventas de un ejercicio'],
                    0, 'Valor presente'
                ],
                [
                    '¿Cómo se clasifican las actividades del estado de flujos de efectivo?',
                    ['Operación, inversión y financiamiento', 'Ventas, compras y publicidad', 'Activo, pasivo y capital', 'Ingresos, gastos y depreciación'],
                    0, 'Flujos de efectivo'
                ],
                [
                    '¿Qué caracteriza a una unidad generadora de efectivo?',
                    ['Genera entradas de efectivo en gran medida independientes de otros activos', 'Está formada exclusivamente por dinero en caja', 'No participa en las operaciones de la entidad', 'Representa únicamente las deudas de la empresa'],
                    0, 'Unidad generadora de efectivo'
                ],
                [
                    '¿Cómo se calcula generalmente el capital de trabajo?',
                    ['Activo circulante menos pasivo circulante', 'Activo total menos capital contable', 'Ventas netas menos costo de ventas', 'Pasivo total menos activo fijo'],
                    0, 'Capital de trabajo'
                ],
                [
                    '¿Cuál es el objetivo de una auditoría financiera?',
                    ['Obtener evidencia para emitir una opinión sobre los estados financieros', 'Garantizar que una empresa nunca tenga pérdidas', 'Sustituir las funciones de la administración', 'Determinar exclusivamente el precio de las acciones'],
                    0, 'Auditoría financiera'
                ]
            ]
        }
    };

    // --------------------------------------------------------
    // EXPLICACIONES PEDAGÓGICAS
    // --------------------------------------------------------

    const explanationTexts = {
        'Concepto de administración': 'La administración coordina recursos humanos, materiales, financieros y tecnológicos para alcanzar objetivos mediante funciones como planeación, organización, dirección y control.',
        'Planeación': 'La planeación establece objetivos, estrategias y acciones antes de ejecutarlas. Permite anticipar necesidades y orientar los recursos.',
        'Organización': 'La organización distribuye actividades, responsabilidades, autoridad y recursos para coordinar el trabajo.',
        'Objetivos organizacionales': 'Los objetivos expresan los resultados que una organización pretende alcanzar y permiten orientar y evaluar sus actividades.',
        'Recursos humanos': 'Recursos humanos gestiona la contratación, capacitación, desarrollo y desempeño de las personas que integran la organización.',
        'Dirección': 'La dirección orienta, comunica, motiva y coordina al personal para cumplir los objetivos establecidos.',
        'Control administrativo': 'El control compara los resultados con los objetivos y estándares para detectar desviaciones y aplicar medidas correctivas.',
        'Concepto de empresa': 'Una empresa combina recursos y actividades para producir bienes o prestar servicios, buscando cumplir objetivos económicos y sociales.',
        'Comunicación organizacional': 'La comunicación organizacional transmite información y facilita la coordinación, colaboración y toma de decisiones.',
        'Eficiencia': 'La eficiencia consiste en aprovechar adecuadamente los recursos para obtener resultados, reduciendo desperdicios y costos sin comprometer la calidad.',
        'Planeación estratégica': 'La planeación estratégica establece la dirección de largo plazo de una organización considerando sus objetivos, recursos y entorno.',
        'Análisis FODA': 'El análisis FODA identifica fortalezas y debilidades internas, así como oportunidades y amenazas externas.',
        'Organigrama': 'El organigrama representa gráficamente las áreas, puestos, niveles jerárquicos y relaciones de autoridad.',
        'Liderazgo participativo': 'El liderazgo participativo incorpora opiniones del equipo en las decisiones y fomenta colaboración y compromiso.',
        'Indicadores de desempeño': 'Los KPI permiten medir el avance hacia objetivos mediante indicadores relevantes y evaluables.',
        'Delegación': 'Delegar significa asignar tareas, responsabilidad y autoridad suficiente, proporcionando recursos y seguimiento.',
        'Mejora continua': 'La mejora continua evalúa y perfecciona procesos, productos y servicios mediante cambios constantes.',
        'Cultura organizacional': 'La cultura organizacional reúne valores, creencias y comportamientos compartidos que influyen en el trabajo.',
        'Presupuesto': 'El presupuesto estima ingresos, gastos y recursos para un periodo, ayudando a planificar y controlar el dinero.',
        'Ventaja competitiva': 'Una ventaja competitiva permite diferenciarse de los competidores y ofrecer un valor superior al cliente.',
        'Lean Management': 'Lean Management busca maximizar el valor para el cliente y reducir actividades que generan desperdicio.',
        'Cuadro de Mando Integral': 'El Cuadro de Mando Integral evalúa la estrategia desde cuatro perspectivas: financiera, clientes, procesos internos y aprendizaje y crecimiento.',
        'Matrices de decisión': 'Las matrices de decisión comparan alternativas mediante criterios establecidos para facilitar elecciones estructuradas.',
        'Gestión del cambio': 'La gestión del cambio acompaña a las personas durante transformaciones organizacionales mediante comunicación, capacitación y seguimiento.',
        'Gestión por procesos': 'La gestión por procesos analiza actividades relacionadas para identificar errores, duplicidades y oportunidades de optimización.',
        'Costo de oportunidad': 'El costo de oportunidad representa el valor de la mejor alternativa que se abandona al tomar una decisión.',
        'Estrategia de diferenciación': 'La diferenciación busca que un producto o servicio destaque por características valoradas por el cliente.',
        'Gestión del conocimiento': 'La gestión del conocimiento identifica, organiza y comparte experiencias e información para mejorar decisiones e innovación.',
        'Responsabilidad social empresarial': 'La responsabilidad social empresarial considera los efectos económicos, sociales y ambientales de las operaciones.',
        'Planeación por escenarios': 'La planeación por escenarios analiza diferentes futuros posibles para anticipar riesgos y oportunidades.',
        'Concepto de contabilidad': 'La contabilidad identifica, registra y comunica información financiera que permite analizar operaciones y tomar decisiones.',
        'Ecuación contable': 'La ecuación contable establece que los activos equivalen a la suma de pasivos y capital: Activo = Pasivo + Capital.',
        'Activo': 'Los activos son recursos económicos controlados por una entidad que pueden generar beneficios económicos futuros.',
        'Pasivo': 'Los pasivos son obligaciones presentes que pueden requerir entregar efectivo, bienes o servicios para liquidarse.',
        'Capital contable': 'El capital contable representa la participación residual de los propietarios después de deducir los pasivos de los activos.',
        'Balance general': 'El balance general presenta los activos, pasivos y capital de una entidad en una fecha determinada.',
        'Ingresos': 'Los ingresos representan aumentos de beneficios económicos derivados de las actividades de una entidad.',
        'Gastos': 'Los gastos representan consumos o disminuciones de beneficios económicos relacionados con las operaciones.',
        'Factura': 'La factura documenta una operación comercial. En México, el CFDI debe cumplir los requisitos fiscales aplicables.',
        'Libro diario': 'El libro diario registra cronológicamente las operaciones económicas mediante asientos contables.',
        'Partida doble': 'La partida doble establece que cada operación afecta al menos dos cuentas y mantiene el equilibrio entre cargos y abonos.',
        'Cuenta Caja': 'Caja registra el efectivo disponible. Normalmente tiene saldo deudor porque aumenta mediante cargos y disminuye mediante abonos.',
        'Estado de resultados': 'El estado de resultados presenta ingresos, costos y gastos de un periodo para determinar la utilidad o pérdida.',
        'Cuentas por cobrar': 'Las cuentas por cobrar representan derechos de cobro derivados de ventas a crédito u otros servicios.',
        'Método PEPS': 'PEPS significa primeras entradas, primeras salidas. Se considera que las unidades adquiridas primero son las primeras en salir.',
        'Depreciación': 'La depreciación distribuye el importe depreciable de un activo durante su vida útil estimada.',
        'Conciliación bancaria': 'La conciliación bancaria compara los registros de la entidad con los del banco para explicar diferencias.',
        'Proveedores': 'Las cuentas por pagar a proveedores representan obligaciones originadas por compras de bienes o servicios a crédito.',
        'IVA acreditable': 'El IVA acreditable es el impuesto trasladado en compras y gastos que puede acreditarse cuando cumple los requisitos fiscales.',
        'Asientos de ajuste': 'Los asientos de ajuste actualizan saldos contables al cierre para reconocer operaciones y conceptos del periodo.',
        'Devengación': 'La devengación reconoce los efectos de las transacciones cuando ocurren, no necesariamente cuando se recibe o entrega efectivo.',
        'Razón circulante': 'La razón circulante se calcula dividiendo el activo circulante entre el pasivo circulante y mide liquidez de corto plazo.',
        'Margen bruto': 'El margen bruto en importe se obtiene restando el costo de ventas a las ventas netas.',
        'Depreciación por línea recta': 'La línea recta distribuye uniformemente el importe depreciable de un activo durante su vida útil.',
        'Provisiones': 'Una provisión reconoce una obligación presente de cuantía o vencimiento incierto cuando se cumplen los criterios contables.',
        'Valor presente': 'El valor presente convierte flujos futuros en una cantidad equivalente actual mediante una tasa de descuento.',
        'Flujos de efectivo': 'El estado de flujos de efectivo presenta entradas y salidas de efectivo clasificadas en operación, inversión y financiamiento.',
        'Unidad generadora de efectivo': 'Una unidad generadora de efectivo es un grupo de activos que produce entradas de efectivo en gran medida independientes.',
        'Capital de trabajo': 'El capital de trabajo se calcula restando el pasivo circulante al activo circulante.',
        'Auditoría financiera': 'La auditoría financiera obtiene evidencia suficiente y adecuada para emitir una opinión sobre los estados financieros.'
    };

    Object.assign(explanations, explanationTexts);

    // --------------------------------------------------------
    // MEZCLA DE OPCIONES - FISHER-YATES
    // --------------------------------------------------------

    function mezclarOpciones(opciones) {
        const resultado = opciones.map((texto, indiceOriginal) => ({
            texto,
            indiceOriginal
        }));

        for (let i = resultado.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [resultado[i], resultado[j]] =
                [resultado[j], resultado[i]];
        }

        return resultado;
    }

    // --------------------------------------------------------
    // CONSTRUCTOR DE PREGUNTAS
    // --------------------------------------------------------

    function construirPreguntas(subject, level, rows) {
        return rows.map((r, i) => {
            const opciones = mezclarOpciones(r[1]);

            const indiceCorrecto = opciones.findIndex(
                opcion => opcion.indiceOriginal === r[2]
            );

            return {
                id: `${subject}-${level}-${i + 1}`,
                text: r[0],
                options: opciones.map(opcion => opcion.texto),
                answer: indiceCorrecto,
                correctAnswer: r[1][r[2]],
                topic: r[3],
                explanation: explanations[r[3]] ||
                    `Este reactivo evalúa el tema ${r[3]}. Repasa sus conceptos y aplicaciones.`
            };
        });
    }

    // --------------------------------------------------------
    // CARGA DEL BANCO DE PREGUNTAS
    // --------------------------------------------------------

    Object.entries(topics).forEach(([subject, subjectLevels]) => {
        Object.entries(subjectLevels).forEach(([level, rows]) => {
            questions[`${subject}|${level}`] =
                construirPreguntas(subject, level, rows);
        });
    });

    // --------------------------------------------------------
    // GENERADOR DE EVALUACIONES
    // Cada intento mezcla nuevamente las opciones.
    // --------------------------------------------------------

    function getAssessment(subject, level) {
        if (!topics[subject] || !topics[subject][level]) {
            console.warn(`NeuroLearn: no existe evaluación para ${subject} - ${level}`);
            return [];
        }

        return construirPreguntas(
            subject,
            level,
            topics[subject][level]
        );
    }

    // --------------------------------------------------------
    // CATÁLOGO DE CURSOS
    // --------------------------------------------------------

    const courses = [
        {
            id: 'ADM-BAS-01',
            title: 'Fundamentos de administración',
            subject: 'Administración',
            level: 'Básico',
            description: 'Introducción a los conceptos, funciones y recursos administrativos.'
        },
        {
            id: 'ADM-BAS-02',
            title: 'Planeación y organización',
            subject: 'Administración',
            level: 'Básico',
            description: 'Principios para establecer objetivos y organizar actividades.'
        },
        {
            id: 'ADM-INT-01',
            title: 'Planeación estratégica',
            subject: 'Administración',
            level: 'Intermedio',
            description: 'Herramientas para establecer estrategias y analizar organizaciones.'
        },
        {
            id: 'ADM-INT-02',
            title: 'Liderazgo y gestión de equipos',
            subject: 'Administración',
            level: 'Intermedio',
            description: 'Desarrollo de habilidades para dirigir y colaborar en equipos.'
        },
        {
            id: 'ADM-ADV-01',
            title: 'Gestión y mejora de procesos',
            subject: 'Administración',
            level: 'Avanzado',
            description: 'Optimización de procesos y herramientas para mejorar resultados.'
        },
        {
            id: 'ADM-ADV-02',
            title: 'Estrategia y competitividad',
            subject: 'Administración',
            level: 'Avanzado',
            description: 'Análisis estratégico, diferenciación y toma de decisiones.'
        },
        {
            id: 'CON-BAS-01',
            title: 'Fundamentos de contabilidad',
            subject: 'Contabilidad',
            level: 'Básico',
            description: 'Conceptos contables, activos, pasivos, capital e ingresos.'
        },
        {
            id: 'CON-BAS-02',
            title: 'Registro de operaciones',
            subject: 'Contabilidad',
            level: 'Básico',
            description: 'Introducción al registro de operaciones y libro diario.'
        },
        {
            id: 'CON-INT-01',
            title: 'Contabilidad financiera',
            subject: 'Contabilidad',
            level: 'Intermedio',
            description: 'Partida doble, estados financieros y ajustes contables.'
        },
        {
            id: 'CON-INT-02',
            title: 'Control de inventarios e impuestos',
            subject: 'Contabilidad',
            level: 'Intermedio',
            description: 'Métodos de inventario y conceptos de IVA.'
        },
        {
            id: 'CON-ADV-01',
            title: 'Análisis financiero',
            subject: 'Contabilidad',
            level: 'Avanzado',
            description: 'Indicadores financieros, liquidez y rentabilidad.'
        },
        {
            id: 'CON-ADV-02',
            title: 'Contabilidad y evaluación financiera',
            subject: 'Contabilidad',
            level: 'Avanzado',
            description: 'Flujos de efectivo, valor presente, provisiones y auditoría.'
        }
    ];

    // --------------------------------------------------------
    // VALIDACIÓN DEL BANCO
    // --------------------------------------------------------

    const totalQuestions = Object.values(questions)
        .reduce((total, assessment) => total + assessment.length, 0);

    const expectedAssessments = subjects.length * levels.length;

    if (totalQuestions !== 60 || Object.keys(questions).length !== expectedAssessments) {
        console.error('NeuroLearn: el banco de preguntas no tiene la estructura esperada.');
    } else {
        console.info('NeuroLearn 3.0: banco de preguntas cargado correctamente.', {
            materias: subjects.length,
            niveles: levels.length,
            evaluaciones: Object.keys(questions).length,
            preguntas: totalQuestions,
            cursos: courses.length
        });
    }

    // --------------------------------------------------------
    // API PÚBLICA
    // --------------------------------------------------------

    return {
        questions,
        courses,
        explanations,
        getAssessment,
        levels,
        subjects
    };

})();
