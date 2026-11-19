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
                    docker rm -f api-service newsweb_frontend 2>/dev/null || true
                    docker compose up --build -d
                '''
            }
        }

        stage('Test & Connectivity') {
            steps {
                echo 'Verificando servicios en la red app-network y comunicación por nombre de servicio...'
                sh '''
                    sleep 8
                    docker compose ps
                    docker compose exec -T web-app getent hosts api-service
                    docker compose exec -T api-service pg_isready -U "${DB_USER:-postgres}" -d news_db -h localhost
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