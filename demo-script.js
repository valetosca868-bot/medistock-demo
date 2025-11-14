/*=============== SIDEBAR TOGGLE ===============*/
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const mobileToggle = document.getElementById('mobile-toggle');

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-active');
    });
}

/*=============== PAGE NAVIGATION ===============*/
const navLinks = document.querySelectorAll('.nav__link');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('page-title');

const pageNames = {
    'patient-care': 'Atención al Paciente',
    'safety-checklist': 'Lista de Seguridad del Paciente',
    'pre-surgery': 'Antes de Iniciar Cirugía',
    'during-surgery': 'Durante la Cirugía',
    'post-surgery': 'Finalizada la Cirugía',
    'real-procedure': 'Procedimiento Real',
    'print-preview': 'Vista Previa',
    'dashboard': 'Dashboard',
    'inventory': 'Gestión de Inventario',
    'monthly-close': 'Cierre Mensual',
    'monthly-history': 'Historial de Cierres Mensuales',
    'monthly-close-preview': 'Vista Previa - Cierre Mensual',
    'patients': 'Gestión de Pacientes',
    'suppliers': 'Proveedores',
    'finance': 'Finanzas',
    'beds': 'Gestión de Camas',
    'reports': 'Reportes y Análisis'
};

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const pageName = link.getAttribute('data-page');

        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Show corresponding page
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(`page-${pageName}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update page title
        if (pageTitle && pageNames[pageName]) {
            pageTitle.textContent = pageNames[pageName];
        }

        // Close mobile menu if open
        sidebar.classList.remove('mobile-active');
    });
});

/*=============== CHART.JS REVENUE CHART ===============*/
window.addEventListener('load', () => {
    const ctx = document.getElementById('revenueChart');

    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                datasets: [{
                    label: 'Ingresos',
                    data: [32000, 38000, 35000, 42000, 45000, 45678],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        padding: 12,
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#2563eb',
                        borderWidth: 1,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f1f5f9',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#64748b',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    }
                }
            }
        });
    }
});

/*=============== SEARCH FUNCTIONALITY ===============*/
const searchInput = document.querySelector('.search-input');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Buscando:', searchTerm);
        // Aquí puedes implementar la lógica de búsqueda
        // Por ejemplo, filtrar tablas, tarjetas, etc.
    });
}

/*=============== TABLE INTERACTIONS ===============*/
const dataTable = document.querySelector('.data-table');

if (dataTable) {
    const rows = dataTable.querySelectorAll('tbody tr');

    rows.forEach(row => {
        // Add click effect
        row.style.cursor = 'pointer';

        row.addEventListener('click', (e) => {
            // Don't trigger if clicking on action buttons
            if (e.target.closest('.btn-icon')) {
                return;
            }

            // Remove selection from other rows
            rows.forEach(r => r.style.background = '');

            // Highlight selected row
            row.style.background = 'rgba(37, 99, 235, 0.05)';
        });
    });

    // Action buttons - ahora funcionales
    const editButtons = dataTable.querySelectorAll('.btn-icon');
    editButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const row = btn.closest('tr');
            if (row) {
                editInventoryItem(row);
            }
        });
    });
}

/*=============== NOTIFICATION SYSTEM ===============*/
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'demo-notification';

    const colors = {
        success: '#10b981',
        info: '#2563eb',
        warning: '#f59e0b',
        danger: '#ef4444'
    };

    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        border-left: 4px solid ${colors[type] || colors.info};
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
        font-size: 0.875rem;
        color: #0f172a;
    `;

    notification.textContent = message;

    // Add animation styles if not already present
    if (!document.querySelector('#notification-animation')) {
        const style = document.createElement('style');
        style.id = 'notification-animation';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/*=============== PATIENT CARD INTERACTIONS ===============*/
// Esta sección ahora se maneja con funciones específicas más abajo

/*=============== FILTER FUNCTIONALITY ===============*/
const filterSelects = document.querySelectorAll('.filter-select, .select-input');

filterSelects.forEach(select => {
    select.addEventListener('change', (e) => {
        console.log('Filtro aplicado:', e.target.value);
        applyInventoryFilters();
    });
});

function applyInventoryFilters() {
    const categoryFilter = document.getElementById('category-filter')?.value || '';
    const drugTypeFilter = document.getElementById('drug-type-filter')?.value || '';
    const statusFilter = document.getElementById('status-filter')?.value || '';

    const table = document.getElementById('inventory-table');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    let visibleCount = 0;

    rows.forEach(row => {
        const cells = row.cells;
        if (!cells || cells.length < 7) return;

        const category = cells[2].textContent;
        const type = cells[3].textContent;
        const status = cells[6].textContent;

        let showRow = true;

        if (categoryFilter && category !== categoryFilter) showRow = false;
        if (drugTypeFilter && type !== drugTypeFilter) showRow = false;
        if (statusFilter && status !== statusFilter) showRow = false;

        row.style.display = showRow ? '' : 'none';
        if (showRow) visibleCount++;
    });

    showNotification(`Mostrando ${visibleCount} items`, 'success');
}

/*=============== STATS ANIMATION ON LOAD ===============*/
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = formatStatValue(end, element.textContent);
            clearInterval(timer);
        } else {
            element.textContent = formatStatValue(Math.floor(current), element.textContent);
        }
    }, 16);
}

function formatStatValue(value, originalText) {
    if (originalText.includes('$')) {
        return '$' + value.toLocaleString();
    } else if (originalText.includes(',')) {
        return value.toLocaleString();
    }
    return value.toString();
}

// Animate stats on page load
window.addEventListener('load', () => {
    const statValues = document.querySelectorAll('.stat-value');

    statValues.forEach((stat, index) => {
        const originalText = stat.textContent;
        const numericValue = parseInt(originalText.replace(/[^0-9]/g, ''));

        if (numericValue) {
            setTimeout(() => {
                stat.textContent = originalText.includes('$') ? '$0' : '0';
                animateValue(stat, 0, numericValue, 1500);
            }, index * 100);
        }
    });
});

/*=============== PROGRESS BAR ANIMATION ===============*/
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetWidth = entry.target.style.width;
            entry.target.style.width = '0%';

            setTimeout(() => {
                entry.target.style.width = targetWidth;
            }, 100);

            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

/*=============== CARD HOVER EFFECTS ===============*/
const cards = document.querySelectorAll('.card, .stat-card, .patient-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.2s ease';
    });
});

/*=============== ALERTS INTERACTION ===============*/
const alertItems = document.querySelectorAll('.alert-item');

alertItems.forEach(alert => {
    alert.style.cursor = 'pointer';

    alert.addEventListener('click', () => {
        const title = alert.querySelector('h4').textContent;
        showNotification(`Abriendo alerta: ${title}`, 'info');
    });

    alert.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.transition = 'transform 0.2s ease';
    });

    alert.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

/*=============== KEYBOARD SHORTCUTS ===============*/
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput?.focus();
    }

    // Ctrl/Cmd + B to toggle sidebar
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        sidebar?.classList.toggle('collapsed');
    }
});

/*=============== CLOSE MOBILE SIDEBAR WHEN CLICKING OUTSIDE ===============*/
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('mobile-active');
        }
    }
});

/*=============== DEMO WELCOME MESSAGE ===============*/
window.addEventListener('load', () => {
    setTimeout(() => {
        showNotification('¡Bienvenido al demo de MediStock Pro! Explora las funcionalidades.', 'success');
    }, 500);
});

/*=============== RESPONSIVE ADJUSTMENTS ===============*/
function handleResize() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-active');
    }
}

window.addEventListener('resize', handleResize);

/*=============== LINKS INTERACTION ===============*/
const links = document.querySelectorAll('.link-small');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Mostrar detalles específicos según el enlace
        if (link.textContent.includes('Ver todas')) {
            showNotification('Mostrando todas las alertas activas', 'info');
        } else {
            showNotification('Función activa - Demo completo', 'success');
        }
    });
});

/*=============== SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/*=============== CONSOLE BRANDING ===============*/
console.log('%cMediStock Pro - Demo', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%c🏥 Sistema de Gestión Hospitalaria', 'color: #8b5cf6; font-size: 14px;');
console.log('%cEsta es una versión demo. Contacta con ventas para la versión completa.', 'color: #64748b; font-size: 12px;');

/*=============== PATIENT CARE FUNCTIONALITY ===============*/

// Base de datos de pacientes (simulada con localStorage)
function initPatientsDB() {
    if (!localStorage.getItem('patients')) {
        const defaultPatients = {
            '12345678': {
                cedula: '12345678',
                nombre: 'Juan Pérez González',
                edad: 45,
                sexo: 'Masculino',
                direccion: 'Calle Principal 123, Montevideo',
                telefono: '099 123 456'
            },
            '87654321': {
                cedula: '87654321',
                nombre: 'María García Rodríguez',
                edad: 32,
                sexo: 'Femenino',
                direccion: 'Av. Italia 456, Montevideo',
                telefono: '098 765 432'
            },
            '11223344': {
                cedula: '11223344',
                nombre: 'Carlos Rodríguez López',
                edad: 67,
                sexo: 'Masculino',
                direccion: 'Bvar. Artigas 789, Montevideo',
                telefono: '091 234 567'
            }
        };
        localStorage.setItem('patients', JSON.stringify(defaultPatients));
    }
}

// Inicializar BD al cargar
window.addEventListener('load', initPatientsDB);

// Validar que solo se ingresen números en el campo de cédula
const cedulaInput = document.getElementById('cedula-input');
if (cedulaInput) {
    cedulaInput.addEventListener('input', (e) => {
        // Remover cualquier carácter que no sea número
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Permitir buscar al presionar Enter
    cedulaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPatient();
        }
    });
}

