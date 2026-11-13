# NewsWeb Platform 

**Institución:** Politécnico Grancolombiano  
**Módulo:** Énfasis Profesional I (Integración Continua)  
**Autor:** Francisco Javier Betancur Moreno  
**Tutor:** John Olarte Ramos  
**Repositorio Oficial:** [https://github.com/FRANBETM/newsweb-platform.git](https://github.com/FRANBETM/newsweb-platform.git)

---

## 📋 Descripción del Proyecto

**NewsWeb Platform** es una plataforma web orientada a la gestión y visualización de noticias, diseñada bajo un enfoque de arquitectura de microservicios y contenerización moderna. Este proyecto implementa las prácticas de Integración Continua (CI), despliegue contenerizado mediante Docker, orquestación con Docker Compose, aislamiento de red mediante redes privadas virtuales (*bridge*) y automatización de pruebas a través de pipelines en GitHub Actions.

---

## 🛠️ Tecnologías y Versiones Utilizadas

El entorno se encuentra estandarizado mediante el uso de versiones fijas para garantizar la reproducibilidad y evitar conflictos de compatibilidad:

* **Frontend:** Angular CLI (Compilado mediante un contenedor multi-etapa con Node.js `24.15.0-alpine`).
* **Servidor Web / Distribución:** Nginx (`1.25.3-alpine`).
* **Base de Datos / Backend:** PostgreSQL (`15.5-alpine`).
* **Orquestación:** Docker Compose (v5 / especificación moderna).
* **Control de Versiones y CI:** Git & GitHub Actions.

---

## 🏗️ Arquitectura de la Solución

El sistema se compone de dos contenedores principales orquestados dentro de una red privada virtual tipo *bridge* (`app-network`):

1. **`newsweb_frontend`**: Contenedor web basado en Nginx que expone la aplicación Angular hacia el host exterior a través del puerto `4200` (mapeado al puerto `80` interno).
2. **`api-service`**: Contenedor de base de datos PostgreSQL que almacena la información de manera persistente utilizando un volumen dedicado (`pgdata`), accesible de forma segura por los servicios autorizados dentro de la red interna mediante su nombre de host (`api-service:5432`).

---

## 🚀 Guía de Inicio Rápido (Despliegue Local)

Para clonar, configurar y poner en marcha el proyecto en tu máquina local, sigue rigurosamente los siguientes pasos:

### 1. Prerrequisitos

Asegúrate de tener instalado en tu sistema operativo:

* [Git](https://git-scm.com/) instalado y configurado.
* [Docker Desktop](https://www.docker.com/) actualizado (con soporte para Docker Compose).

### 2. Clonar el repositorio

Abre tu terminal en la ruta de preferencia y ejecuta:

```bash
git clone https://github.com/FRANBETM/newsweb-platform.git
cd newsweb-platform
```

### 3. Configurar las variables de entorno

El proyecto utiliza un archivo de configuración segregado por seguridad. Duplica la plantilla provista para crear tu archivo `.env` local:

```bash
cp .env.example .env
```

*(Puedes verificar o modificar las credenciales y parámetros de la base de datos dentro del archivo `.env` generado según tus necesidades locales).*

### 4. Construir y levantar los contenedores

Ejecuta el comando de Docker Compose para compilar la imagen de la aplicación web y desplegar ambos servicios en segundo plano:

```bash
docker compose up --build -d
```

### 5. Verificar el estado del despliegue

Comprueba que los contenedores se encuentren activos y operando correctamente (`Up`):

```bash
docker ps
```

### 6. Acceso a la aplicación

Una vez iniciados los servicios, abre tu navegador web preferido e ingresa a la siguiente URL:
👉 **`http://localhost:4200`**

---

## 🧪 Verificación de Comunicación entre Contenedores

Para validar que la red privada y la resolución por nombre de servicio operan correctamente, puedes acceder de forma interactiva al contenedor frontend y realizar una prueba de conectividad hacia la base de datos:

```bash
# 1. Ingresar de forma interactiva al contenedor frontend
docker exec -it newsweb_frontend sh

# 2. Probar la conectividad por nombre de servicio al puerto de PostgreSQL
nc -zv api-service 5432

# 3. Salir del contenedor
exit
```

---

## 🔄 Integración Continua (CI)

El repositorio cuenta con un pipeline automatizado configurado en **GitHub Actions** (`.github/workflows/ci.yml`). Cada vez que se realiza un `git push` hacia la rama principal, el servidor remoto ejecuta de forma automatizada la validación de sintaxis, la construcción de las imágenes de Docker y las pruebas de integración.
