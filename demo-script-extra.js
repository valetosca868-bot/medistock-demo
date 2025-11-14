/*=============== INVENTORY FILTERS ===============*/
const categoryFilter = document.getElementById('category-filter');
const drugTypeFilter = document.getElementById('drug-type-filter');
const statusFilter = document.getElementById('status-filter');
const inventoryTbody = document.getElementById('inventory-tbody');

function filterInventory() {
    const category = categoryFilter?.value || '';
    const drugType = drugTypeFilter?.value || '';
    const status = statusFilter?.value || '';

    const rows = inventoryTbody?.querySelectorAll('tr');

    rows?.forEach(row => {
        const rowCategory = row.getAttribute('data-category');
        const rowDrugType = row.getAttribute('data-drug-type');
        const rowStatus = row.getAttribute('data-status');

        const categoryMatch = !category || rowCategory === category;
        const drugTypeMatch = !drugType || rowDrugType === drugType;
        const statusMatch = !status || rowStatus === status;

        if (categoryMatch && drugTypeMatch && statusMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    // Show notification
    const visibleCount = Array.from(rows).filter(r => r.style.display !== 'none').length;
    showNotification(`Mostrando ${visibleCount} productos`, 'info');
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', filterInventory);
}

if (drugTypeFilter) {
    drugTypeFilter.addEventListener('change', filterInventory);
}

if (statusFilter) {
    statusFilter.addEventListener('change', filterInventory);
}

/*=============== EDIT ITEM MODAL ===============*/
function createEditItemModal(row) {
    const code = row.children[0].textContent;
    const name = row.children[1].textContent;
    const quantity = row.children[4].textContent;

    const modalHTML = `
        <div class="modal-overlay active" id="edit-item-modal">
            <div class="modal">
                <div class="modal-header">
                    <h3>Editar Item - ${code}</h3>
                    <button class="modal-close" onclick="closeModal('edit-item-modal')">
                        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Código</label>
                        <input type="text" class="form-control" value="${code}" disabled>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="edit-item-name" value="${name}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Cantidad</label>
                        <input type="number" class="form-control" id="edit-item-quantity" value="${quantity}">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('edit-item-modal')">Cancelar</button>
                    <button class="btn btn-primary" onclick="saveItemEdit('${code}')">Guardar Cambios</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Add click handlers to edit buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.edit-item-btn')) {
        const row = e.target.closest('tr');
        createEditItemModal(row);
    }
});

function saveItemEdit(code) {
    const newName = document.getElementById('edit-item-name').value;
    const newQuantity = document.getElementById('edit-item-quantity').value;

    showNotification(`Item ${code} actualizado correctamente`, 'success');
    closeModal('edit-item-modal');
}

/*=============== EDIT PATIENT MODAL ===============*/
const editPatientBtns = document.querySelectorAll('.edit-patient-btn');

editPatientBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const patientId = btn.getAttribute('data-patient-id');
        const patientCard = btn.closest('.patient-card');
        const patientName = patientCard.querySelector('h3').textContent;
        const age = patientCard.querySelector('.detail-value').textContent;

        const modalHTML = `
            <div class="modal-overlay active" id="edit-patient-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h3>Editar Paciente - ${patientId}</h3>
                        <button class="modal-close" onclick="closeModal('edit-patient-modal')">
                            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="form-label">ID</label>
                            <input type="text" class="form-control" value="#${patientId}" disabled>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nombre Completo</label>
                            <input type="text" class="form-control" id="edit-patient-name" value="${patientName}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Edad</label>
                            <input type="text" class="form-control" id="edit-patient-age" value="${age}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Teléfono</label>
                            <input type="tel" class="form-control" id="edit-patient-phone" value="+1 (555) 123-4567">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" id="edit-patient-email" value="paciente@email.com">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Dirección</label>
                            <textarea class="form-control" id="edit-patient-address" rows="2">123 Calle Principal, Ciudad</textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="closeModal('edit-patient-modal')">Cancelar</button>
                        <button class="btn btn-primary" onclick="savePatientEdit('${patientId}')">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    });
});