// Validar cédula en formulario de registro
const registroCedulaInput = document.getElementById('registro-cedula');
if (registroCedulaInput) {
    registroCedulaInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
}

// Buscar paciente por cédula
function searchPatient() {
    const cedula = document.getElementById('cedula-input').value.trim();
    const patientInfoDisplay = document.getElementById('patient-info-display');
    const newPatientForm = document.getElementById('new-patient-form');

    // Validar que se haya ingresado una cédula
    if (!cedula) {
        showNotification('Por favor ingrese una cédula', 'warning');
        return;
    }

    // Validar longitud (opcional, puedes ajustarlo)
    if (cedula.length < 7 || cedula.length > 8) {
        showNotification('La cédula debe tener 7 u 8 dígitos', 'warning');
        return;
    }

    // Obtener pacientes de localStorage
    const patients = JSON.parse(localStorage.getItem('patients') || '{}');
    let patient = patients[cedula];

    // Ocultar ambos formularios primero
    patientInfoDisplay.style.display = 'none';
    newPatientForm.style.display = 'none';

    // Si el paciente no existe, crear uno temporal/simulado para el demo
    if (!patient) {
        patient = {
            cedula: cedula,
            nombre: 'Paciente Simulado',
            edad: 30,
            sexo: 'No especificado',
            direccion: 'Dirección no registrada',
            telefono: 'No especificado'
        };
        showNotification('⚠ Paciente simulado - Complete datos reales en "Registrar Nuevo Paciente"', 'info');
    } else {
        showNotification('✓ Paciente encontrado en base de datos', 'success');
    }

    // Mostrar información del paciente (real o simulado)
    document.getElementById('display-nombre').textContent = patient.nombre;
    document.getElementById('display-cedula').textContent = patient.cedula;
    document.getElementById('display-edad').textContent = patient.edad + ' años';
    document.getElementById('display-sexo').textContent = patient.sexo;
    document.getElementById('display-direccion').textContent = patient.direccion;
    document.getElementById('display-telefono').textContent = patient.telefono;

    patientInfoDisplay.style.display = 'block';
}

// Guardar nuevo paciente
function guardarNuevoPaciente() {
    const cedula = document.getElementById('cedula-input').value.trim();
    const nombre = document.getElementById('new-nombre').value.trim();
    const edad = document.getElementById('new-edad').value.trim();
    const sexo = document.getElementById('new-sexo').value;
    const direccion = document.getElementById('new-direccion').value.trim();
    const telefono = document.getElementById('new-telefono').value.trim();

    // Validar que todos los campos estén completos
    if (!nombre || !edad || !sexo || !direccion || !telefono) {
        showNotification('Por favor complete todos los campos', 'warning');
        return;
    }

    // Validar edad
    if (edad < 0 || edad > 120) {
        showNotification('Por favor ingrese una edad válida', 'warning');
        return;
    }

    // Crear objeto del nuevo paciente
    const newPatient = {
        cedula: cedula,
        nombre: nombre,
        edad: parseInt(edad),
        sexo: sexo,
        direccion: direccion,
        telefono: telefono
    };

    // Obtener pacientes actuales y agregar el nuevo
    const patients = JSON.parse(localStorage.getItem('patients') || '{}');
    patients[cedula] = newPatient;

    // Guardar en localStorage (guardado automático)
    localStorage.setItem('patients', JSON.stringify(patients));

    showNotification('✓ Paciente guardado exitosamente', 'success');

    // Limpiar formulario
    document.getElementById('new-nombre').value = '';
    document.getElementById('new-edad').value = '';
    document.getElementById('new-sexo').value = '';
    document.getElementById('new-direccion').value = '';
    document.getElementById('new-telefono').value = '';

    // Mostrar la información del paciente recién guardado
    setTimeout(() => {
        document.getElementById('new-patient-form').style.display = 'none';
        document.getElementById('display-nombre').textContent = newPatient.nombre;
        document.getElementById('display-cedula').textContent = newPatient.cedula;
        document.getElementById('display-edad').textContent = newPatient.edad + ' años';
        document.getElementById('display-sexo').textContent = newPatient.sexo;
        document.getElementById('display-direccion').textContent = newPatient.direccion;
        document.getElementById('display-telefono').textContent = newPatient.telefono;
        document.getElementById('patient-info-display').style.display = 'block';
    }, 1000);
}

// Continuar con la atención (ir a lista de seguridad)
function continuarAtencion() {
    const cedula = document.getElementById('display-cedula').textContent;
    const nombre = document.getElementById('display-nombre').textContent;
    const edad = document.getElementById('display-edad').textContent;

    // Guardar paciente activo en sesión
    sessionStorage.setItem('currentPatient', cedula);
    sessionStorage.setItem('currentPatientName', nombre);
    sessionStorage.setItem('currentPatientAge', edad);

    // Cambiar a página de lista de seguridad
    showPage('safety-checklist');

    // Cargar datos del paciente en el header de la lista
    document.getElementById('safety-patient-name').textContent = nombre;
    document.getElementById('safety-patient-cedula').textContent = cedula;
    document.getElementById('safety-patient-edad').textContent = edad;

    showNotification('✓ Iniciando lista de seguridad del paciente', 'success');
}

// Función auxiliar para mostrar páginas
function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Actualizar título
    const pageTitle = document.getElementById('page-title');
    if (pageTitle && pageNames[pageName]) {
        pageTitle.textContent = pageNames[pageName];
    }

    // Cargar datos específicos de cada página
    if (pageName === 'reports' && typeof aplicarFiltros === 'function') {
        setTimeout(() => aplicarFiltros(), 50);
    } else if (pageName === 'monthly-close' && typeof cargarCierreMensual === 'function') {
        setTimeout(() => cargarCierreMensual(), 50);
    } else if (pageName === 'monthly-history' && typeof cargarHistorialCierres === 'function') {
        setTimeout(() => cargarHistorialCierres(), 50);
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

/*=============== INVENTORY MANAGEMENT ===============*/

// Inicializar inventario en localStorage
function initInventoryDB() {
    if (!localStorage.getItem('inventory')) {
        // Ya existe data en el HTML, la extraemos
        const table = document.getElementById('inventory-table');
        if (table) {
            const rows = table.querySelectorAll('tbody tr');
            const inventory = {};

            rows.forEach((row, index) => {
                const cells = row.cells;
                const code = cells[0].textContent;
                inventory[code] = {
                    code: code,
                    nombre: cells[1].textContent,
                    categoria: cells[2].textContent,
                    tipo: cells[3].textContent,
                    cantidad: parseInt(cells[4].textContent),
                    vencimiento: cells[5].textContent,
                    estado: cells[6].querySelector('.badge').textContent
                };
            });

            localStorage.setItem('inventory', JSON.stringify(inventory));
        }
    }
}

window.addEventListener('load', initInventoryDB);

// Editar item del inventario
function editInventoryItem(row) {
    const cells = row.cells;
    const code = cells[0].textContent;
    const nombre = cells[1].textContent;
    const cantidad = cells[4].textContent;

    const newQuantity = prompt(`Editar cantidad de "${nombre}"\nCantidad actual: ${cantidad}`, cantidad);

    if (newQuantity !== null && !isNaN(newQuantity) && newQuantity >= 0) {
        cells[4].textContent = newQuantity;

        // Actualizar en localStorage
        const inventory = JSON.parse(localStorage.getItem('inventory') || '{}');
        if (inventory[code]) {
            inventory[code].cantidad = parseInt(newQuantity);
            localStorage.setItem('inventory', JSON.stringify(inventory));
        }

        // Actualizar estado según cantidad
        const badge = cells[6].querySelector('.badge');
        if (newQuantity < 100) {
            badge.textContent = 'Stock Bajo';
            badge.className = 'badge badge-warning';
        } else {
            badge.textContent = 'Stock Normal';
            badge.className = 'badge badge-success';
        }

        showNotification(`✓ Cantidad actualizada: ${nombre}`, 'success');
    }
}

// Agregar nuevo item al inventario
function addInventoryItem() {
    const modal = createModal('Agregar Nuevo Item', `
        <div class="form-grid">
            <div class="form-group">
                <label>Código</label>
                <input type="text" id="modal-code" class="form-input" placeholder="MED-XXX" required>
            </div>
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="modal-nombre" class="form-input" required>
            </div>
            <div class="form-group">
                <label>Categoría</label>
                <select id="modal-categoria" class="form-input">
                    <option value="Medicamento">Medicamento</option>
                    <option value="Insumos">Insumos</option>
                    <option value="Equipos">Equipos</option>
                </select>
            </div>
            <div class="form-group">
                <label>Tipo</label>
                <select id="modal-tipo" class="form-input">
                    <option value="Analgésico">Analgésico</option>
                    <option value="Antibiótico">Antibiótico</option>
                    <option value="Antigripal">Antigripal</option>
                    <option value="Antiinflamatorio">Antiinflamatorio</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
            <div class="form-group">
                <label>Cantidad</label>
                <input type="number" id="modal-cantidad" class="form-input" min="0" required>
            </div>
            <div class="form-group">
                <label>Vencimiento</label>
                <input type="date" id="modal-vencimiento" class="form-input" required>
            </div>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
            <button class="btn btn-primary" onclick="saveNewInventoryItem()" style="flex: 1;">Guardar</button>
            <button class="btn btn-secondary" onclick="closeModal()" style="flex: 1;">Cancelar</button>
        </div>
    `);
}

function saveNewInventoryItem() {
    const code = document.getElementById('modal-code').value.trim();
    const nombre = document.getElementById('modal-nombre').value.trim();
    const categoria = document.getElementById('modal-categoria').value;
    const tipo = document.getElementById('modal-tipo').value;
    const cantidad = document.getElementById('modal-cantidad').value;
    const vencimiento = document.getElementById('modal-vencimiento').value;

    if (!code || !nombre || !cantidad || !vencimiento) {
        showNotification('Complete todos los campos', 'warning');
        return;
    }

    // Guardar en localStorage
    const inventory = JSON.parse(localStorage.getItem('inventory') || '{}');

    if (inventory[code]) {
        showNotification('El código ya existe', 'warning');
        return;
    }

    const estado = cantidad < 100 ? 'Stock Bajo' : 'Stock Normal';
    inventory[code] = { code, nombre, categoria, tipo, cantidad: parseInt(cantidad), vencimiento, estado };
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // Agregar a la tabla
    const table = document.getElementById('inventory-table');
    const tbody = table?.querySelector('tbody');

    if (tbody) {
        const row = tbody.insertRow(0);
        row.innerHTML = `
            <td>${code}</td>
            <td>${nombre}</td>
            <td>${categoria}</td>
            <td>${tipo}</td>
            <td>${cantidad}</td>
            <td>${vencimiento}</td>
            <td><span class="badge ${cantidad < 100 ? 'badge-warning' : 'badge-success'}">${estado}</span></td>
            <td>
                <button class="btn-icon" onclick="editInventoryItem(this.closest('tr'))">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2"/>
                        <path d="M18.5 2.5C18.8978 2.1022 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.1022 21.5 2.5C21.8978 2.8978 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.1022 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </td>
        `;

        // Agregar evento al nuevo botón
        const editBtn = row.querySelector('.btn-icon');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editInventoryItem(row);
        });
    }

    closeModal();
    showNotification('✓ Item agregado exitosamente', 'success');
}

