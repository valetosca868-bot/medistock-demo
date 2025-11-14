/*=============== GENERADOR DE DATOS FICTICIOS ===============*/

// Función principal para inicializar datos de demostración
function initializeDemoData() {
    console.log('🔄 Iniciando carga de datos de demostración...');

    // Configuración de cirugías con TODOS los 12 meses
    const surgeryConfigs = [
        // Diciembre 2024
        { fecha: '05/12/2024', paciente: 'María González', cedula: '12345678-0', proc: 'Apendicectomía', cat: 'General', anest: 'General', sitio: 'Abdomen', items: ['SUT001', 'ANT001', 'GAS001', 'INS001', 'MED001'] },
        { fecha: '18/12/2024', paciente: 'Carlos Rodríguez', cedula: '23456789-1', proc: 'Cirugía de Catarata', cat: 'Oftalmológica', anest: 'Local', sitio: 'Cabeza y Cuello', items: ['ANT003', 'GAS003', 'INS004'] },
        // Enero 2025
        { fecha: '15/01/2025', paciente: 'Ana Martínez', cedula: '34567890-2', proc: 'Apendicectomía', cat: 'General', anest: 'General', sitio: 'Abdomen', items: ['SUT001', 'ANT001', 'GAS001', 'INS001', 'MED001'] },
        { fecha: '18/01/2025', paciente: 'Roberto Silva', cedula: '45678901-3', proc: 'Bypass Coronario', cat: 'Cardiovascular', anest: 'General', sitio: 'Corazón', items: ['SUT002', 'ANT002', 'GAS001', 'INS002', 'MED002', 'CAT001'] },
        { fecha: '22/01/2025', paciente: 'Laura Fernández', cedula: '56789012-4', proc: 'Reemplazo de Cadera', cat: 'Ortopédica', anest: 'Regional', sitio: 'Extremidades Inferiores', items: ['SUT003', 'ANT001', 'GAS002', 'INS003', 'PRO001'] },
        { fecha: '25/01/2025', paciente: 'Diego Pérez', cedula: '67890123-5', proc: 'Colecistectomía', cat: 'General', anest: 'General', sitio: 'Abdomen', items: ['SUT001', 'ANT001', 'GAS001', 'INS001', 'MED003'] },
        // Febrero 2025
        { fecha: '05/02/2025', paciente: 'Sofía López', cedula: '78901234-6', proc: 'Herniorrafia Inguinal', cat: 'General', anest: 'Regional', sitio: 'Abdomen', items: ['SUT001', 'ANT001', 'GAS002', 'INS001', 'MED001'] },
        { fecha: '08/02/2025', paciente: 'Javier Sánchez', cedula: '89012345-7', proc: 'Cirugía de Columna', cat: 'Neurocirugía', anest: 'General', sitio: 'Columna', items: ['SUT002', 'ANT002', 'GAS001', 'INS002', 'MED002', 'PRO002'] },
        { fecha: '12/02/2025', paciente: 'Patricia Díaz', cedula: '90123456-8', proc: 'Mastectomía', cat: 'Oncológica', anest: 'General', sitio: 'Tórax', items: ['SUT003', 'ANT001', 'GAS001', 'INS003', 'MED001', 'MED003'] },
        { fecha: '16/02/2025', paciente: 'Fernando Castro', cedula: '11223344-9', proc: 'Artroplastia de Rodilla', cat: 'Ortopédica', anest: 'Regional', sitio: 'Extremidades Inferiores', items: ['SUT002', 'ANT002', 'GAS002', 'INS002', 'PRO001'] },
        // Marzo 2025
        { fecha: '05/03/2025', paciente: 'Gabriela Romero', cedula: '22334455-10', proc: 'Histerectomía', cat: 'Ginecológica', anest: 'General', sitio: 'Región Pélvica', items: ['SUT001', 'ANT001', 'GAS001', 'INS001', 'MED001'] },
        { fecha: '12/03/2025', paciente: 'Marcelo Torres', cedula: '33445566-11', proc: 'Cirugía de Mano', cat: 'Ortopédica', anest: 'Regional', sitio: 'Extremidades Superiores', items: ['SUT001', 'ANT001', 'GAS002', 'INS004'] },
        { fecha: '20/03/2025', paciente: 'Valentina Suárez', cedula: '44556677-12', proc: 'Craneotomía', cat: 'Neurocirugía', anest: 'General', sitio: 'Cerebro', items: ['SUT003', 'ANT002', 'GAS001', 'INS002', 'MED002', 'PRO002'] },
        // Abril 2025
        { fecha: '08/04/2025', paciente: 'Andrés Méndez', cedula: '55667788-13', proc: 'Cirugía de Catarata', cat: 'Oftalmológica', anest: 'Local', sitio: 'Cabeza y Cuello', items: ['ANT003', 'GAS003', 'INS004', 'MED001'] },
        { fecha: '22/04/2025', paciente: 'Carolina Vega', cedula: '66778899-14', proc: 'Colecistectomía', cat: 'General', anest: 'General', sitio: 'Abdomen', items: ['SUT001', 'ANT001', 'GAS001', 'INS001', 'MED003'] },
        // Mayo 2025
        { fecha: '10/05/2025', paciente: 'Gustavo Mora', cedula: '77889900-15', proc: 'Bypass Coronario', cat: 'Cardiovascular', anest: 'General', sitio: 'Corazón', items: ['SUT002', 'ANT002', 'GAS001', 'INS002', 'MED002', 'SUT001', 'CAT001'] },
        { fecha: '25/05/2025', paciente: 'Verónica Ortiz', cedula: '88990011-16', proc: 'Reemplazo de Cadera', cat: 'Ortopédica', anest: 'Regional', sitio: 'Extremidades Inferiores', items: ['SUT003', 'ANT001', 'GAS002', 'INS003', 'MED001', 'PRO001'] },
        // Junio 2025
        { fecha: '15/06/2025', paciente: 'Pablo Herrera', cedula: '99001122-17', proc: 'Mastectomía', cat: 'Oncológica', anest: 'General', sitio: 'Tórax', items: ['SUT003', 'ANT001', 'GAS001', 'INS003', 'MED001', 'MED003'] },
        { fecha: '28/06/2025', paciente: 'Lucía Núñez', cedula: '10111213-18', proc: 'Herniorrafia Inguinal', cat: 'General', anest: 'Regional', sitio: 'Abdomen', items: ['SUT001', 'ANT001', 'GAS002', 'INS001', 'MED001'] },
        // Julio 2025
        { fecha: '18/07/2025', paciente: 'Raúl Benítez', cedula: '20212223-19', proc: 'Artroplastia de Rodilla', cat: 'Ortopédica', anest: 'Regional', sitio: 'Extremidades Inferiores', items: ['SUT002', 'ANT002', 'GAS002', 'INS002', 'PRO001', 'MED002'] },
        { fecha: '28/07/2025', paciente: 'Martina Silva', cedula: '30313233-20', proc: 'Apendicectomía', cat: 'General', anest: 'General', sitio: 'Abdomen', items: ['SUT001', 'ANT001', 'GAS001', 'INS001', 'MED001', 'MED003'] },
        // Agosto 2025
        { fecha: '05/08/2025', paciente: 'Eduardo Ramos', cedula: '40414243-21', proc: 'Cirugía de Columna', cat: 'Neurocirugía', anest: 'General', sitio: 'Columna', items: ['SUT003', 'ANT002', 'GAS001', 'INS002', 'MED002', 'PRO002', 'CAT001'] },
        { fecha: '15/08/2025', paciente: 'Florencia Acosta', cedula: '50515253-22', proc: 'Histerectomía', cat: 'Ginecológica', anest: 'General', sitio: 'Región Pélvica', items: ['SUT001', 'ANT001', 'GAS001', 'INS001', 'MED001', 'MED003'] },
        { fecha: '22/08/2025', paciente: 'Ignacio Vargas', cedula: '60616263-23', proc: 'Bypass Coronario', cat: 'Cardiovascular', anest: 'General', sitio: 'Corazón', items: ['SUT002', 'ANT002', 'GAS001', 'INS002', 'MED002', 'CAT001', 'PRO001'] },
        // Septiembre 2025
        { fecha: '08/09/2025', paciente: 'Camila Ríos', cedula: '70717273-24', proc: 'Cirugía de Catarata', cat: 'Oftalmológica', anest: 'Local', sitio: 'Cabeza y Cuello', items: ['ANT003', 'GAS003', 'INS004', 'MED001'] },
        { fecha: '18/09/2025', paciente: 'Sebastián Cruz', cedula: '80818283-25', proc: 'Reemplazo de Cadera', cat: 'Ortopédica', anest: 'Regional', sitio: 'Extremidades Inferiores', items: ['SUT003', 'ANT001', 'GAS002', 'INS003', 'MED001', 'PRO001'] },
        { fecha: '25/09/2025', paciente: 'Daniela Flores', cedula: '90919293-26', proc: 'Mastectomía', cat: 'Oncológica', anest: 'General', sitio: 'Tórax', items: ['SUT003', 'ANT001', 'GAS001', 'INS003', 'MED001', 'MED003', 'CAT001'] },
        // Octubre 2025
        { fecha: '10/10/2025', paciente: 'Mateo Aguilar', cedula: '11121314-27', proc: 'Colecistectomía', cat: 'General', anest: 'General', sitio: 'Abdomen', items: ['SUT001', 'ANT001', 'GAS001', 'INS001', 'MED003', 'MED002'] },
        { fecha: '20/10/2025', paciente: 'María González', cedula: '12345678-28', proc: 'Craneotomía', cat: 'Neurocirugía', anest: 'General', sitio: 'Cerebro', items: ['SUT003', 'ANT002', 'GAS001', 'INS002', 'MED002', 'PRO002', 'CAT001'] },
        { fecha: '28/10/2025', paciente: 'Carlos Rodríguez', cedula: '23456789-29', proc: 'Cirugía de Mano', cat: 'Ortopédica', anest: 'Regional', sitio: 'Extremidades Superiores', items: ['SUT001', 'ANT001', 'GAS002', 'INS004', 'MED001'] },
        // Noviembre 2025
        { fecha: '12/11/2025', paciente: 'Ana Martínez', cedula: '34567890-30', proc: 'Herniorrafia Inguinal', cat: 'General', anest: 'Regional', sitio: 'Abdomen', items: ['SUT001', 'ANT001', 'GAS002', 'INS001', 'MED001'] },
        { fecha: '25/11/2025', paciente: 'Roberto Silva', cedula: '45678901-31', proc: 'Artroplastia de Rodilla', cat: 'Ortopédica', anest: 'Regional', sitio: 'Extremidades Inferiores', items: ['SUT002', 'ANT002', 'GAS002', 'INS002', 'PRO001', 'MED002'] }
    ];

    const patients = {};
    const safetyChecklistData = {};
    const preSurgeryData = {};
    const surgeryData = {};
    const postSurgeryData = {};
    const realProcedureData = {};

    // Crear datos para cada cirugía
    surgeryConfigs.forEach((config, index) => {
        const cedula = config.cedula;

        // Guardar paciente
        patients[cedula] = {
            cedula: cedula,
            nombre: config.paciente,
            edad: 45,
            genero: index % 2 === 0 ? 'Femenino' : 'Masculino',
            telefono: '099123456',
            email: 'paciente@email.com'
        };

        // Safety Checklist
        safetyChecklistData[cedula] = {
            datosBasicos: {
                nombrePaciente: config.paciente,
                edad: 45,
                cedula: cedula,
                sexo: index % 2 === 0 ? 'Femenino' : 'Masculino',
                sitioQuirurgico: config.sitio,
                procedimiento: config.proc,
                consentimientoFirmado: 'si'
            },
            verificaciones: {
                identidadConfirmada: true,
                sitioMarcado: true,
                anestesiaCompleta: true,
                pulsioximetro: true,
                alergiasConocidas: false,
                viaAerea: false,
                riesgoPerdidaSangre: false
            },
            equipo: {
                cirujanoPresente: true,
                anestesistaPresente: true,
                enfermeraPresente: true
            },
            fecha: config.fecha
        };

        // Pre-Surgery Data
        preSurgeryData[cedula] = {
            equipoQuirurgico: {
                cirujano: 'Dr. Juan Pérez',
                anestesiologo: 'Dr. Roberto Martínez',
                enfermera: 'Enf. Sofía Castro'
            },
            confirmaciones: {
                identidadConfirmada: 'si',
                procedimientoConfirmado: 'si',
                consentimientoFirmado: 'si',
                sitioMarcado: 'si',
                equipoCompleto: 'si'
            },
            verificaciones: {
                pulsioximetroFuncional: 'si',
                alergiasConocidas: 'no',
                viaAereaDificil: 'no',
                riesgoHemorragia: 'no',
                antibioticosAdmin: 'si'
            },
            eventos: {
                eventosAnticipar: 'Ninguno',
                equipoEsteril: 'si',
                imagenesEsenciales: 'si'
            },
            fecha: config.fecha
        };

        // Surgery Data - Insumos
        const items = config.items.map(code => {
            const item = surgeryItemsDB[code];
            const quantity = Math.floor(Math.random() * 3) + 1;
            return {
                code: code,
                name: item.name,
                price: item.price,
                quantity: quantity,
                categoria: item.categoria
            };
        });

        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        surgeryData[cedula] = {
            items: items,
            total: total,
            fecha: config.fecha
        };

        // Post-Surgery Data
        postSurgeryData[cedula] = {
            confirmaciones: {
                instrumentosCuentaCorrecta: 'si',
                gasasCuentaCorrecta: 'si',
                agujasCuentaCorrecta: 'si',
                muestraEtiquetada: 'si',
                problemasEquipo: 'no'
            },
            planRecuperacion: {
                complicaciones: 'no',
                instrucciones: 'Reposo relativo, analgésicos según indicación',
                proximoControl: config.fecha
            },
            fecha: config.fecha
        };

        // Real Procedure Data
        realProcedureData[cedula] = {
            paciente: {
                nombre: config.paciente,
                edad: 45,
                genero: index % 2 === 0 ? 'Femenino' : 'Masculino'
            },
            procedimiento: {
                nombre: config.proc,
                categoria: config.cat,
                tipoAnestesia: config.anest
            },
            fecha: config.fecha,
            equipoQuirurgico: {
                cirujano: 'Dr. Juan Pérez',
                anestesiologo: 'Dr. Roberto Martínez',
                enfermera: 'Enf. Sofía Castro'
            },
            clasificacion: 'Limpia',
            duracion: 120,
            complicaciones: 'no',
            notas: 'Procedimiento realizado sin complicaciones'
        };
    });

    // Guardar en localStorage
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('safetyChecklistData', JSON.stringify(safetyChecklistData));
    localStorage.setItem('preSurgeryData', JSON.stringify(preSurgeryData));
    localStorage.setItem('surgeryData', JSON.stringify(surgeryData));
    localStorage.setItem('postSurgeryData', JSON.stringify(postSurgeryData));
    localStorage.setItem('realProcedureData', JSON.stringify(realProcedureData));

    console.log('✓ Demo data initialized successfully!');
    console.log(`  - ${Object.keys(patients).length} patients created`);
    console.log(`  - ${Object.keys(surgeryData).length} surgeries created`);

    if (typeof showNotification === 'function') {
        showNotification(`✓ ${Object.keys(surgeryData).length} cirugías de demostración cargadas`, 'success');
    }
}

// Resetear datos
function resetDemoData() {
    if (confirm('¿Está seguro que desea resetear todos los datos de demostración?')) {
        localStorage.clear();
        sessionStorage.clear();
        initializeDemoData();
        showNotification('✓ Datos de demostración reseteados', 'success');
        location.reload();
    }
}

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    initializeDemoData();
    setTimeout(() => {
        if (typeof aplicarFiltros === 'function') {
            aplicarFiltros();
        }
    }, 200);
});
