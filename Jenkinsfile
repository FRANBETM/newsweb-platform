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
                echo 'Limpiando contenedores anteriores y levantando el stack...'
                // Detenemos y borramos cualquier contenedor previo para evitar conflictos de nombres
                sh 'docker compose down || true'
                // Construimos y levantamos de nuevo de forma limpia
                sh 'docker compose up --build -d'
            }
        }

        stage('Test & Connectivity') {
            steps {
                echo 'Ejecutando pruebas de verificación y comunicación de red...'
                // Esperamos unos segundos a que la base de datos inicie y validamos el estado
                sh 'sleep 5 && docker compose exec -T db pg_isready -U postgres'
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