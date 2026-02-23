# Pharmacy Management System

Una solución de escritorio pensada para agilizar la gestión de clientes y recetas médicas en farmacias, optimizando tiempo y reduciendo errores en el proceso de envío digital.

## Capturas de Pantalla

 **Gestión de Clientes**<br><img width="220" src="https://github.com/user-attachments/assets/fa9213d6-f771-4164-9a95-045335b2a9f1" /><br>*Crear, editar o eliminar clientes* 
 
 **Pantalla de Recetas**<br><img width="220" src="https://github.com/user-attachments/assets/390f1704-ca9b-44ae-8fe5-397eda4f3ea2" /><br>*Formateo, envío y descarga de recetas* 


## El Problema y la Solución

### **El Problema** 
Los empleados de farmacia pierden tiempo valioso copiando y formateando manualmente recetas desde sitios oficiales. Este proceso manual suele derivar en:
* Texto desordenado y poco legible.
* Errores humanos en la transcripción.
* Dificultad para comunicar la información de forma clara al cliente.

### **La Solución**
Una aplicación robusta que **automatiza el formateo de datos**. Permite procesar, copiar, enviar por WhatsApp o exportar recetas a formatos profesionales en segundos, garantizando eficiencia y una imagen profesional hacia el paciente.

## Características Principales

* **Smart Parsing de Recetas:** Transforma texto desestructurado en listas de medicamentos claras y organizadas. Para probar la app, podés usar los siguientes ejemplos de medicamentos: https://docs.google.com/document/d/1XMJD8Xfrp0JzvCgjPoPCuKDcCXuNsyiF/edit?usp=sharing&ouid=116559232899379341718&rtpof=true&sd=true 
* **Gestión Integral de Clientes (CRUD):** Control total de registros con búsqueda avanzada por nombre, número de afiliado o responsable.
* **Integración de Navegador:** Automatización que abre sitios externos y precarga datos en el portapapeles para búsquedas instantáneas.
* **Generación de Documentos:** Exportación con un clic a formatos **PDF** y **DOCX**, listos para impresión.
* **Diseño Multi-tasking:** Ventana con opción "siempre visible" y layout optimizado para trabajar junto a otras herramientas.
* **Native Dark Mode:** Interfaz moderna pensada para reducir la fatiga visual durante jornadas extensas.

## Stack Tecnológico & Arquitectura

Para este proyecto, se priorizó la **robustez** y la **escalabilidad**:

| Componente | Tecnología |
| :--- | :--- |
| **Core** | [Electron](https://www.electronjs.org/) |
| **Frontend** | [React](https://react.org/) + [TypeScript](https://www.typescriptlang.org/) |
| **Base de Datos** | [SQLite](https://sqlite.org/) |

### **Arquitectura en Capas**
La aplicación sigue un patrón de diseño que separa responsabilidades para facilitar el mantenimiento:
1. **Controllers:** Manejo de eventos y comunicación IPC.
2. **Services:** Lógica de negocio pura y reusable.
3. **Repositories:** Abstracción del acceso a datos.

> La arquitectura está diseñada para que la migración de una base de datos local (SQLite) a una API REST en la nube requiera cambios mínimos en el código.

## Instalación y Uso
Clona el repositorio: git clone https://github.com/nicoard12/Pharmacy-Management-System.git

Instala las dependencias: npm install

Inicia la aplicación: npm run dev

## Descargas
¿Querés probar la aplicación sin configurar el entorno de desarrollo? 

> [!IMPORTANT]
> **[Descargar última versión para Windows (v1.0.0)](https://github.com/nicoard12/Pharmacy-Management-System/releases)**