/*=============== PATIENT MANAGEMENT ===============*/

// Editar paciente
function editPatient(patientId) {
    // Obtener pacientes
    const patients = JSON.parse(localStorage.getItem('patients') || '{}');
    let patient = null;

    // Buscar paciente por ID
    for (let cedula in patients) {
        if (patients[cedula].cedula === patientId || cedula === patientId) {
            patient = patients[cedula];
            break;
        }
    }

    if (!patient) {
        showNotification('Paciente no encontrado', 'danger');
        return;
    }

    const modal = createModal('Editar Paciente', `
        <div class="form-grid">
            <div class="form-group">
                <label>Nombre Completo</label>
                <input type="text" id="edit-nombre" class="form-input" value="${patient.nombre}" required>
            </div>
            <div class="form-group">
                <label>Edad</label>
                <input type="number" id="edit-edad" class="form-input" value="${patient.edad}" min="0" max="120" required>
            </div>
            <div class="form-group">
                <label>Sexo</label>
                <select id="edit-sexo" class="form-input" required>
                    <option value="Masculino" ${patient.sexo === 'Masculino' ? 'selected' : ''}>Masculino</option>
                    <option value="Femenino" ${patient.sexo === 'Femenino' ? 'selected' : ''}>Femenino</option>
                    <option value="Otro" ${patient.sexo === 'Otro' ? 'selected' : ''}>Otro</option>
                </select>
            </div>
            <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" id="edit-telefono" class="form-input" value="${patient.telefono}" required>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label>Dirección</label>
                <input type="text" id="edit-direccion" class="form-input" value="${patient.direccion}" required>
            </div>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
            <button class="btn btn-primary" onclick="savePatientEdits('${patient.cedula}')" style="flex: 1;">Guardar Cambios</button>
            <button class="btn btn-secondary" onclick="closeModal()" style="flex: 1;">Cancelar</button>
        </div>
    `);
}

function savePatientEdits(cedula) {
    const nombre = document.getElementById('edit-nombre').value.trim();
    const edad = document.getElementById('edit-edad').value;
    const sexo = document.getElementById('edit-sexo').value;
    const telefono = document.getElementById('edit-telefono').value.trim();
    const direccion = document.getElementById('edit-direccion').value.trim();

    if (!nombre || !edad || !sexo || !telefono || !direccion) {
        showNotification('Complete todos los campos', 'warning');
        return;
    }

    // Actualizar en localStorage
    const patients = JSON.parse(localStorage.getItem('patients') || '{}');
    if (patients[cedula]) {
        patients[cedula] = {
            ...patients[cedula],
            nombre,
            edad: parseInt(edad),
            sexo,
            telefono,
            direccion
        };
        localStorage.setItem('patients', JSON.stringify(patients));

        closeModal();
        showNotification('✓ Paciente actualizado exitosamente', 'success');

        // Recargar página para ver cambios (opcional)
        setTimeout(() => location.reload(), 1000);
    }
}

// Ver historia del paciente
function viewPatientHistory(patientId) {
    const modal = createModal('Historia Clínica', `
        <div style="max-height: 500px; overflow-y: auto;">
            <h4 style="margin-bottom: 1rem;">Paciente: ${patientId}</h4>

            <div class="history-section">
                <h5 style="color: var(--primary-color); margin-bottom: 0.5rem;">Consultas Recientes</h5>
                <div class="history-item">
                    <strong>15/10/2024</strong> - Consulta General
                    <p style="color: var(--text-light); margin: 0.5rem 0;">Diagnóstico: Resfriado común. Tratamiento con antigripales.</p>
                </div>
                <div class="history-item">
                    <strong>28/09/2024</strong> - Control de Rutina
                    <p style="color: var(--text-light); margin: 0.5rem 0;">Examen físico normal. Presión arterial: 120/80.</p>
                </div>
                <div class="history-item">
                    <strong>10/08/2024</strong> - Análisis de Laboratorio
                    <p style="color: var(--text-light); margin: 0.5rem 0;">Resultados normales. Colesterol: 180 mg/dL.</p>
                </div>
            </div>

            <div class="history-section" style="margin-top: 1.5rem;">
                <h5 style="color: var(--primary-color); margin-bottom: 0.5rem;">Medicamentos Activos</h5>
                <ul style="color: var(--text-secondary);">
                    <li>Ibuprofeno 400mg - Cada 8 horas</li>
                    <li>Vitamina D - Diaria</li>
                </ul>
            </div>

            <div class="history-section" style="margin-top: 1.5rem;">
                <h5 style="color: var(--primary-color); margin-bottom: 0.5rem;">Alergias</h5>
                <p style="color: var(--text-secondary);">Sin alergias conocidas</p>
            </div>
        </div>
        <button class="btn btn-primary" onclick="closeModal()" style="width: 100%; margin-top: 1rem;">Cerrar</button>
    `);
}

/*=============== MODAL SYSTEM ===============*/

