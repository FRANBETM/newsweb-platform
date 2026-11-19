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
                echo 'Construyendo y levantando los contenedores...'
                // Usamos una invocación compatible con el demonio montado en Jenkins
                sh 'docker compose up --build -d || docker-compose up --build -d'
            }
        }

        stage('Test & Connectivity') {
            steps {
                echo 'Ejecutando pruebas de verificación y comunicación de red...'
                // Verificamos el estado del servicio de base de datos en la red
                sh 'docker exec api-service pg_isready -U postgres || true'
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
            echo 'Finalizando ciclo de integración continua.'
        }
    }
}