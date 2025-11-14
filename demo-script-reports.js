/*=============== REPORTES Y ANÁLISIS ===============*/

// Función para aplicar filtros a las cirugías
function aplicarFiltros() {
    const fechaDesde = document.getElementById('filter-fecha-desde').value;
    const fechaHasta = document.getElementById('filter-fecha-hasta').value;
    const especialidad = document.getElementById('filter-especialidad').value;
    const anestesia = document.getElementById('filter-anestesia').value;
    const sitio = document.getElementById('filter-sitio').value;
    const atb = document.getElementById('filter-atb').value;

    // Obtener todos los datos
    const realProcedureData = JSON.parse(localStorage.getItem('realProcedureData') || '{}');
    const surgeryData = JSON.parse(localStorage.getItem('surgeryData') || '{}');
    const safetyData = JSON.parse(localStorage.getItem('safetyChecklistData') || '{}');
    const preSurgeryData = JSON.parse(localStorage.getItem('preSurgeryData') || '{}');

    console.log('aplicarFiltros - Data loaded:', {
        surgeries: Object.keys(realProcedureData).length,
        filters: { fechaDesde, fechaHasta, especialidad, anestesia, sitio, atb }
    });

    let cirugiasFiltradas = [];

    // Procesar cada cirugía
    Object.keys(realProcedureData).forEach(cedula => {
        const cirugia = realProcedureData[cedula];
        const surgery = surgeryData[cedula] || {};
        const safety = safetyData[cedula] || {};
        const preSurgery = preSurgeryData[cedula] || {};

        // Aplicar filtros
        let cumpleFiltros = true;

        // Filtro por fecha
        if (fechaDesde && cirugia.fecha) {
            const fechaCirugia = new Date(cirugia.fecha.split('/').reverse().join('-'));
            const fechaDesdeObj = new Date(fechaDesde);
            if (fechaCirugia < fechaDesdeObj) cumpleFiltros = false;
        }

        if (fechaHasta && cirugia.fecha) {
            const fechaCirugia = new Date(cirugia.fecha.split('/').reverse().join('-'));
            const fechaHastaObj = new Date(fechaHasta);
            if (fechaCirugia > fechaHastaObj) cumpleFiltros = false;
        }

        // Filtro por especialidad
        if (especialidad && cirugia.procedimiento && cirugia.procedimiento.categoria !== especialidad) {
            cumpleFiltros = false;
        }

        // Filtro por tipo de anestesia
        if (anestesia && cirugia.procedimiento && cirugia.procedimiento.tipoAnestesia !== anestesia) {
            cumpleFiltros = false;
        }

        // Filtro por sitio quirúrgico
        if (sitio && safety.datosBasicos) {
            const sitioQuirurgico = safety.datosBasicos.sitioQuirurgico || '';
            if (sitioQuirurgico !== sitio) cumpleFiltros = false;
        }

        // Filtro por ATB
        if (atb && preSurgery.verificaciones) {
            if (preSurgery.verificaciones.antibioticosAdmin !== atb) cumpleFiltros = false;
        }

        if (cumpleFiltros) {
            cirugiasFiltradas.push({
                cedula,
                paciente: cirugia.paciente,
                procedimiento: cirugia.procedimiento,
                fecha: cirugia.fecha,
                total: surgery.total || 0,
                safety,
                preSurgery
            });
        }
    });

    // Actualizar tabla
    renderTablaCirugias(cirugiasFiltradas);

    // Actualizar estadísticas
    actualizarEstadisticas(cirugiasFiltradas);

    console.log(`Filtered results: ${cirugiasFiltradas.length} surgeries found`);
}

