pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Obteniendo el código fuente desde el repositorio de GitHub...'
                checkout scm
            }
        }

        stage('Build Containers') {
            steps {
                echo 'Construyendo y levantando los contenedores con Docker Compose...'
                sh 'docker compose up --build -d'
            }
        }

        stage('Test & Connectivity') {
            steps {
                echo 'Ejecutando pruebas de verificación y comunicación de red...'
                // Verificamos que el contenedor de base de datos responda y esté operativo
                sh 'docker exec api-service pg_isready -U postgres || exit 1'
            }
        }
    }

    post {
        success {
            echo '¡El Pipeline se ejecutó exitosamente! Los contenedores están arriba y las pruebas pasaron.'
        }
        failure {
            echo '¡El Pipeline ha fallado! Revise la consola para identificar el error en la compilación o pruebas.'
        }
        always {
            echo 'Limpiando o finalizando la ejecución del ciclo de CI...'
        }
    }
}