function createModal(title, content) {
    // Remover modal existente si hay
    closeModal();

    const modal = document.createElement('div');
    modal.id = 'dynamic-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.2s ease-out;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease-out;
        ">
            <h3 style="margin-bottom: 1.5rem; color: var(--text-primary);">${title}</h3>
            ${content}
        </div>
    `;

    // Agregar estilos de animación
    if (!document.querySelector('#modal-animations')) {
        const style = document.createElement('style');
        style.id = 'modal-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            .history-item {
                padding: 1rem;
                background: var(--bg-secondary);
                border-radius: var(--radius-md);
                margin-bottom: 0.75rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Cerrar al hacer click fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.body.appendChild(modal);
    return modal;
}

function closeModal() {
    const modal = document.getElementById('dynamic-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.2s ease-out';
        setTimeout(() => modal.remove(), 200);
    }
}

/*=============== ATTACH EVENT LISTENERS ===============*/

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Botones de editar paciente
    setTimeout(() => {
        const editPatientButtons = document.querySelectorAll('.edit-patient-btn');
        editPatientButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const patientId = btn.getAttribute('data-patient-id');
                editPatient(patientId);
            });
        });

        // Botones de ver historia
        const historyButtons = document.querySelectorAll('.btn-outline-sm:not(.edit-patient-btn)');
        historyButtons.forEach(btn => {
            if (btn.textContent.includes('Ver Historia')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const card = btn.closest('.patient-card');
                    const patientId = card.querySelector('.patient-info p').textContent;
                    viewPatientHistory(patientId);
                });
            }
        });

        // Botón agregar item inventario
        const addItemBtns = document.querySelectorAll('.btn-primary');
        addItemBtns.forEach(btn => {
            if (btn.textContent.includes('Agregar Item')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    addInventoryItem();
                });
            }
        });

        // Botón nuevo paciente en gestión de pacientes
        const newPatientBtns = document.querySelectorAll('.btn-primary');
        newPatientBtns.forEach(btn => {
            if (btn.textContent.includes('Nuevo Paciente')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    addNewPatientFromManagement();
                });
            }
        });
    }, 500);
});

// Agregar nuevo paciente desde gestión de pacientes
function addNewPatientFromManagement() {
    const modal = createModal('Agregar Nuevo Paciente', `
        <div class="form-grid">
            <div class="form-group" style="grid-column: 1 / -1;">
                <label>Cédula *</label>
                <input type="text" id="new-patient-cedula" class="form-input" maxlength="8" placeholder="12345678" required>
            </div>
            <div class="form-group">
                <label>Nombre Completo *</label>
                <input type="text" id="new-patient-nombre" class="form-input" required>
            </div>
            <div class="form-group">
                <label>Edad *</label>
                <input type="number" id="new-patient-edad" class="form-input" min="0" max="120" required>
            </div>
            <div class="form-group">
                <label>Sexo *</label>
                <select id="new-patient-sexo" class="form-input" required>
                    <option value="">Seleccione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
            <div class="form-group">
                <label>Teléfono *</label>
                <input type="tel" id="new-patient-telefono" class="form-input" required>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label>Dirección *</label>
                <input type="text" id="new-patient-direccion" class="form-input" required>
            </div>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
            <button class="btn btn-primary" onclick="saveNewPatientFromManagement()" style="flex: 1;">Guardar</button>
            <button class="btn btn-secondary" onclick="closeModal()" style="flex: 1;">Cancelar</button>
        </div>
    `);

    // Validar que solo números en cédula
    setTimeout(() => {
        const cedulaInput = document.getElementById('new-patient-cedula');
        if (cedulaInput) {
            cedulaInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        }
    }, 100);
}

function saveNewPatientFromManagement() {
    const cedula = document.getElementById('new-patient-cedula').value.trim();
    const nombre = document.getElementById('new-patient-nombre').value.trim();
    const edad = document.getElementById('new-patient-edad').value;
    const sexo = document.getElementById('new-patient-sexo').value;
    const telefono = document.getElementById('new-patient-telefono').value.trim();
    const direccion = document.getElementById('new-patient-direccion').value.trim();

    if (!cedula || !nombre || !edad || !sexo || !telefono || !direccion) {
        showNotification('Complete todos los campos', 'warning');
        return;
    }

    if (cedula.length < 7 || cedula.length > 8) {
        showNotification('La cédula debe tener 7 u 8 dígitos', 'warning');
        return;
    }

    const patients = JSON.parse(localStorage.getItem('patients') || '{}');

    if (patients[cedula]) {
        showNotification('Ya existe un paciente con esa cédula', 'warning');
        return;
    }

    patients[cedula] = {
        cedula,
        nombre,
        edad: parseInt(edad),
        sexo,
        telefono,
        direccion
    };

    localStorage.setItem('patients', JSON.stringify(patients));

    closeModal();
    showNotification('✓ Paciente agregado exitosamente', 'success');

    setTimeout(() => location.reload(), 1000);
}

/*=============== NEW PATIENT REGISTRATION (DIRECT FORM) ===============*/

// Registrar nuevo paciente desde el formulario directo
function registrarNuevoPaciente() {
    const cedula = document.getElementById('registro-cedula').value.trim();
    const nombre = document.getElementById('registro-nombre').value.trim();
    const edad = document.getElementById('registro-edad').value.trim();
    const sexo = document.getElementById('registro-sexo').value;
    const telefono = document.getElementById('registro-telefono').value.trim();
    const direccion = document.getElementById('registro-direccion').value.trim();

    // Validar que todos los campos estén completos
    if (!cedula || !nombre || !edad || !sexo || !telefono || !direccion) {
        showNotification('⚠ Por favor complete todos los campos obligatorios', 'warning');
        return;
    }

    // Validar longitud de cédula
    if (cedula.length < 7 || cedula.length > 8) {
        showNotification('⚠ La cédula debe tener 7 u 8 dígitos', 'warning');
        return;
    }

    // Validar edad
    if (edad < 0 || edad > 120) {
        showNotification('⚠ Por favor ingrese una edad válida (0-120)', 'warning');
        return;
    }

    // Verificar si ya existe un paciente con esa cédula
    const patients = JSON.parse(localStorage.getItem('patients') || '{}');

    if (patients[cedula]) {
        showNotification('⚠ Ya existe un paciente registrado con esta cédula', 'warning');
        return;
    }

    // Crear objeto del nuevo paciente
    const newPatient = {
        cedula: cedula,
        nombre: nombre,
        edad: parseInt(edad),
        sexo: sexo,
        direccion: direccion,
        telefono: telefono
    };

    // Guardar en localStorage
    patients[cedula] = newPatient;
    localStorage.setItem('patients', JSON.stringify(patients));

    showNotification('✓ Paciente registrado exitosamente en el sistema', 'success');

    // Limpiar formulario
    limpiarFormularioRegistro();

    // Opcional: Mostrar confirmación con datos del paciente
    setTimeout(() => {
        showNotification(`Paciente ${nombre} (CI: ${cedula}) listo para atención`, 'info');
    }, 1500);
}

// Limpiar formulario de registro
function limpiarFormularioRegistro() {
    document.getElementById('registro-cedula').value = '';
    document.getElementById('registro-nombre').value = '';
    document.getElementById('registro-edad').value = '';
    document.getElementById('registro-sexo').value = '';
    document.getElementById('registro-telefono').value = '';
    document.getElementById('registro-direccion').value = '';

    // Focus en el primer campo
    document.getElementById('registro-cedula').focus();
}

/*=============== SAFETY CHECKLIST FUNCTIONS ===============*/

// Guardar lista de seguridad del paciente
function guardarListaSeguridad() {
    const form = document.getElementById('safety-checklist-form');
    const formData = new FormData(form);

    // Validar campos requeridos
    const identificacion = formData.get('identificacion');
    const procedimiento = formData.get('procedimiento');
    const sitioQuirurgico = formData.get('sitio-quirurgico');
    const funcionario = formData.get('funcionario-encargado');

    if (!identificacion || !procedimiento || !sitioQuirurgico || !funcionario) {
        showNotification('⚠ Por favor complete todos los campos obligatorios', 'warning');
        return;
    }

    // Construir objeto con todos los datos
    const checklistData = {
        paciente: {
            cedula: sessionStorage.getItem('currentPatient'),
            nombre: sessionStorage.getItem('currentPatientName'),
            edad: sessionStorage.getItem('currentPatientAge')
        },
        identificacion: formData.get('identificacion'),
        procedimiento: formData.get('procedimiento'),
        sitioQuirurgico: formData.get('sitio-quirurgico'),
        consultaAnestesia: formData.get('consulta-anestesia') ? 'si' : 'no',
        pa: formData.get('pa') || 'no-especificado',
        temperatura: formData.get('temperatura') || 'no-especificado',
        pulso: formData.get('pulso') || 'no-especificado',
        insumosAnalgesicos: formData.get('insumos-analgesicos') ? 'si' : 'no',
        riesgoViaAerea: formData.get('riesgo-via-aerea') || 'no-especificado',
        riesgoSangre: formData.get('riesgo-sangre') || 'no-especificado',
        consultaHemoterapeuta: formData.get('consulta-hemoterapeuta') || 'no-especificado',
        alergias: formData.get('alergias') || 'no-especificado',
        camaCti: formData.get('cama-cti') || 'no-especificado',
        necesitaHemoterapeuta: formData.get('necesita-hemoterapeuta') || 'no-especificado',
        necesitaRadiologo: formData.get('necesita-radiologo') || 'no-especificado',
        necesitaPatologo: formData.get('necesita-patologo') || 'no-especificado',
        imagenologia: formData.get('imagenologia') || 'no-especificado',
        anticoagulantes: formData.get('anticoagulantes') || 'no-especificado',
        funcionarioEncargado: formData.get('funcionario-encargado'),
        timestamp: new Date().toISOString(),
        fecha: new Date().toLocaleDateString('es-UY')
    };

    // Guardar en localStorage
    const cedula = sessionStorage.getItem('currentPatient');
    const allChecklists = JSON.parse(localStorage.getItem('safetyChecklists') || '{}');

    // Usar cédula como key y agregar timestamp para historial
    if (!allChecklists[cedula]) {
        allChecklists[cedula] = [];
    }
    allChecklists[cedula].push(checklistData);

    localStorage.setItem('safetyChecklists', JSON.stringify(allChecklists));

    showNotification('✓ Lista de seguridad guardada exitosamente', 'success');

    // Ir a la página de pre-cirugía
    setTimeout(() => {
        showPage('pre-surgery');

        // Cargar datos del paciente en el header de pre-cirugía
        document.getElementById('presurgery-patient-name').textContent = sessionStorage.getItem('currentPatientName');
        document.getElementById('presurgery-patient-cedula').textContent = sessionStorage.getItem('currentPatient');
        document.getElementById('presurgery-patient-edad').textContent = sessionStorage.getItem('currentPatientAge');

        showNotification('Continuando con verificación pre-quirúrgica', 'info');
    }, 1000);
}

// Volver a atención al paciente
function volverAtencionPaciente() {
    showPage('patient-care');
    showNotification('Volviendo a atención al paciente', 'info');
}

// Volver a lista de seguridad
function volverListaSeguridad() {
    showPage('safety-checklist');
    showNotification('Volviendo a lista de seguridad', 'info');
}

/*=============== PRE-SURGERY CHECKLIST FUNCTIONS ===============*/

// Guardar checklist pre-cirugía
function guardarPreCirugia() {
    const form = document.getElementById('presurgery-checklist-form');

    // Validar el formulario con HTML5 validation
    if (!form.checkValidity()) {
        form.reportValidity();
        showNotification('⚠ Por favor complete todos los campos obligatorios', 'warning');
        return;
    }

    const formData = new FormData(form);

    // Construir objeto con todos los datos
    const presurgeryData = {
        paciente: {
            cedula: sessionStorage.getItem('currentPatient'),
            nombre: sessionStorage.getItem('currentPatientName'),
            edad: sessionStorage.getItem('currentPatientAge')
        },
        verificaciones: {
            presentacionEquipo: formData.get('presentacion-equipo'),
            confirmarIdentidad: formData.get('confirmar-identidad'),
            confirmarProcedimiento: formData.get('confirmar-procedimiento'),
            confirmarSitio: formData.get('confirmar-sitio'),
            anticoagulantesAdmin: formData.get('anticoagulantes-admin') || 'no-especificado',
            antibioticosAdmin: formData.get('antibioticos-admin') || 'no-especificado',
            cirujanoComunica: formData.get('cirujano-comunica') || 'no-especificado',
            anestesiaComunica: formData.get('anestesia-comunica') || 'no-especificado',
            instrumentistaComunica: formData.get('instrumentista-comunica') || 'no-especificado',
            oximetro: formData.get('oximetro') || 'no-especificado',
            monitorizacion: formData.get('monitorizacion') || 'no-especificado',
            equiposEspeciales: formData.get('equipos-especiales') || 'no-especificado'
        },
        equipo: {
            cirujano1: { nombre: formData.get('cirujano-1'), relacion: formData.get('cirujano-1-relacion') },
            cirujano2: { nombre: formData.get('cirujano-2'), relacion: formData.get('cirujano-2-relacion') },
            cirujano3: { nombre: formData.get('cirujano-3'), relacion: formData.get('cirujano-3-relacion') },
            cirujano4: { nombre: formData.get('cirujano-4'), relacion: formData.get('cirujano-4-relacion') },
            cirujano5: { nombre: formData.get('cirujano-5'), relacion: formData.get('cirujano-5-relacion') },
            anestesista1: { nombre: formData.get('anestesista-1'), relacion: formData.get('anestesista-1-relacion') },
            anestesista2: { nombre: formData.get('anestesista-2'), relacion: formData.get('anestesista-2-relacion') },
            instrumentista: { nombre: formData.get('instrumentista'), relacion: formData.get('instrumentista-relacion') },
            licenciado1: { nombre: formData.get('licenciado-1'), relacion: formData.get('licenciado-1-relacion') },
            licenciado2: { nombre: formData.get('licenciado-2'), relacion: formData.get('licenciado-2-relacion') },
            circulante1: { nombre: formData.get('circulante-1'), relacion: formData.get('circulante-1-relacion') },
            circulante2: { nombre: formData.get('circulante-2'), relacion: formData.get('circulante-2-relacion') },
            otro: { nombre: formData.get('otro-miembro'), relacion: formData.get('otro-miembro-relacion') }
        },
        funcionarioEncargado: formData.get('funcionario-encargado-presurgery'),
        timestamp: new Date().toISOString(),
        fecha: new Date().toLocaleDateString('es-UY')
    };

    // Guardar en localStorage
    const cedula = sessionStorage.getItem('currentPatient');
    const allPresurgeryData = JSON.parse(localStorage.getItem('presurgeryChecklists') || '{}');

    // Usar cédula como key y agregar timestamp para historial
    if (!allPresurgeryData[cedula]) {
        allPresurgeryData[cedula] = [];
    }
    allPresurgeryData[cedula].push(presurgeryData);

    localStorage.setItem('presurgeryChecklists', JSON.stringify(allPresurgeryData));

    showNotification('✓ Verificación pre-quirúrgica guardada exitosamente', 'success');

    // Ir a la página durante cirugía
    setTimeout(() => {
        showPage('during-surgery');

        // Cargar datos del paciente
        document.getElementById('surgery-patient-name').textContent = sessionStorage.getItem('currentPatientName');
        document.getElementById('surgery-patient-cedula').textContent = sessionStorage.getItem('currentPatient');
        document.getElementById('surgery-patient-edad').textContent = sessionStorage.getItem('currentPatientAge');

        showNotification('Iniciando registro de insumos quirúrgicos', 'info');
    }, 1000);
}

// Volver a pre-cirugía
function volverPreCirugia() {
    showPage('pre-surgery');
    showNotification('Volviendo a verificación pre-quirúrgica', 'info');
}

/*=============== SURGERY ITEMS DATABASE ===============*/

const surgeryItemsDB = {
    // Suturas
    'SUT001': { code: 'SUT001', name: 'Sutura 3-0', price: 12.50, categoria: 'Suturas' },
    'SUT002': { code: 'SUT002', name: 'Sutura 4-0', price: 15.00, categoria: 'Suturas' },
    'SUT003': { code: 'SUT003', name: 'Sutura 5-0', price: 18.00, categoria: 'Suturas' },

    // Antibióticos
    'ANT001': { code: 'ANT001', name: 'Cefazolina 1g', price: 8.50, categoria: 'Antibióticos' },
    'ANT002': { code: 'ANT002', name: 'Gentamicina 80mg', price: 6.75, categoria: 'Antibióticos' },
    'ANT003': { code: 'ANT003', name: 'Ciprofloxacino', price: 10.00, categoria: 'Antibióticos' },

    // Gases
    'GAS001': { code: 'GAS001', name: 'Gasa Estéril 10x10', price: 2.50, categoria: 'Gases' },
    'GAS002': { code: 'GAS002', name: 'Compresa', price: 3.00, categoria: 'Gases' },
    'GAS003': { code: 'GAS003', name: 'Apósito', price: 4.50, categoria: 'Gases' },

    // Instrumentos
    'INS001': { code: 'INS001', name: 'Bisturí #15', price: 5.50, categoria: 'Instrumentos' },
    'INS002': { code: 'INS002', name: 'Pinza Kelly', price: 45.00, categoria: 'Instrumentos' },
    'INS003': { code: 'INS003', name: 'Tijera Mayo', price: 35.00, categoria: 'Instrumentos' },
    'INS004': { code: 'INS004', name: 'Porta agujas', price: 40.00, categoria: 'Instrumentos' },

    // Medicamentos
    'MED001': { code: 'MED001', name: 'Morfina 10mg', price: 12.00, categoria: 'Medicamentos' },
    'MED002': { code: 'MED002', name: 'Propofol 200mg', price: 25.00, categoria: 'Medicamentos' },
    'MED003': { code: 'MED003', name: 'Fentanilo', price: 18.50, categoria: 'Medicamentos' },

    // Prótesis
    'PRO001': { code: 'PRO001', name: 'Prótesis Cadera', price: 1200.00, categoria: 'Prótesis' },
    'PRO002': { code: 'PRO002', name: 'Placa Titanio', price: 850.00, categoria: 'Prótesis' },

    // Catéteres
    'CAT001': { code: 'CAT001', name: 'Catéter Central', price: 75.00, categoria: 'Catéteres' }
};

// Array para almacenar items agregados durante la cirugía
let surgeryItems = [];

// Estructura de items por categoría
const itemsByCategory = {
    'Medicamentos': ['MED001', 'MED002', 'MED003', 'MED004', 'MED005', 'MED006', 'MED007', 'MED008', 'MED009', 'MED010'],
    'Anestésicos': ['ANE001', 'ANE002', 'ANE003', 'ANE004'],
    'Antibióticos': ['ANT001', 'ANT002', 'ANT003', 'ANT004'],
    'Sueros y Soluciones': ['SOL001', 'SOL002', 'SOL003', 'SOL004'],
    'Insumos Quirúrgicos': ['INS001', 'INS002', 'INS003', 'INS004', 'INS005', 'INS006', 'INS007', 'INS008', 'INS009', 'INS010'],
    'Material de Curación': ['CUR001', 'CUR002', 'CUR003']
};

/*=============== ITEMS SEARCH & FILTER FUNCTIONS ===============*/

// Mostrar dropdown al hacer foco
function showItemDropdown() {
    const searchInput = document.getElementById('item-search');
    filterItems(searchInput.value);
}

// Filtrar items según búsqueda
function filterItems(searchTerm) {
    const dropdown = document.getElementById('items-dropdown');
    const dropdownList = document.getElementById('items-dropdown-list');

    dropdownList.innerHTML = '';

    if (!searchTerm || searchTerm.trim().length === 0) {
        // Si no hay búsqueda, mostrar todos los items organizados por categoría
        Object.keys(itemsByCategory).forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'items-dropdown-category';
            categoryDiv.textContent = category;
            dropdownList.appendChild(categoryDiv);

            itemsByCategory[category].forEach(itemCode => {
                const item = surgeryItemsDB[itemCode];
                dropdownList.appendChild(createItemElement(item, category));
            });
        });
        dropdown.style.display = 'block';
        return;
    }

    // Filtrar items que coincidan con la búsqueda
    const searchLower = searchTerm.toLowerCase();
    let hasResults = false;

    Object.keys(itemsByCategory).forEach(category => {
        let categoryShown = false;

        itemsByCategory[category].forEach(itemCode => {
            const item = surgeryItemsDB[itemCode];

            // Buscar en nombre y código
            if (item.name.toLowerCase().includes(searchLower) ||
                item.code.toLowerCase().includes(searchLower)) {

                // Mostrar categoría solo si hay items
                if (!categoryShown) {
                    const categoryDiv = document.createElement('div');
                    categoryDiv.className = 'items-dropdown-category';
                    categoryDiv.textContent = category;
                    dropdownList.appendChild(categoryDiv);
                    categoryShown = true;
                }

                dropdownList.appendChild(createItemElement(item, category));
                hasResults = true;
            }
        });
    });

    // Mostrar mensaje si no hay resultados
    if (!hasResults) {
        dropdownList.innerHTML = `
            <div class="items-dropdown-empty">
                <p>No se encontraron items que coincidan con "${searchTerm}"</p>
            </div>
        `;
    }

    dropdown.style.display = 'block';
}

// Crear elemento de item para el dropdown
function createItemElement(item, category) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'items-dropdown-item';
    itemDiv.onclick = () => selectItem(item);

    itemDiv.innerHTML = `
        <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-code">${item.code}</div>
        </div>
        <span class="item-price">$${item.price.toFixed(2)}</span>
    `;

    return itemDiv;
}

// Seleccionar un item del dropdown
function selectItem(item) {
    document.getElementById('item-search').value = item.name;
    document.getElementById('selected-item-code').value = item.code;
    document.getElementById('items-dropdown').style.display = 'none';

    // Hacer foco en el campo de cantidad
    document.getElementById('item-quantity').focus();
    document.getElementById('item-quantity').select();
}

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(event) {
    const searchInput = document.getElementById('item-search');
    const dropdown = document.getElementById('items-dropdown');

    if (searchInput && dropdown) {
        if (!searchInput.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    }
});

/*=============== SURGERY ITEMS FUNCTIONS ===============*/

// Agregar item a la tabla
function addSurgeryItem() {
    const itemCode = document.getElementById('selected-item-code').value;
    const quantity = parseInt(document.getElementById('item-quantity').value);

    // Validar selección
    if (!itemCode) {
        showNotification('⚠ Seleccione un insumo o medicamento', 'warning');
        return;
    }

    // Validar cantidad
    if (!quantity || quantity < 1) {
        showNotification('⚠ Ingrese una cantidad válida', 'warning');
        return;
    }

    // Obtener item de la base de datos
    const item = surgeryItemsDB[itemCode];
    if (!item) {
        showNotification('⚠ Item no encontrado', 'danger');
        return;
    }

    // Verificar si el item ya existe en la tabla
    const existingIndex = surgeryItems.findIndex(i => i.code === itemCode);

    if (existingIndex >= 0) {
        // Si existe, sumar la cantidad
        surgeryItems[existingIndex].quantity += quantity;
        showNotification(`✓ Cantidad actualizada: ${item.name}`, 'success');
    } else {
        // Si no existe, agregar nuevo
        surgeryItems.push({
            code: item.code,
            name: item.name,
            price: item.price,
            quantity: quantity
        });
        showNotification(`✓ Item agregado: ${item.name}`, 'success');
    }

    // Actualizar tabla
    renderSurgeryTable();

    // Limpiar selección
    document.getElementById('item-search').value = '';
    document.getElementById('selected-item-code').value = '';
    document.getElementById('item-quantity').value = '1';

    // Hacer foco en el campo de búsqueda
    document.getElementById('item-search').focus();

    // Guardar automáticamente
    saveSurgeryItems();
}

// Actualizar cantidad de un item existente
function updateItemQuantity(index, newQuantity) {
    const quantity = parseInt(newQuantity);

    // Validar cantidad mínima
    if (quantity < 1 || isNaN(quantity)) {
        showNotification('⚠ La cantidad debe ser al menos 1', 'warning');
        renderSurgeryTable(); // Restaurar valor anterior
        return;
    }

    // Actualizar cantidad
    surgeryItems[index].quantity = quantity;

    // Re-renderizar tabla con nuevos valores
    renderSurgeryTable();

    // Guardar automáticamente
    saveSurgeryItems();

    showNotification(`✓ Cantidad actualizada: ${surgeryItems[index].name}`, 'success');
}

// Renderizar tabla de items
function renderSurgeryTable() {
    const tbody = document.getElementById('surgery-items-tbody');
    const footer = document.getElementById('surgery-table-footer');

    // Limpiar tabla
    tbody.innerHTML = '';

    if (surgeryItems.length === 0) {
        // Mostrar mensaje de tabla vacía
        tbody.innerHTML = `
            <tr class="empty-state">
                <td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-light);">
                    <svg viewBox="0 0 24 24" fill="none" style="width: 48px; height: 48px; margin: 0 auto 1rem; opacity: 0.3;">
                        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <p>No se han agregado items aún</p>
                </td>
            </tr>
        `;
        footer.style.display = 'none';
        return;
    }

    // Renderizar items
    let total = 0;
    surgeryItems.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="surgery-item-code">${item.code}</span></td>
            <td><span class="surgery-item-name">${item.name}</span></td>
            <td style="text-align: center;">
                <input type="number"
                       class="quantity-input"
                       value="${item.quantity}"
                       min="1"
                       onchange="updateItemQuantity(${index}, this.value)"
                       style="width: 70px; text-align: center; padding: 0.4rem; border: 1px solid #e2e8f0; border-radius: 4px; font-weight: 600;">
            </td>
            <td style="text-align: right;"><span class="surgery-item-price">$${item.price.toFixed(2)}</span></td>
            <td style="text-align: right;"><span class="surgery-item-subtotal">$${subtotal.toFixed(2)}</span></td>
            <td style="text-align: center;">
                <button class="btn-remove-item" onclick="removeSurgeryItem(${index})" title="Eliminar">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Mostrar total
    document.getElementById('surgery-total').textContent = `$${total.toFixed(2)}`;
    footer.style.display = 'table-footer-group';
}

// Eliminar item de la tabla
function removeSurgeryItem(index) {
    const item = surgeryItems[index];

    if (confirm(`¿Eliminar ${item.name} de la lista?`)) {
        surgeryItems.splice(index, 1);
        renderSurgeryTable();
        saveSurgeryItems();
        showNotification('✓ Item eliminado', 'success');
    }
}

// Guardar items automáticamente
function saveSurgeryItems() {
    const cedula = sessionStorage.getItem('currentPatient');

    const surgeryData = {
        paciente: {
            cedula: cedula,
            nombre: sessionStorage.getItem('currentPatientName'),
            edad: sessionStorage.getItem('currentPatientAge')
        },
        items: surgeryItems,
        total: surgeryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        timestamp: new Date().toISOString(),
        fecha: new Date().toLocaleDateString('es-UY')
    };

    // Guardar en localStorage
    const allSurgeryData = JSON.parse(localStorage.getItem('surgeryData') || '{}');
    allSurgeryData[cedula] = surgeryData;
    localStorage.setItem('surgeryData', JSON.stringify(allSurgeryData));
}

// Finalizar cirugía y pasar a verificación post-quirúrgica
function finalizarCirugia() {
    if (surgeryItems.length === 0) {
        showNotification('⚠ Debe agregar al menos un item antes de continuar', 'warning');
        return;
    }

    // Guardar una última vez
    saveSurgeryItems();

    showNotification('✓ Registro quirúrgico guardado exitosamente', 'success');

    // Ir a la página de verificación post-quirúrgica
    setTimeout(() => {
        showPage('post-surgery');

        // Cargar datos del paciente
        document.getElementById('postsurgery-patient-name').textContent = sessionStorage.getItem('currentPatientName');
        document.getElementById('postsurgery-patient-cedula').textContent = sessionStorage.getItem('currentPatient');
        document.getElementById('postsurgery-patient-edad').textContent = sessionStorage.getItem('currentPatientAge');

        // Limpiar formulario
        document.getElementById('postsurgery-form').reset();
    }, 1000);
}

// Volver a la página durante cirugía
function volverDuranteCirugia() {
    showPage('during-surgery');
    showNotification('Volviendo a registro quirúrgico', 'info');
}

// Guardar verificación post-quirúrgica
function guardarPostCirugia() {
    const form = document.getElementById('postsurgery-form');

    // Validar el formulario con HTML5 validation
    if (!form.checkValidity()) {
        form.reportValidity();
        showNotification('⚠ Por favor complete todos los campos obligatorios', 'warning');
        return;
    }

    const formData = new FormData(form);

    // Construir objeto con todos los datos
    const postSurgeryData = {
        paciente: {
            cedula: sessionStorage.getItem('currentPatient'),
            nombre: sessionStorage.getItem('currentPatientName'),
            edad: sessionStorage.getItem('currentPatientAge')
        },
        verificaciones: {
            procedimientoConfirmado: formData.get('procedimiento-confirmado'),
            materialBlanco: formData.get('material-blanco'),
            instrumentosAgujas: formData.get('instrumentos-agujas'),
            bacteriologia: formData.get('bacteriologia'),
            anatomiaPatologica: formData.get('anatomia-patologica'),
            fichaAnestesico: formData.get('ficha-anestesico'),
            descripcionOperatoria: formData.get('descripcion-operatoria')
        },
        funcionarioEncargado: formData.get('funcionario-encargado'),
        timestamp: new Date().toISOString(),
        fecha: new Date().toLocaleDateString('es-UY')
    };

    // Guardar en localStorage
    const cedula = sessionStorage.getItem('currentPatient');
    const allPostSurgeryData = JSON.parse(localStorage.getItem('postSurgeryData') || '{}');
    allPostSurgeryData[cedula] = postSurgeryData;
    localStorage.setItem('postSurgeryData', JSON.stringify(allPostSurgeryData));

    showNotification('✓ Verificación post-quirúrgica guardada exitosamente', 'success');

    // Ir a la página de procedimiento real
    setTimeout(() => {
        showPage('real-procedure');

        // Cargar datos del paciente
        document.getElementById('realprocedure-patient-name').textContent = sessionStorage.getItem('currentPatientName');
        document.getElementById('realprocedure-patient-cedula').textContent = sessionStorage.getItem('currentPatient');
        document.getElementById('realprocedure-patient-edad').textContent = sessionStorage.getItem('currentPatientAge');

        // Limpiar formulario
        document.getElementById('real-procedure-form').reset();
    }, 1000);
}

// Guardar procedimiento real y generar vista previa
function guardarProcedimientoReal() {
    const form = document.getElementById('real-procedure-form');

    // Validar el formulario con HTML5 validation
    if (!form.checkValidity()) {
        form.reportValidity();
        showNotification('⚠ Por favor complete todos los campos obligatorios', 'warning');
        return;
    }

    const formData = new FormData(form);

    // Construir objeto con todos los datos
    const realProcedureData = {
        paciente: {
            cedula: sessionStorage.getItem('currentPatient'),
            nombre: sessionStorage.getItem('currentPatientName'),
            edad: sessionStorage.getItem('currentPatientAge')
        },
        procedimiento: {
            categoria: formData.get('categoria'),
            gradoContaminacion: formData.get('grado-contaminacion'),
            oportunidad: formData.get('oportunidad'),
            anatomiaPatologica: formData.get('anatomia-patologica'),
            oncologia: formData.get('oncologia'),
            tipoAnestesia: formData.get('tipo-anestesia')
        },
        funcionarioEncargado: formData.get('funcionario-encargado'),
        timestamp: new Date().toISOString(),
        fecha: new Date().toLocaleDateString('es-UY')
    };

    // Guardar en localStorage
    const cedula = sessionStorage.getItem('currentPatient');
    const allRealProcedureData = JSON.parse(localStorage.getItem('realProcedureData') || '{}');
    allRealProcedureData[cedula] = realProcedureData;
    localStorage.setItem('realProcedureData', JSON.stringify(allRealProcedureData));

    showNotification('✓ Datos del procedimiento guardados exitosamente', 'success');

    // Limpiar items de cirugía para el próximo procedimiento
    surgeryItems = [];

    // Generar y mostrar vista previa
    setTimeout(() => {
        generatePrintPreview();
        showPage('print-preview');
    }, 1000);
}

/*=============== PRINT PREVIEW GENERATION ===============*/

function generatePrintPreview() {
    const cedula = sessionStorage.getItem('currentPatient');
    const patientName = sessionStorage.getItem('currentPatientName');
    const patientAge = sessionStorage.getItem('currentPatientAge');

    // Obtener todos los datos guardados
    const patients = JSON.parse(localStorage.getItem('patients') || '{}');
    const patientData = patients[cedula] || {};

    const safetyData = JSON.parse(localStorage.getItem('safetyChecklistData') || '{}')[cedula] || {};
    const preSurgeryData = JSON.parse(localStorage.getItem('preSurgeryData') || '{}')[cedula] || {};
    const surgeryData = JSON.parse(localStorage.getItem('surgeryData') || '{}')[cedula] || {};
    const postSurgeryData = JSON.parse(localStorage.getItem('postSurgeryData') || '{}')[cedula] || {};
    const realProcedureData = JSON.parse(localStorage.getItem('realProcedureData') || '{}')[cedula] || {};

    // Establecer fecha del reporte
    document.getElementById('report-date').textContent = new Date().toLocaleString('es-UY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Generar contenido del reporte
    let reportHTML = `
        <!-- Información del Paciente -->
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: #f8fafc; border-radius: 0.5rem; border-left: 4px solid #2563eb;">
            <h2 style="margin: 0 0 1rem; color: #2563eb; font-size: 1.5rem;">Información del Paciente</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div><strong>Nombre:</strong> ${patientName || 'N/A'}</div>
                <div><strong>Cédula:</strong> ${cedula || 'N/A'}</div>
                <div><strong>Edad:</strong> ${patientAge || 'N/A'} años</div>
                <div><strong>Sexo:</strong> ${patientData.sexo || 'N/A'}</div>
                <div><strong>Dirección:</strong> ${patientData.direccion || 'N/A'}</div>
                <div><strong>Teléfono:</strong> ${patientData.telefono || 'N/A'}</div>
            </div>
        </div>

        <!-- Procedimiento Real -->
        ${realProcedureData.procedimiento ? `
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: #faf5ff; border-radius: 0.5rem; border-left: 4px solid #8b5cf6;">
            <h2 style="margin: 0 0 1rem; color: #8b5cf6; font-size: 1.5rem;">Procedimiento Real</h2>

            ${realProcedureData.fecha ? `
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: #e9d5ff; border-radius: 0.375rem;">
                <strong>Fecha de Registro:</strong> ${realProcedureData.fecha}
            </div>
            ` : ''}

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div><strong>Categoría:</strong> ${realProcedureData.procedimiento.categoria || 'N/A'}</div>
                <div><strong>Grado de Contaminación:</strong> ${realProcedureData.procedimiento.gradoContaminacion || 'N/A'}</div>
                <div><strong>Oportunidad:</strong> ${realProcedureData.procedimiento.oportunidad || 'N/A'}</div>
                <div><strong>Tipo de Anestesia:</strong> ${realProcedureData.procedimiento.tipoAnestesia || 'N/A'}</div>
                <div><strong>Anatomía Patológica:</strong> ${realProcedureData.procedimiento.anatomiaPatologica === 'si' ? 'Sí' : 'No'}</div>
                <div><strong>Oncología:</strong> ${realProcedureData.procedimiento.oncologia === 'si' ? 'Sí' : 'No'}</div>
            </div>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e9d5ff;">
                <strong>Funcionario Encargado:</strong> ${realProcedureData.funcionarioEncargado || 'N/A'}
            </div>
        </div>
        ` : ''}

        <!-- Lista de Seguridad del Paciente -->
        ${safetyData.datosBasicos ? `
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: #fef3c7; border-radius: 0.5rem; border-left: 4px solid #f59e0b;">
            <h2 style="margin: 0 0 1rem; color: #f59e0b; font-size: 1.5rem;">Lista de Seguridad del Paciente</h2>

            ${safetyData.fecha ? `
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: #fde68a; border-radius: 0.375rem;">
                <strong>Fecha de Registro:</strong> ${safetyData.fecha}
            </div>
            ` : ''}

            <h3 style="margin: 1rem 0 0.5rem; font-size: 1.125rem; color: #92400e;">Datos Básicos</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                <div><strong>Nombre del Paciente:</strong> ${safetyData.datosBasicos.nombrePaciente || 'N/A'}</div>
                <div><strong>Cédula de Identidad:</strong> ${safetyData.datosBasicos.cedulaIdentidad || 'N/A'}</div>
                <div><strong>Edad:</strong> ${safetyData.datosBasicos.edad || 'N/A'}</div>
                <div><strong>Consentimiento Firmado:</strong> ${safetyData.datosBasicos.consentimientoFirmado === 'si' ? 'Sí' : 'No'}</div>
                <div><strong>Procedimiento Quirúrgico:</strong> ${safetyData.datosBasicos.procedimientoQuirurgico || 'N/A'}</div>
                <div><strong>Sitio Quirúrgico:</strong> ${safetyData.datosBasicos.sitioQuirurgico || 'N/A'}</div>
            </div>

            <h3 style="margin: 1rem 0 0.5rem; font-size: 1.125rem; color: #92400e;">Consulta de Anestesia</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                <div><strong>Realizada:</strong> ${safetyData.consultaAnestesia?.realizada === 'si' ? 'Sí' : 'No'}</div>
                <div><strong>Evaluación Previa:</strong> ${safetyData.consultaAnestesia?.evaluacionPrevia === 'si' ? 'Sí' : 'No'}</div>
            </div>

            <h3 style="margin: 1rem 0 0.5rem; font-size: 1.125rem; color: #92400e;">Evaluación de Riesgos</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                <div><strong>Vía Aérea Difícil:</strong> ${safetyData.evaluacionRiesgos?.viaAereaDificil || 'N/A'}</div>
                <div><strong>Broncoaspiración:</strong> ${safetyData.evaluacionRiesgos?.broncoaspiracion || 'N/A'}</div>
                <div><strong>Pérdida Sangre:</strong> ${safetyData.evaluacionRiesgos?.perdidaSangre || 'N/A'}</div>
            </div>

            <h3 style="margin: 1rem 0 0.5rem; font-size: 1.125rem; color: #92400e;">Recursos Necesarios</h3>
            <p>${safetyData.recursosNecesarios || 'N/A'}</p>

            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #fde68a;">
                <strong>Funcionario Responsable:</strong> ${safetyData.funcionarioResponsable || 'N/A'}
            </div>
        </div>
        ` : ''}

        <!-- Antes de Iniciar Cirugía -->
        ${preSurgeryData.verificaciones ? `
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: #dbeafe; border-radius: 0.5rem; border-left: 4px solid #3b82f6; page-break-inside: avoid;">
            <h2 style="margin: 0 0 1rem; color: #3b82f6; font-size: 1.5rem;">Antes de Iniciar Cirugía</h2>

            ${preSurgeryData.fecha ? `
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: #bfdbfe; border-radius: 0.375rem;">
                <strong>Fecha de Verificación:</strong> ${preSurgeryData.fecha}
            </div>
            ` : ''}

            <h3 style="margin: 1rem 0 0.5rem; font-size: 1.125rem; color: #1e40af;">Verificaciones Iniciales</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                <div><strong>Presentación del Equipo:</strong> ${preSurgeryData.verificaciones.presentacionEquipo === 'si' ? '✓ Sí' : '✗ No'}</div>
                <div><strong>Confirmar Identidad del Paciente:</strong> ${preSurgeryData.verificaciones.confirmarIdentidad === 'si' ? '✓ Sí' : '✗ No'}</div>
                <div><strong>Confirmar Procedimiento:</strong> ${preSurgeryData.verificaciones.confirmarProcedimiento === 'si' ? '✓ Sí' : '✗ No'}</div>
                <div><strong>Confirmar Sitio Quirúrgico:</strong> ${preSurgeryData.verificaciones.confirmarSitio === 'si' ? '✓ Sí' : '✗ No'}</div>
            </div>

            <h3 style="margin: 1rem 0 0.5rem; font-size: 1.125rem; color: #1e40af;">Medicación Administrada</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                <div><strong>Anticoagulantes Administrados:</strong> ${
                    preSurgeryData.verificaciones.anticoagulantesAdmin === 'si' ? '✓ Sí' :
                    preSurgeryData.verificaciones.anticoagulantesAdmin === 'no' ? '✗ No' :
                    'No especificado'
                }</div>
                <div><strong>Antibióticos Administrados:</strong> ${
                    preSurgeryData.verificaciones.antibioticosAdmin === 'si' ? '✓ Sí' :
                    preSurgeryData.verificaciones.antibioticosAdmin === 'no' ? '✗ No' :
                    'No especificado'
                }</div>
            </div>

            <h3 style="margin: 1rem 0 0.5rem; font-size: 1.125rem; color: #1e40af;">Comunicaciones del Equipo</h3>
            <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 0.75rem;">
                <div><strong>Cirujano Comunica Pasos Críticos:</strong> ${
                    preSurgeryData.verificaciones.cirujanoComunica === 'si' ? '✓ Sí' :
                    preSurgeryData.verificaciones.cirujanoComunica === 'no' ? '✗ No' :
                    'No especificado'
                }</div>
                <div><strong>Anestesia Comunica Consideraciones:</strong> ${
                    preSurgeryData.verificaciones.anestesiaComunica === 'si' ? '✓ Sí' :
                    preSurgeryData.verificaciones.anestesiaComunica === 'no' ? '✗ No' :
                    'No especificado'
                }</div>
                <div><strong>Instrumentista Comunica Esterilidad:</strong> ${
                    preSurgeryData.verificaciones.instrumentistaComunica === 'si' ? '✓ Sí' :
                    preSurgeryData.verificaciones.instrumentistaComunica === 'no' ? '✗ No' :
                    'No especificado'
                }</div>
            </div>

            <h3 style="margin: 1rem 0 0.5rem; font-size: 1.125rem; color: #1e40af;">Equipamiento y Monitorización</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                <div><strong>Oxímetro Funcionando:</strong> ${
                    preSurgeryData.verificaciones.oximetro === 'si' ? '✓ Sí' :
                    preSurgeryData.verificaciones.oximetro === 'no' ? '✗ No' :
                    'No especificado'
                }</div>
                <div><strong>Monitorización del Paciente:</strong> ${
                    preSurgeryData.verificaciones.monitorizacion === 'si' ? '✓ Sí' :
                    preSurgeryData.verificaciones.monitorizacion === 'no' ? '✗ No' :
                    'No especificado'
                }</div>
            </div>

            <h3 style="margin: 1rem 0 0.5rem; font-size: 1.125rem; color: #1e40af;">Equipo Quirúrgico</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem;">
                <thead>
                    <tr style="background: #bfdbfe;">
                        <th style="padding: 0.5rem; text-align: left; border: 1px solid #93c5fd;">Rol</th>
                        <th style="padding: 0.5rem; text-align: left; border: 1px solid #93c5fd;">Funcionario</th>
                        <th style="padding: 0.5rem; text-align: left; border: 1px solid #93c5fd;">Relación</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.keys(preSurgeryData.equipoQuirurgico || {}).filter(key => preSurgeryData.equipoQuirurgico[key].nombre).map(key => {
                        // Convertir el key camelCase a formato legible
                        let roleName = key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/cirujano/i, 'Cirujano')
                            .replace(/anestesista/i, 'Anestesista')
                            .replace(/instrumentista/i, 'Instrumentista')
                            .replace(/licenciado/i, 'Licenciado en Enfermería')
                            .replace(/circulante/i, 'Circulante')
                            .trim();

                        return `
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid #bfdbfe;">${roleName}</td>
                            <td style="padding: 0.5rem; border: 1px solid #bfdbfe;">${preSurgeryData.equipoQuirurgico[key].nombre || 'N/A'}</td>
                            <td style="padding: 0.5rem; border: 1px solid #bfdbfe;">${preSurgeryData.equipoQuirurgico[key].relacion || 'N/A'}</td>
                        </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>

            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #bfdbfe;">
                <strong>Funcionario Encargado de esta Verificación:</strong> ${preSurgeryData.funcionarioEncargado || 'N/A'}
            </div>
        </div>
        ` : ''}

        <!-- Durante la Cirugía -->
        ${surgeryData.items && surgeryData.items.length > 0 ? `
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: #d1fae5; border-radius: 0.5rem; border-left: 4px solid #10b981; page-break-inside: avoid;">
            <h2 style="margin: 0 0 1rem; color: #10b981; font-size: 1.5rem;">Insumos y Medicamentos Utilizados Durante la Cirugía</h2>

            ${surgeryData.fecha ? `
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: #a7f3d0; border-radius: 0.375rem;">
                <strong>Fecha del Procedimiento:</strong> ${surgeryData.fecha}
            </div>
            ` : ''}

            <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem;">
                <thead>
                    <tr style="background: #a7f3d0;">
                        <th style="padding: 0.5rem; text-align: left; border: 1px solid #6ee7b7;">Código</th>
                        <th style="padding: 0.5rem; text-align: left; border: 1px solid #6ee7b7;">Nombre</th>
                        <th style="padding: 0.5rem; text-align: center; border: 1px solid #6ee7b7;">Cantidad</th>
                        <th style="padding: 0.5rem; text-align: right; border: 1px solid #6ee7b7;">P. Unitario</th>
                        <th style="padding: 0.5rem; text-align: right; border: 1px solid #6ee7b7;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${surgeryData.items.map(item => `
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid #a7f3d0;">${item.code}</td>
                            <td style="padding: 0.5rem; border: 1px solid #a7f3d0;">${item.name}</td>
                            <td style="padding: 0.5rem; text-align: center; border: 1px solid #a7f3d0;"><strong>${item.quantity}</strong></td>
                            <td style="padding: 0.5rem; text-align: right; border: 1px solid #a7f3d0;">$${item.price.toFixed(2)}</td>
                            <td style="padding: 0.5rem; text-align: right; border: 1px solid #a7f3d0;">$${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr style="background: #6ee7b7; font-weight: bold;">
                        <td colspan="4" style="padding: 0.5rem; text-align: right; border: 1px solid #10b981;">TOTAL:</td>
                        <td style="padding: 0.5rem; text-align: right; border: 1px solid #10b981;">$${surgeryData.total ? surgeryData.total.toFixed(2) : '0.00'}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        ` : ''}

        <!-- Finalizada la Cirugía -->
        ${postSurgeryData.verificaciones ? `
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: #e0e7ff; border-radius: 0.5rem; border-left: 4px solid #6366f1; page-break-inside: avoid;">
            <h2 style="margin: 0 0 1rem; color: #6366f1; font-size: 1.5rem;">Verificación Final Post-Quirúrgica</h2>

            ${postSurgeryData.fecha ? `
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: #c7d2fe; border-radius: 0.375rem;">
                <strong>Fecha de Verificación:</strong> ${postSurgeryData.fecha}
            </div>
            ` : ''}

            <h3 style="margin: 1rem 0 0.5rem; font-size: 1.125rem; color: #4338ca;">Confirmaciones del Equipo</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                <div><strong>Procedimiento Confirmado:</strong> ${postSurgeryData.verificaciones.procedimientoConfirmado === 'si' ? '✓ Sí' : '✗ No'}</div>
                <div><strong>Material Blanco Completo:</strong> ${postSurgeryData.verificaciones.materialBlanco === 'si' ? '✓ Sí' : '✗ No'}</div>
                <div><strong>Instrumentos y Agujas Correcto:</strong> ${postSurgeryData.verificaciones.instrumentosAgujas === 'si' ? '✓ Sí' : '✗ No'}</div>
                <div><strong>Bacteriología Rotulado:</strong> ${postSurgeryData.verificaciones.bacteriologia === 'si' ? '✓ Sí' : '✗ No'}</div>
                <div><strong>Anatomía Patológica Rotulado:</strong> ${postSurgeryData.verificaciones.anatomiaPatologica === 'si' ? '✓ Sí' : '✗ No'}</div>
                <div><strong>Ficha Anestésico Quirúrgica:</strong> ${postSurgeryData.verificaciones.fichaAnestesico === 'si' ? '✓ Sí' : '✗ No'}</div>
                <div><strong>Descripción Operatoria:</strong> ${postSurgeryData.verificaciones.descripcionOperatoria === 'si' ? '✓ Sí' : '✗ No'}</div>
            </div>

            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #c7d2fe;">
                <strong>Funcionario Encargado:</strong> ${postSurgeryData.funcionarioEncargado || 'N/A'}
            </div>
        </div>
        ` : ''}

        <!-- Firma y Fecha -->
        <div style="margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #cbd5e1; page-break-inside: avoid;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem;">
                <div style="text-align: center;">
                    <div style="border-top: 2px solid #334155; padding-top: 0.5rem; margin-top: 3rem;">
                        <strong>Firma del Médico Responsable</strong>
                    </div>
                </div>
                <div style="text-align: center;">
                    <div style="border-top: 2px solid #334155; padding-top: 0.5rem; margin-top: 3rem;">
                        <strong>Firma del Paciente/Responsable</strong>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insertar el contenido en el DOM
    document.getElementById('report-content').innerHTML = reportHTML;
}