// Renderizar tabla de cirugías
function renderTablaCirugias(cirugias) {
    const tbody = document.getElementById('tbody-cirugias');
    const totalSpan = document.getElementById('total-cirugias');

    if (cirugias.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 2rem; color: var(--text-light);">
                    No se encontraron cirugías con los filtros aplicados
                </td>
            </tr>
        `;
        totalSpan.textContent = '(0)';
        return;
    }

    tbody.innerHTML = cirugias.map(c => `
        <tr>
            <td>${c.fecha || 'N/A'}</td>
            <td>${c.paciente?.nombre || 'N/A'}</td>
            <td>${c.cedula}</td>
            <td>${c.procedimiento?.categoria || 'N/A'}</td>
            <td>${c.procedimiento?.tipoAnestesia || 'N/A'}</td>
            <td>${c.safety?.datosBasicos?.sitioQuirurgico || 'N/A'}</td>
            <td>${c.preSurgery?.verificaciones?.antibioticosAdmin === 'si' ? '✓' : '✗'}</td>
            <td style="font-weight: 600; color: var(--success-color);">$${(c.total || 0).toFixed(2)}</td>
            <td>
                <button class="btn btn-secondary" onclick="verDetalleCirugia('${c.cedula}')" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;">
                    Ver Detalle
                </button>
            </td>
        </tr>
    `).join('');

    totalSpan.textContent = `(${cirugias.length})`;
}

// Actualizar estadísticas
function actualizarEstadisticas(cirugias) {
    console.log('Actualizando estadísticas con', cirugias.length, 'cirugías');

    // Calcular estadísticas reales
    const totalPacientes = new Set(cirugias.map(c => c.cedula)).size;
    const gastoTotal = cirugias.reduce((sum, c) => sum + (c.total || 0), 0);
    const promedioGasto = cirugias.length > 0 ? gastoTotal / cirugias.length : 0;

    // Calcular satisfacción (simulado basado en éxito)
    const atbAdministrados = cirugias.filter(c => c.preSurgery?.verificaciones?.antibioticosAdmin === 'si').length;
    const tasaSatisfaccion = cirugias.length > 0 ? Math.round((atbAdministrados / cirugias.length) * 100) : 0;

    // Calcular tiempo promedio (simulado)
    const tiempoPromedio = Math.max(8, Math.min(20, 12 + Math.floor(Math.random() * 5)));

    // Calcular estancia promedio (simulado basado en tipo de cirugía)
    const estanciasPromedio = cirugias.map(c => {
        const cat = c.procedimiento?.categoria || '';
        if (cat === 'Cardiovascular' || cat === 'Neurocirugía') return 5;
        if (cat === 'Ortopédica') return 4;
        if (cat === 'General') return 2;
        return 3;
    });
    const estanciaPromedio = estanciasPromedio.length > 0
        ? (estanciasPromedio.reduce((a, b) => a + b, 0) / estanciasPromedio.length).toFixed(1)
        : '3.0';

    // Actualizar valores en el DOM (si existen los elementos)
    const statCards = document.querySelectorAll('.stat-card .stat-value');
    if (statCards.length >= 4) {
        statCards[0].textContent = totalPacientes.toLocaleString();
        statCards[1].textContent = `${tasaSatisfaccion}%`;
        statCards[2].textContent = `${tiempoPromedio} min`;
        statCards[3].textContent = `${estanciaPromedio} días`;
    }

    // Actualizar gráficos
    actualizarGraficos(cirugias);
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('filter-fecha-desde').value = '';
    document.getElementById('filter-fecha-hasta').value = '';
    document.getElementById('filter-especialidad').value = '';
    document.getElementById('filter-anestesia').value = '';
    document.getElementById('filter-sitio').value = '';
    document.getElementById('filter-atb').value = '';

    aplicarFiltros();

    if (typeof showNotification === 'function') {
        showNotification('✓ Filtros limpiados - Mostrando todas las cirugías', 'success');
    }
}

// Ver detalle de cirugía
function verDetalleCirugia(cedula) {
    sessionStorage.setItem('currentPatient', cedula);
    const patients = JSON.parse(localStorage.getItem('patients') || '{}');
    const patient = patients[cedula];

    if (patient) {
        sessionStorage.setItem('currentPatientName', patient.nombre);
        sessionStorage.setItem('currentPatientAge', patient.edad);
    }

    // Generar vista previa y mostrar
    generatePrintPreview();
    showPage('print-preview');
}

// Variables globales para los gráficos
let admissionsChart = null;
let servicesChart = null;

// Actualizar gráficos
function actualizarGraficos(cirugias) {
    // Preparar datos para gráfico de admisiones por mes
    const admisionesPorMes = {};
    const mesesNombres = ['Dic 2024', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'];

    cirugias.forEach(c => {
        if (c.fecha) {
            const [dia, mes, anio] = c.fecha.split('/');
            let mesKey = '';
            if (mes === '12' && anio === '2024') {
                mesKey = 'Dic 2024';
            } else if (anio === '2025') {
                const idx = parseInt(mes);
                mesKey = mesesNombres[idx] || mes;
            }

            if (!admisionesPorMes[mesKey]) {
                admisionesPorMes[mesKey] = 0;
            }
            admisionesPorMes[mesKey]++;
        }
    });

    // Preparar datos para gráfico de servicios
    const serviciosPorCategoria = {};
    cirugias.forEach(c => {
        const cat = c.procedimiento?.categoria || 'Otros';
        if (!serviciosPorCategoria[cat]) {
            serviciosPorCategoria[cat] = 0;
        }
        serviciosPorCategoria[cat]++;
    });

    // Crear/actualizar gráfico de admisiones
    const admissionsCtx = document.getElementById('admissionsChart');
    if (admissionsCtx) {
        if (admissionsChart) {
            admissionsChart.destroy();
        }

        const labels = mesesNombres;
        const data = labels.map(mes => admisionesPorMes[mes] || 0);

        admissionsChart = new Chart(admissionsCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cirugías por Mes',
                    data: data,
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    // Crear/actualizar gráfico de servicios
    const servicesCtx = document.getElementById('servicesChart');
    if (servicesCtx) {
        if (servicesChart) {
            servicesChart.destroy();
        }

        const labels = Object.keys(serviciosPorCategoria);
        const data = Object.values(serviciosPorCategoria);
        const colors = [
            'rgba(102, 126, 234, 0.8)',
            'rgba(118, 75, 162, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(236, 72, 153, 0.8)'
        ];

        servicesChart = new Chart(servicesCtx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Exportar reporte a Excel
function exportarReporte() {
    // Obtener cirugías filtradas
    const fechaDesde = document.getElementById('filter-fecha-desde').value;
    const fechaHasta = document.getElementById('filter-fecha-hasta').value;
    const especialidad = document.getElementById('filter-especialidad').value;
    const anestesia = document.getElementById('filter-anestesia').value;
    const sitio = document.getElementById('filter-sitio').value;
    const atb = document.getElementById('filter-atb').value;

    const realProcedureData = JSON.parse(localStorage.getItem('realProcedureData') || '{}');
    const surgeryData = JSON.parse(localStorage.getItem('surgeryData') || '{}');
    const safetyData = JSON.parse(localStorage.getItem('safetyChecklistData') || '{}');
    const preSurgeryData = JSON.parse(localStorage.getItem('preSurgeryData') || '{}');

    let cirugiasFiltradas = [];

    Object.keys(realProcedureData).forEach(cedula => {
        const cirugia = realProcedureData[cedula];
        const surgery = surgeryData[cedula] || {};
        const safety = safetyData[cedula] || {};
        const preSurgery = preSurgeryData[cedula] || {};

        let cumpleFiltros = true;

        // Aplicar mismos filtros
        if (fechaDesde && cirugia.fecha) {
            const fechaCirugia = new Date(cirugia.fecha.split('/').reverse().join('-'));
            const fechaDesdeObj = new Date(fechaDesde);
            if (fechaCirugia < fechaDesdeObj) cumpleFiltros = false;
        }

        if (fechaHasta && cirugia.fecha) {
            const fechaCirugia = new Date(cirugia.fecha.split('/').reverse().join('-'));
            const fechaHastaObj = new Date(fechaHasta);
            if (fechaCirugia > fechaHastaObj) cumpleFiltros = false;
        }

        if (especialidad && cirugia.procedimiento && cirugia.procedimiento.categoria !== especialidad) {
            cumpleFiltros = false;
        }

        if (anestesia && cirugia.procedimiento && cirugia.procedimiento.tipoAnestesia !== anestesia) {
            cumpleFiltros = false;
        }

        if (sitio && safety.datosBasicos) {
            const sitioQuirurgico = safety.datosBasicos.sitioQuirurgico || '';
            if (sitioQuirurgico !== sitio) cumpleFiltros = false;
        }

        if (atb && preSurgery.verificaciones) {
            if (preSurgery.verificaciones.antibioticosAdmin !== atb) cumpleFiltros = false;
        }

        if (cumpleFiltros) {
            cirugiasFiltradas.push({
                Fecha: cirugia.fecha,
                Paciente: cirugia.paciente?.nombre || 'N/A',
                Cédula: cedula,
                Procedimiento: cirugia.procedimiento?.nombre || 'N/A',
                Especialidad: cirugia.procedimiento?.categoria || 'N/A',
                Anestesia: cirugia.procedimiento?.tipoAnestesia || 'N/A',
                'Sitio Quirúrgico': safety.datosBasicos?.sitioQuirurgico || 'N/A',
                'ATB Administrados': preSurgery.verificaciones?.antibioticosAdmin === 'si' ? 'Sí' : 'No',
                'Total Gasto': surgery.total || 0
            });
        }
    });

    if (cirugiasFiltradas.length === 0) {
        showNotification('⚠ No hay datos para exportar con los filtros aplicados', 'warning');
        return;
    }

    // Crear workbook
    const wb = XLSX.utils.book_new();

    // Hoja 1: Cirugías
    const ws1 = XLSX.utils.json_to_sheet(cirugiasFiltradas);
    XLSX.utils.book_append_sheet(wb, ws1, 'Cirugías');

    // Hoja 2: Resumen por Especialidad
    const resumenEspecialidad = {};
    cirugiasFiltradas.forEach(c => {
        if (!resumenEspecialidad[c.Especialidad]) {
            resumenEspecialidad[c.Especialidad] = { Cantidad: 0, Total: 0 };
        }
        resumenEspecialidad[c.Especialidad].Cantidad++;
        resumenEspecialidad[c.Especialidad].Total += c['Total Gasto'];
    });

    const resumenArray = Object.keys(resumenEspecialidad).map(esp => ({
        Especialidad: esp,
        'Cantidad de Cirugías': resumenEspecialidad[esp].Cantidad,
        'Gasto Total': resumenEspecialidad[esp].Total.toFixed(2),
        'Promedio': (resumenEspecialidad[esp].Total / resumenEspecialidad[esp].Cantidad).toFixed(2)
    }));

    const ws2 = XLSX.utils.json_to_sheet(resumenArray);
    XLSX.utils.book_append_sheet(wb, ws2, 'Resumen por Especialidad');

    // Descargar archivo
    const fecha = new Date().toISOString().split('T')[0];
    const filename = `Reporte_Cirugias_${fecha}.xlsx`;
    XLSX.writeFile(wb, filename);

    showNotification(`✓ Reporte exportado: ${cirugiasFiltradas.length} cirugías`, 'success');
}

/*=============== GESTIÓN DE INVENTARIO ===============*/

// Autenticar inventario
function autenticarInventario() {
    const password = document.getElementById('inventory-password').value;

    if (password === 'admin123') {
        document.getElementById('inventory-auth').style.display = 'none';
        document.getElementById('inventory-content').style.display = 'block';
        cargarInventario();
        showNotification('✓ Acceso concedido', 'success');
    } else {
        showNotification('✗ Contraseña incorrecta', 'danger');
    }
}

// Cargar inventario
function cargarInventario() {
    // Inicializar inventario con los items existentes si no existe
    let inventario = JSON.parse(localStorage.getItem('inventario') || '{}');

    if (Object.keys(inventario).length === 0) {
        // Copiar items de surgeryItemsDB al inventario
        Object.keys(surgeryItemsDB).forEach(code => {
            inventario[code] = {
                ...surgeryItemsDB[code],
                stock: Math.floor(Math.random() * 100) + 50, // Stock aleatorio para demo
                stockMinimo: 20
            };
        });
        localStorage.setItem('inventario', JSON.stringify(inventario));
    }

    renderInventario(inventario);
    actualizarEstadisticasInventario(inventario);
}

// Render inventario
function renderInventario(inventario) {
    const tbody = document.getElementById('tbody-inventario');

    tbody.innerHTML = Object.keys(inventario).map(code => {
        const item = inventario[code];
        const stockBajo = item.stock <= item.stockMinimo;
        const estadoBadge = stockBajo ?
            '<span style="background: #fef3c7; color: #92400e; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem;">⚠ Stock Bajo</span>' :
            '<span style="background: #d1fae5; color: #065f46; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem;">✓ Disponible</span>';

        return `
            <tr ${stockBajo ? 'style="background: #fef3c7;"' : ''}>
                <td><strong>${item.code}</strong></td>
                <td>${item.name}</td>
                <td><span style="background: #e0e7ff; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">${item.categoria || 'N/A'}</span></td>
                <td>$${item.price.toFixed(2)}</td>
                <td><strong>${item.stock}</strong></td>
                <td>${item.stockMinimo}</td>
                <td>${estadoBadge}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editarStock('${code}')" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;">
                        Editar
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Actualizar estadísticas de inventario
function actualizarEstadisticasInventario(inventario) {
    const total = Object.keys(inventario).length;
    const stockBajo = Object.values(inventario).filter(i => i.stock <= i.stockMinimo).length;
    const stockDisponible = Object.values(inventario).filter(i => i.stock > i.stockMinimo).length;

    document.getElementById('total-insumos').textContent = total;
    document.getElementById('stock-bajo').textContent = stockBajo;
    document.getElementById('stock-disponible').textContent = stockDisponible;
}

// Mostrar formulario nuevo insumo
function mostrarFormularioNuevoInsumo() {
    document.getElementById('form-nuevo-insumo').style.display = 'block';
}

// Cerrar formulario insumo
function cerrarFormularioInsumo() {
    document.getElementById('form-nuevo-insumo').style.display = 'none';
    document.getElementById('nuevo-insumo-form').reset();
}

// Guardar nuevo insumo
function guardarNuevoInsumo() {
    const form = document.getElementById('nuevo-insumo-form');
    const formData = new FormData(form);

    const nuevoInsumo = {
        code: formData.get('codigo'),
        name: formData.get('nombre'),
        categoria: formData.get('categoria'),
        price: parseFloat(formData.get('precio')),
        stock: parseInt(formData.get('stock')),
        stockMinimo: parseInt(formData.get('stockMinimo'))
    };

    // Guardar en inventario
    let inventario = JSON.parse(localStorage.getItem('inventario') || '{}');

    if (inventario[nuevoInsumo.code]) {
        showNotification('✗ El código ya existe', 'danger');
        return;
    }

    inventario[nuevoInsumo.code] = nuevoInsumo;
    localStorage.setItem('inventario', JSON.stringify(inventario));

    // También agregar a surgeryItemsDB para que esté disponible en cirugías
    surgeryItemsDB[nuevoInsumo.code] = nuevoInsumo;

    showNotification('✓ Insumo agregado exitosamente', 'success');
    cerrarFormularioInsumo();
    cargarInventario();
}

// Editar stock
function editarStock(code) {
    const inventario = JSON.parse(localStorage.getItem('inventario') || '{}');
    const item = inventario[code];

    const nuevoStock = prompt(`Ingrese el nuevo stock para ${item.name}\nStock actual: ${item.stock}`, item.stock);

    if (nuevoStock !== null && !isNaN(nuevoStock)) {
        item.stock = parseInt(nuevoStock);
        inventario[code] = item;
        localStorage.setItem('inventario', JSON.stringify(inventario));

        showNotification('✓ Stock actualizado', 'success');
        cargarInventario();
    }
}

// Buscar en inventario
function buscarEnInventario() {
    const busqueda = document.getElementById('buscar-insumo').value.toLowerCase();
    const inventario = JSON.parse(localStorage.getItem('inventario') || '{}');

    const filtrado = {};
    Object.keys(inventario).forEach(code => {
        const item = inventario[code];
        if (item.name.toLowerCase().includes(busqueda) ||
            item.code.toLowerCase().includes(busqueda) ||
            (item.categoria && item.categoria.toLowerCase().includes(busqueda))) {
            filtrado[code] = item;
        }
    });

    renderInventario(filtrado);
}

/*=============== CIERRE MENSUAL ===============*/

// Cargar cierre mensual
function cargarCierreMensual() {
    const mes = parseInt(document.getElementById('cierre-mes').value);
    const anio = parseInt(document.getElementById('cierre-anio').value);

    // Obtener todos los datos
    const surgeryData = JSON.parse(localStorage.getItem('surgeryData') || '{}');

    let cirugiasMes = [];
    let gastoTotal = 0;

    Object.keys(surgeryData).forEach(cedula => {
        const surgery = surgeryData[cedula];
        if (surgery.fecha) {
            const [dia, mesStr, anioStr] = surgery.fecha.split('/');
            const mesCirugia = parseInt(mesStr);
            const anioCirugia = parseInt(anioStr);

            if (mesCirugia === mes && anioCirugia === anio) {
                cirugiasMes.push(surgery);
                gastoTotal += surgery.total || 0;
            }
        }
    });

    // Actualizar estadísticas
    document.getElementById('gasto-total-mes').textContent = `$${gastoTotal.toFixed(2)}`;
    document.getElementById('cirugias-mes').textContent = cirugiasMes.length;
    document.getElementById('promedio-cirugia').textContent = cirugiasMes.length > 0 ?
        `$${(gastoTotal / cirugiasMes.length).toFixed(2)}` : '$0.00';

    // Calcular desglose por categoría
    calcularDesglosePorCategoria(cirugiasMes);
}

// Calcular desglose por categoría
function calcularDesglosePorCategoria(cirugias) {
    const categorias = {};

    cirugias.forEach(cirugia => {
        if (cirugia.items) {
            cirugia.items.forEach(item => {
                const cat = item.categoria || 'Sin Categoría';
                if (!categorias[cat]) {
                    categorias[cat] = {
                        cantidad: 0,
                        total: 0
                    };
                }
                categorias[cat].cantidad += item.quantity;
                categorias[cat].total += item.price * item.quantity;
            });
        }
    });

    const totalGeneral = Object.values(categorias).reduce((sum, c) => sum + c.total, 0);

    const tbody = document.getElementById('tbody-gastos-categoria');
    tbody.innerHTML = Object.keys(categorias).map(cat => {
        const data = categorias[cat];
        const porcentaje = totalGeneral > 0 ? (data.total / totalGeneral * 100).toFixed(1) : 0;

        return `
            <tr>
                <td><strong>${cat}</strong></td>
                <td>${data.cantidad}</td>
                <td style="font-weight: 600; color: var(--success-color);">$${data.total.toFixed(2)}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="flex: 1; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${porcentaje}%; height: 100%; background: var(--primary-color);"></div>
                        </div>
                        <span style="min-width: 50px;">${porcentaje}%</span>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    if (Object.keys(categorias).length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 2rem; color: var(--text-light);">
                    No hay datos para el período seleccionado
                </td>
            </tr>
        `;
    }
}

// Mostrar vista previa del cierre mensual
function mostrarVistaPreviaCierreMensual(mes, anio) {
    // Guardar mes y año en sessionStorage para usarlos en la vista previa
    sessionStorage.setItem('cierreMes', mes);
    sessionStorage.setItem('cierreAnio', anio);

    const mesesNombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesNombre = mesesNombres[mes - 1];

    // Obtener datos del mes
    const surgeryData = JSON.parse(localStorage.getItem('surgeryData') || '{}');
    let cirugiasMes = [];
    let gastoTotal = 0;

    Object.keys(surgeryData).forEach(cedula => {
        const surgery = surgeryData[cedula];
        if (surgery.fecha) {
            const [dia, mesStr, anioStr] = surgery.fecha.split('/');
            const mesCirugia = parseInt(mesStr);
            const anioCirugia = parseInt(anioStr);

            if (mesCirugia === mes && anioCirugia === anio) {
                cirugiasMes.push({
                    cedula,
                    ...surgery
                });
                gastoTotal += surgery.total || 0;
            }
        }
    });

    if (cirugiasMes.length === 0) {
        showNotification('⚠ No hay datos para exportar en este período', 'warning');
        return;
    }

    // Calcular desglose por categoría
    const categorias = {};
    cirugiasMes.forEach(cirugia => {
        if (cirugia.items) {
            cirugia.items.forEach(item => {
                const cat = item.categoria || 'Sin Categoría';
                if (!categorias[cat]) {
                    categorias[cat] = {
                        cantidad: 0,
                        total: 0
                    };
                }
                categorias[cat].cantidad += item.quantity;
                categorias[cat].total += item.price * item.quantity;
            });
        }
    });

    // Crear workbook
    const wb = XLSX.utils.book_new();

    // Hoja 1: Resumen
    const resumenData = [
        ['CIERRE MENSUAL - MEDISTOCK PRO'],
        ['Período:', `${mesNombre} ${anio}`],
        ['Fecha de Generación:', new Date().toLocaleDateString()],
        [],
        ['RESUMEN GENERAL'],
        ['Cirugías Realizadas:', cirugiasMes.length],
        ['Gasto Total:', `$${gastoTotal.toFixed(2)}`],
        ['Promedio por Cirugía:', `$${(gastoTotal / cirugiasMes.length).toFixed(2)}`],
        [],
        ['DESGLOSE POR CATEGORÍA'],
        ['Categoría', 'Cantidad', 'Total', '% del Total']
    ];

    Object.keys(categorias).forEach(cat => {
        const data = categorias[cat];
        const porcentaje = (data.total / gastoTotal * 100).toFixed(1);
        resumenData.push([cat, data.cantidad, `$${data.total.toFixed(2)}`, `${porcentaje}%`]);
    });

    const ws1 = XLSX.utils.aoa_to_sheet(resumenData);
    XLSX.utils.book_append_sheet(wb, ws1, 'Resumen');

    // Hoja 2: Detalle de Cirugías
    const detalleData = [
        ['DETALLE DE CIRUGÍAS - ' + mesNombre + ' ' + anio],
        [],
        ['Fecha', 'Cédula', 'Total']
    ];

    cirugiasMes.forEach(cirugia => {
        detalleData.push([
            cirugia.fecha || 'N/A',
            cirugia.cedula,
            `$${(cirugia.total || 0).toFixed(2)}`
        ]);
    });

    const ws2 = XLSX.utils.aoa_to_sheet(detalleData);
    XLSX.utils.book_append_sheet(wb, ws2, 'Detalle Cirugías');

    // Hoja 3: Insumos Utilizados
    const insumosData = [
        ['INSUMOS UTILIZADOS - ' + mesNombre + ' ' + anio],
        [],
        ['Código', 'Nombre', 'Categoría', 'Cantidad Total', 'Precio Unitario', 'Total']
    ];

    const insumosAgrupados = {};
    cirugiasMes.forEach(cirugia => {
        if (cirugia.items) {
            cirugia.items.forEach(item => {
                if (!insumosAgrupados[item.code]) {
                    insumosAgrupados[item.code] = {
                        code: item.code,
                        name: item.name,
                        categoria: item.categoria,
                        price: item.price,
                        quantity: 0
                    };
                }
                insumosAgrupados[item.code].quantity += item.quantity;
            });
        }
    });

    Object.values(insumosAgrupados).forEach(insumo => {
        insumosData.push([
            insumo.code,
            insumo.name,
            insumo.categoria || 'N/A',
            insumo.quantity,
            `$${insumo.price.toFixed(2)}`,
            `$${(insumo.price * insumo.quantity).toFixed(2)}`
        ]);
    });

    // Llenar la vista previa
    document.getElementById('preview-periodo').textContent = `${mesNombre} ${anio}`;
    document.getElementById('preview-fecha-gen').textContent = new Date().toLocaleDateString();
    document.getElementById('preview-total-cirugias').textContent = cirugiasMes.length;
    document.getElementById('preview-gasto-total').textContent = `$${gastoTotal.toFixed(2)}`;
    document.getElementById('preview-promedio').textContent = `$${(gastoTotal / cirugiasMes.length).toFixed(2)}`;

    // Llenar tabla de categorías
    const tbodyCategorias = document.getElementById('preview-tbody-categorias');
    tbodyCategorias.innerHTML = Object.keys(categorias).map(cat => {
        const data = categorias[cat];
        const porcentaje = (data.total / gastoTotal * 100).toFixed(1);
        return `
            <tr>
                <td style="padding: 0.75rem; border: 1px solid #dee2e6;"><strong>${cat}</strong></td>
                <td style="padding: 0.75rem; text-align: center; border: 1px solid #dee2e6;">${data.cantidad}</td>
                <td style="padding: 0.75rem; text-align: right; border: 1px solid #dee2e6; color: var(--success-color); font-weight: 600;">$${data.total.toFixed(2)}</td>
                <td style="padding: 0.75rem; text-align: right; border: 1px solid #dee2e6;">${porcentaje}%</td>
            </tr>
        `;
    }).join('');

    // Llenar tabla de cirugías
    const tbodyCirugias = document.getElementById('preview-tbody-cirugias');
    tbodyCirugias.innerHTML = cirugiasMes.map((cirugia, index) => `
        <tr style="background: ${index % 2 === 0 ? 'white' : '#f8f9fa'};">
            <td style="padding: 0.75rem; border: 1px solid #dee2e6;">${cirugia.fecha || 'N/A'}</td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6;">${cirugia.cedula}</td>
            <td style="padding: 0.75rem; text-align: right; border: 1px solid #dee2e6; font-weight: 600;">$${(cirugia.total || 0).toFixed(2)}</td>
        </tr>
    `).join('');

    // Llenar tabla de insumos
    const tbodyInsumos = document.getElementById('preview-tbody-insumos');
    tbodyInsumos.innerHTML = Object.values(insumosAgrupados).map((insumo, index) => `
        <tr style="background: ${index % 2 === 0 ? 'white' : '#f8f9fa'};">
            <td style="padding: 0.75rem; border: 1px solid #dee2e6;"><code>${insumo.code}</code></td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6;">${insumo.name}</td>
            <td style="padding: 0.75rem; text-align: center; border: 1px solid #dee2e6;"><strong>${insumo.quantity}</strong></td>
            <td style="padding: 0.75rem; text-align: right; border: 1px solid #dee2e6; font-weight: 600;">$${(insumo.price * insumo.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    // Navegar a la vista previa
    showPage('monthly-close-preview');
}

// Función para descargar el cierre actual desde la vista previa
function descargarCierreActual() {
    const mes = parseInt(sessionStorage.getItem('cierreMes'));
    const anio = parseInt(sessionStorage.getItem('cierreAnio'));
    exportarCierreMensualExcel(mes, anio);
}

// Exportar cierre mensual a Excel
function exportarCierreMensualExcel(mes, anio) {
    const mesesNombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesNombre = mesesNombres[mes - 1];

    // Obtener datos del mes
    const surgeryData = JSON.parse(localStorage.getItem('surgeryData') || '{}');
    let cirugiasMes = [];
    let gastoTotal = 0;

    Object.keys(surgeryData).forEach(cedula => {
        const surgery = surgeryData[cedula];
        if (surgery.fecha) {
            const [dia, mesStr, anioStr] = surgery.fecha.split('/');
            const mesCirugia = parseInt(mesStr);
            const anioCirugia = parseInt(anioStr);

            if (mesCirugia === mes && anioCirugia === anio) {
                cirugiasMes.push({
                    cedula,
                    ...surgery
                });
                gastoTotal += surgery.total || 0;
            }
        }
    });

    if (cirugiasMes.length === 0) {
        showNotification('⚠ No hay datos para exportar en este período', 'warning');
        return;
    }

    // Calcular desglose por categoría
    const categorias = {};
    cirugiasMes.forEach(cirugia => {
        if (cirugia.items) {
            cirugia.items.forEach(item => {
                const cat = item.categoria || 'Sin Categoría';
                if (!categorias[cat]) {
                    categorias[cat] = {
                        cantidad: 0,
                        total: 0
                    };
                }
                categorias[cat].cantidad += item.quantity;
                categorias[cat].total += item.price * item.quantity;
            });
        }
    });

    // Crear workbook
    const wb = XLSX.utils.book_new();

    // Hoja 1: Resumen
    const resumenData = [
        ['CIERRE MENSUAL - MEDISTOCK PRO'],
        ['Período:', `${mesNombre} ${anio}`],
        ['Fecha de Generación:', new Date().toLocaleDateString()],
        [],
        ['RESUMEN GENERAL'],
        ['Cirugías Realizadas:', cirugiasMes.length],
        ['Gasto Total:', `$${gastoTotal.toFixed(2)}`],
        ['Promedio por Cirugía:', `$${(gastoTotal / cirugiasMes.length).toFixed(2)}`],
        [],
        ['DESGLOSE POR CATEGORÍA'],
        ['Categoría', 'Cantidad', 'Total', '% del Total']
    ];

    Object.keys(categorias).forEach(cat => {
        const data = categorias[cat];
        const porcentaje = (data.total / gastoTotal * 100).toFixed(1);
        resumenData.push([cat, data.cantidad, `$${data.total.toFixed(2)}`, `${porcentaje}%`]);
    });

    const ws1 = XLSX.utils.aoa_to_sheet(resumenData);
    XLSX.utils.book_append_sheet(wb, ws1, 'Resumen');

    // Hoja 2: Detalle de Cirugías
    const detalleData = [
        ['DETALLE DE CIRUGÍAS - ' + mesNombre + ' ' + anio],
        [],
        ['Fecha', 'Cédula', 'Total']
    ];

    cirugiasMes.forEach(cirugia => {
        detalleData.push([
            cirugia.fecha || 'N/A',
            cirugia.cedula,
            `$${(cirugia.total || 0).toFixed(2)}`
        ]);
    });

    const ws2 = XLSX.utils.aoa_to_sheet(detalleData);
    XLSX.utils.book_append_sheet(wb, ws2, 'Detalle Cirugías');

    // Hoja 3: Insumos Utilizados
    const insumosData = [
        ['INSUMOS UTILIZADOS - ' + mesNombre + ' ' + anio],
        [],
        ['Código', 'Nombre', 'Categoría', 'Cantidad Total', 'Precio Unitario', 'Total']
    ];

    const insumosAgrupados = {};
    cirugiasMes.forEach(cirugia => {
        if (cirugia.items) {
            cirugia.items.forEach(item => {
                if (!insumosAgrupados[item.code]) {
                    insumosAgrupados[item.code] = {
                        code: item.code,
                        name: item.name,
                        categoria: item.categoria,
                        price: item.price,
                        quantity: 0
                    };
                }
                insumosAgrupados[item.code].quantity += item.quantity;
            });
        }
    });

    Object.values(insumosAgrupados).forEach(insumo => {
        insumosData.push([
            insumo.code,
            insumo.name,
            insumo.categoria || 'N/A',
            insumo.quantity,
            `$${insumo.price.toFixed(2)}`,
            `$${(insumo.price * insumo.quantity).toFixed(2)}`
        ]);
    });

    const ws3 = XLSX.utils.aoa_to_sheet(insumosData);
    XLSX.utils.book_append_sheet(wb, ws3, 'Insumos');

    // Descargar archivo
    const filename = `Cierre_Mensual_${mesNombre}_${anio}.xlsx`;
    XLSX.writeFile(wb, filename);

    showNotification(`✓ Cierre mensual exportado: ${filename}`, 'success');
}

// Exportar cierre mensual (desde la página de cierre mensual)
function exportarCierreMensual() {
    const mes = parseInt(document.getElementById('cierre-mes').value);
    const anio = parseInt(document.getElementById('cierre-anio').value);
    mostrarVistaPreviaCierreMensual(mes, anio);
}

/*=============== HISTORIAL DE CIERRES MENSUALES ===============*/

// Cargar historial de cierres
function cargarHistorialCierres() {
    const anio = parseInt(document.getElementById('history-anio').value);
    const estado = document.getElementById('history-estado').value;

    const surgeryData = JSON.parse(localStorage.getItem('surgeryData') || '{}');
    const mesesNombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // Agrupar cirugías por mes
    const datosPorMes = {};

    // Inicializar todos los meses
    for (let mes = 1; mes <= 12; mes++) {
        datosPorMes[mes] = {
            mes: mes,
            mesNombre: mesesNombres[mes - 1],
            anio: anio,
            cirugias: [],
            total: 0,
            count: 0
        };
    }

    // Agrupar cirugías
    Object.keys(surgeryData).forEach(cedula => {
        const surgery = surgeryData[cedula];
        if (surgery.fecha) {
            const [dia, mesStr, anioStr] = surgery.fecha.split('/');
            const mesCirugia = parseInt(mesStr);
            const anioCirugia = parseInt(anioStr);

            if (anioCirugia === anio) {
                datosPorMes[mesCirugia].cirugias.push({
                    cedula,
                    ...surgery
                });
                datosPorMes[mesCirugia].total += surgery.total || 0;
                datosPorMes[mesCirugia].count++;
            }
        }
    });

    // Filtrar según estado
    let mesesFiltrados = Object.values(datosPorMes);
    if (estado === 'con-datos') {
        mesesFiltrados = mesesFiltrados.filter(m => m.count > 0);
    } else if (estado === 'sin-datos') {
        mesesFiltrados = mesesFiltrados.filter(m => m.count === 0);
    }

    // Renderizar tabla
    const tbody = document.getElementById('tbody-historial');
    const totalSpan = document.getElementById('total-cierres');

    if (mesesFiltrados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-light);">
                    No se encontraron cierres con los filtros aplicados
                </td>
            </tr>
        `;
        totalSpan.textContent = '(0)';
    } else {
        tbody.innerHTML = mesesFiltrados.map(mes => {
            const promedio = mes.count > 0 ? mes.total / mes.count : 0;
            const estadoBadge = mes.count > 0 ?
                '<span style="background: #d1fae5; color: #065f46; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem;">✓ Disponible</span>' :
                '<span style="background: #fee2e2; color: #991b1b; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem;">Sin Datos</span>';

            return `
                <tr>
                    <td><strong>${mes.mesNombre}</strong></td>
                    <td>${mes.anio}</td>
                    <td>${mes.count}</td>
                    <td style="font-weight: 600; color: var(--success-color);">$${mes.total.toFixed(2)}</td>
                    <td>$${promedio.toFixed(2)}</td>
                    <td>${estadoBadge}</td>
                    <td>
                        ${mes.count > 0 ? `
                            <button class="btn btn-primary" onclick="descargarCierreMes(${mes.mes}, ${mes.anio})" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;">
                                <svg viewBox="0 0 24 24" fill="none" style="width: 16px; height: 16px; margin-right: 0.25rem;">
                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                Descargar
                            </button>
                            <button class="btn btn-secondary" onclick="verCierreMes(${mes.mes}, ${mes.anio})" style="padding: 0.25rem 0.75rem; font-size: 0.875rem; margin-left: 0.5rem;">
                                Ver
                            </button>
                        ` : '<span style="color: var(--text-light);">-</span>'}
                    </td>
                </tr>
            `;
        }).join('');

        totalSpan.textContent = `(${mesesFiltrados.length})`;
    }

    // Actualizar resumen anual
    actualizarResumenAnual(datosPorMes, anio);
}

// Actualizar resumen anual
function actualizarResumenAnual(datosPorMes, anio) {
    document.getElementById('resumen-anio').textContent = `(${anio})`;

    const meses = Object.values(datosPorMes);
    const totalCirugias = meses.reduce((sum, m) => sum + m.count, 0);
    const totalGastos = meses.reduce((sum, m) => sum + m.total, 0);
    const mesesConDatos = meses.filter(m => m.count > 0).length;
    const promedioMensual = mesesConDatos > 0 ? totalGastos / mesesConDatos : 0;

    // Encontrar mes con mayor gasto
    let mesMayorGasto = meses[0];
    meses.forEach(m => {
        if (m.total > mesMayorGasto.total) {
            mesMayorGasto = m;
        }
    });

    document.getElementById('total-cirugias-anio').textContent = totalCirugias;
    document.getElementById('total-gastos-anio').textContent = `$${totalGastos.toFixed(2)}`;
    document.getElementById('promedio-mensual').textContent = `$${promedioMensual.toFixed(2)}`;
    document.getElementById('mes-mayor-gasto').textContent = mesMayorGasto.count > 0 ?
        `${mesMayorGasto.mesNombre} ($${mesMayorGasto.total.toFixed(2)})` : '-';
}

// Descargar cierre de un mes específico
function descargarCierreMes(mes, anio) {
    // Descargar directamente el Excel
    exportarCierreMensualExcel(mes, anio);
}

// Ver detalle de un mes específico
function verCierreMes(mes, anio) {
    // Mostrar vista previa del cierre
    mostrarVistaPreviaCierreMensual(mes, anio);
}

// Cargar datos iniciales al abrir la página de reportes
document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en la página de reportes, cargar datos después de que se inicialicen
    setTimeout(() => {
        if (document.getElementById('tabla-cirugias')) {
            aplicarFiltros();
        }
    }, 200);
});
