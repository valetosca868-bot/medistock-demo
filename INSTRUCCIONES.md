# MediStock Pro - Guía de Uso Completa

## 🎯 Funcionalidades Principales

### 1. **Agregar Nuevo Paciente**

#### Opción A: Desde Gestión de Pacientes
1. Click en el menú lateral → **"Gestión de Pacientes"**
2. Click en el botón **"Nuevo Paciente"** (esquina superior derecha)
3. Completar el formulario con:
   - Cédula (8 dígitos)
   - Nombre completo
   - Edad
   - Sexo
   - Teléfono
   - Email
   - Dirección
4. Click en **"Guardar Paciente"**

#### Opción B: Desde Atención al Paciente
1. Click en **"Atención al Paciente"** en el menú
2. Scroll down hasta la sección **"Registrar Nuevo Paciente"**
3. Completar todos los campos del formulario
4. Click en **"Guardar Cambios"**

---

### 2. **Agregar Insumos Durante la Cirugía**

#### Base de Datos de Insumos Disponibles:
El sistema tiene **MÁS DE 50 INSUMOS** pre-cargados organizados en 9 categorías:

- **Medicamentos** (10 items): Morfina, Propofol, Fentanilo, Midazolam, etc.
- **Anestésicos** (4 items): Lidocaína, Bupivacaína, Ropivacaína, Sevoflurano
- **Antibióticos** (5 items): Cefazolina, Gentamicina, Ciprofloxacino, etc.
- **Sueros y Soluciones** (4 items): Suero Fisiológico, Lactato Ringer, etc.
- **Insumos Quirúrgicos** (10 items): Bisturí, Pinzas, Tijeras, etc.
- **Material de Curación** (6 items): Gasas, Vendajes, Apósitos, etc.
- **Suturas** (5 items): Diferentes calibres y tipos
- **Prótesis** (4 items): Prótesis de cadera, placas, mallas, etc.
- **Catéteres** (4 items): Central, periférico, Foley, etc.

#### Cómo Agregar Insumos:

**IMPORTANTE**: Para usar esta función debes primero:
1. Ir a **"Atención al Paciente"**
2. Ingresar una cédula válida (ej: 12345678)
3. Completar la **"Lista de Seguridad del Paciente"**
4. Completar **"Antes de Iniciar Cirugía"**
5. Ahora estarás en **"Durante la Cirugía"**

**Una vez en "Durante la Cirugía":**

1. **Buscar por nombre**:
   - Escribe en el campo de búsqueda (ej: "morfina", "gasa", "sutura")
   - Aparecerá un menú desplegable con los resultados

2. **Ver todos los items**:
   - Click en el campo de búsqueda sin escribir nada
   - Se mostrarán TODOS los insumos organizados por categoría

3. **Seleccionar el item**:
   - Click en el insumo deseado
   - Se llenará automáticamente con el nombre y precio

4. **Ingresar cantidad**:
   - Especifica la cantidad a usar

5. **Click en "Añadir"**:
   - El item se agregará a la tabla
   - Se calculará el subtotal automáticamente

6. **Modificar o eliminar**:
   - Puedes cambiar la cantidad directamente en la tabla
   - O eliminar con el botón de basura

7. **Continuar** al finalizar:
   - Click en "Continuar" para ir a "Finalizada la Cirugía"

---

### 3. **Dashboard**
- Muestra estadísticas en tiempo real
- Gráficos de admisiones, servicios y finanzas
- Estado general del hospital

### 4. **Inventario**
- Gestión de medicamentos y suministros
- Filtros por categoría, tipo y estado
- Edición de items

### 5. **Proveedores**
- Gestión de proveedores
- Contactos y pedidos

### 6. **Finanzas**
- Control de ingresos y gastos
- Gráficos de flujo de caja
- Reporte mensual

### 7. **Gestión de Camas**
- Visualización de ocupación
- Estado de camas por sala

### 8. **Reportes**
- Generación de reportes mensuales
- Historial de cirugías
- Cierre mensual

---

## ❓ Preguntas Frecuentes

**P: ¿Por qué no puedo agregar insumos?**
R: Debes seguir el flujo completo desde "Atención al Paciente" → Lista de Seguridad → Pre-Cirugía → Durante Cirugía

**P: ¿Los datos se guardan?**
R: Sí, todos los datos se guardan automáticamente en el LocalStorage de tu navegador

**P: ¿Cómo reseteo los datos?**
R: Abre la consola del navegador (F12) y ejecuta: `localStorage.clear()`

**P: ¿Puedo usar mi propia cédula?**
R: Sí, puedes ingresar cualquier cédula de 8 dígitos

**P: ¿El botón "Nuevo Paciente" no funciona?**
R: Asegúrate de hacer click directamente en el botón. La función está completamente implementada.

---

## 🔧 Soporte Técnico

Si encuentras algún problema:
1. Abre la consola del navegador (F12)
2. Revisa si hay errores en rojo
3. Intenta recargar la página
4. Limpia el caché del navegador

---

## 📝 Notas

- Este es un demo con datos ficticios
- Los precios son referenciales
- El sistema funciona 100% offline
- Compatible con Chrome, Firefox, Safari y Edge

---

**Versión**: 2.0
**Última actualización**: Noviembre 2024
**Estado**: Completamente funcional con base de datos expandida
