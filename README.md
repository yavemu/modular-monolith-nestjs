# Introducción

### Arquitectura

El proyecto está estructurado bajo el patrón de **monolito modular**, lo que permite que los servicios principales estén desacoplados entre sí.

Esto facilita la escalabilidad y la futura migración a una arquitectura de microservicios independientes, permitiendo que cada módulo pueda evolucionar o desplegarse de manera autónoma cuando sea necesario.

### Ventajas y Desventajas de la Arquitectura Modular Monolítica vs. Arquitectura REST Convencional en NestJS

Al comparar la arquitectura modular monolítica con una arquitectura REST tradicional en NestJS, es importante considerar cómo cada enfoque impacta el desarrollo, mantenimiento y escalabilidad del proyecto.

#### Ventajas de la Arquitectura Modular Monolítica

- **Desacoplamiento de módulos:** Cada módulo (por ejemplo, `businesses` y `employees`) tiene su propia lógica, controladores y entidades, lo que facilita el mantenimiento y la evolución independiente de cada parte del sistema.
- **Escalabilidad futura:** Permite migrar módulos a microservicios de forma progresiva, ya que la comunicación entre módulos está desacoplada (por ejemplo, usando el directorio `client-http/` como BFF).
- **Reutilización de código:** El directorio `shared/` centraliza utilidades, DTOs e interfaces, evitando duplicidad y promoviendo buenas prácticas.
- **Organización clara:** La estructura modular facilita la incorporación de nuevos desarrolladores, ya que cada módulo tiene responsabilidades bien definidas.

**Ejemplo:**  
Si en el futuro se requiere que el módulo `employees` funcione como un microservicio independiente, solo será necesario extraerlo y adaptar la comunicación, ya que actualmente depende de interfaces desacopladas y no de llamadas directas a otros módulos.

#### Desventajas de la Arquitectura Modular Monolítica

- **Complejidad inicial:** La configuración y organización inicial puede ser más compleja que una API REST tradicional, ya que se deben definir contratos y mecanismos de comunicación entre módulos.
- **Sobrecarga para proyectos pequeños:** Si el proyecto no planea escalar o dividirse en microservicios, la modularidad puede resultar innecesaria y aumentar el esfuerzo de desarrollo.
- **Gestión de dependencias:** Es necesario mantener bien definidas las dependencias entre módulos para evitar acoplamientos accidentales.

#### Comparación con una Arquitectura REST Convencional

En una arquitectura REST tradicional en NestJS, todos los controladores, servicios y entidades suelen estar organizados en carpetas globales (`controllers/`, `services/`, `entities/`), lo que puede ser suficiente para proyectos pequeños o medianos.

**Ventajas de la arquitectura REST convencional:**

- **Simplicidad:** Menor curva de aprendizaje y configuración inicial.
- **Rapidez de desarrollo:** Ideal para prototipos o proyectos con pocos dominios.

**Desventajas:**

- **Acoplamiento:** Los servicios y controladores pueden depender fuertemente entre sí, dificultando la escalabilidad y el mantenimiento.
- **Dificultad para escalar:** Migrar a microservicios o reorganizar el código puede requerir refactorizaciones importantes.

**Ejemplo:**  
En una API REST convencional, si el controlador de empleados necesita información de empresas, probablemente importaría directamente los servicios de empresas, generando dependencias difíciles de romper en el futuro.

---

En resumen, la arquitectura modular monolítica implementada en este proyecto permite un desarrollo más organizado y preparado para el crecimiento, a costa de una mayor complejidad inicial. La elección entre ambos enfoques depende de los objetivos y el tamaño del proyecto.

### Estructura de Carpetas

La estructura general del proyecto es la siguiente:

```
modular-monolith-nestjs/
├── .env                        # Variables de entorno de todo el proyecto y de cada módulo
├── src/
│   ├── modules/                # Módulos principales desacoplados
│   │   ├── businesses/         # Módulo de negocios
│   │   │   ├── controllers/    # Controladores específicos del módulo
│   │   │   ├── decorators/     # Decoradores para documentación de la API
│   │   │   ├── services/       # Servicios y lógica de negocio
│   │   │   ├── dto/            # Definiciones de objetos de transferencia de datos
│   │   │   └── entities/       # Entidades del dominio del módulo
│   │   ├── employees/          # Módulo de empleados
│   │   │   ├── controllers/
│   │   │   ├── decorators/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   └── entities/
│   ├── shared/                 # Código y utilidades compartidas entre módulos
│   │   └── interfaces/         # Interfaces y tipos compartidos
│   │   └── dto/                # Definiciones de objetos de transferencia de datos
│   ├── config/                 # Archivos de configuración del proyecto y conexiones a bases de datos
│   ├── client-http/            # Encargada de actuar como BFF (Backend For Front), permitiendo comunicación
                                # desacoplada entre módulos, por ejemplo, consultar la empresa de un empleado o
                                # validar la existencia de una empresa por su ID
```

### Detalle de carpetas principales

- **modules/**: Contiene los módulos principales de la aplicación, cada uno con su propia estructura interna (controladores, servicios, entidades y DTOs), permitiendo un desarrollo desacoplado y organizado.
- **shared/**: Incluye recursos reutilizables como middlewares, utilidades, constantes e interfaces que pueden ser usados por cualquier módulo, promoviendo la reutilización y consistencia en el proyecto.
- **config/**: Contiene los archivos de configuración, como el archivo de variables de entorno y la configuración global de la aplicación.
- **client-http/**: Implementa el rol de BFF (Backend For Front), facilitando la comunicación desacoplada entre módulos. Por ejemplo, permite consultar la empresa asociada a un empleado o validar la existencia de una empresa mediante su ID.

## Instalación y Uso

Este proyecto fue desarrollado siguiendo la arquitectura de **monolito modular**, desacoplando la comunicación entre los "servicios principales" para facilitar, en el futuro, la migración a microservicios independientes.

### Pasos para clonar e instalar el proyecto

1. **Clonar el repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. **Instalar dependencias**

   Para instalar las dependencias, ejecuta el siguiente comando:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Copia el archivo de ejemplo de variables de entorno y edítalo según tus necesidades:

   ```bash
   cp .env.example .env
   ```

4. **Ejecutar el proyecto**

   ```bash
   npm run start:dev
   ```

5. **Revisar documentación de la API**

   ```bash
   http://localhost:3000/apidoc
   ```

---