function savePatientEdit(patientId) {
    const newName = document.getElementById('edit-patient-name').value;
    const newAge = document.getElementById('edit-patient-age').value;

    showNotification(`Paciente ${patientId} actualizado correctamente`, 'success');
    closeModal('edit-patient-modal');
}

/*=============== MODAL CLOSE FUNCTION ===============*/
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

/*=============== ADDITIONAL CHARTS ===============*/
window.addEventListener('load', () => {
    // Cash Flow Chart
    const cashFlowCtx = document.getElementById('cashFlowChart');
    if (cashFlowCtx) {
        new Chart(cashFlowCtx, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Ingresos',
                    data: [125000, 138000, 142000, 135000, 148000, 125450],
                    backgroundColor: 'rgba(16, 185, 129, 0.5)',
                    borderColor: '#10b981',
                    borderWidth: 2
                }, {
                    label: 'Gastos',
                    data: [85000, 92000, 88000, 90000, 95000, 79772],
                    backgroundColor: 'rgba(239, 68, 68, 0.5)',
                    borderColor: '#ef4444',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Expense Chart
    const expenseCtx = document.getElementById('expenseChart');
    if (expenseCtx) {
        new Chart(expenseCtx, {
            type: 'doughnut',
            data: {
                labels: ['Personal', 'Medicamentos', 'Equipos', 'Servicios', 'Otros'],
                datasets: [{
                    data: [45000, 15000, 8000, 7000, 5000],
                    backgroundColor: [
                        '#2563eb',
                        '#8b5cf6',
                        '#06b6d4',
                        '#10b981',
                        '#f59e0b'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': $' + context.parsed.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Admissions Chart
    const admissionsCtx = document.getElementById('admissionsChart');
    if (admissionsCtx) {
        new Chart(admissionsCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Admisiones',
                    data: [420, 380, 450, 410, 470, 456],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Services Chart
    const servicesCtx = document.getElementById('servicesChart');
    if (servicesCtx) {
        new Chart(servicesCtx, {
            type: 'bar',
            data: {
                labels: ['Consultas', 'Cirugía', 'Urgencias', 'Laboratorio', 'Imagenología'],
                datasets: [{
                    label: 'Servicios',
                    data: [850, 320, 560, 680, 420],
                    backgroundColor: [
                        'rgba(37, 99, 235, 0.5)',
                        'rgba(139, 92, 246, 0.5)',
                        'rgba(239, 68, 68, 0.5)',
                        'rgba(16, 185, 129, 0.5)',
                        'rgba(245, 158, 11, 0.5)'
                    ],
                    borderColor: [
                        '#2563eb',
                        '#8b5cf6',
                        '#ef4444',
                        '#10b981',
                        '#f59e0b'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
});

/*=============== BED ITEM INTERACTIONS ===============*/
const bedItems = document.querySelectorAll('.bed-item');

bedItems.forEach(bed => {
    bed.addEventListener('click', () => {
        const bedNumber = bed.textContent;
        const status = bed.classList.contains('occupied') ? 'ocupada' : 'disponible';
        showNotification(`Cama ${bedNumber}: ${status}`, 'info');
    });
});

/*=============== SUPPLIER EDIT BUTTONS ===============*/
document.addEventListener('click', (e) => {
    if (e.target.closest('.supplier-edit-btn')) {
        const supplierCard = e.target.closest('.supplier-card');
        const supplierName = supplierCard.querySelector('h3').textContent;
        showNotification(`Editando proveedor: ${supplierName}`, 'info');
    }
});

/*=============== CONSOLE WELCOME MESSAGE ===============*/
console.log('%c🎯 Demo Interactivo Completo', 'color: #2563eb; font-size: 18px; font-weight: bold;');
console.log('%c✅ Todas las funcionalidades están activas', 'color: #10b981; font-size: 14px;');
console.log('%cFiltra por tipo de fármaco, edita pacientes, explora los gráficos!', 'color: #64748b; font-size: 12px;');
