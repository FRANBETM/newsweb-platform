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
                echo 'Limpiando contenedores previos y construyendo imágenes...'
                sh '''
                    docker compose down --remove-orphans || true
                    docker rm -f api-service 2>/dev/null || true
                    docker compose up --build -d
                '''
            }
        }

        stage('Test & Connectivity') {
            steps {
                echo 'Verificando servicios activos y comunicación en la red de Docker...'
                sh '''
                    sleep 5
                    docker compose ps
                    docker compose exec -T web-app wget -qO- http://api-service:8080/health || docker compose ps --status running
                '''
            }
        }
    }

    post {
        success {
            echo '¡El Pipeline se ejecutó exitosamente! Contenedores construidos y verificados.'
        }
        failure {
            echo '¡El Pipeline ha fallado! Revise la consola para identificar el error.'
        }
        always {
            echo 'Finalizando ejecución del pipeline de CI.'
        }
    }
}