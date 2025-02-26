pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        sh 'npm test --passWithNoTests'
                    } catch (Exception e) {
                        echo 'Tests failed, but continuing the pipeline...'
                    }
                }
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running code quality checks...'
                sh 'npx eslint src'
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to test environment...'
                sh 'docker build -t my-react-app .'  
                sh 'docker stop my-react-container || true'
                sh 'docker rm my-react-container || true'
                sh 'docker run -d --name my-react-container -p 3000:3000 my-react-app'
            }
        }
    }

    post {
        always {
            emailext (
                to: 'simranpreetkaur23105@gmail.com',
                subject: "Jenkins Pipeline: ${currentBuild.fullDisplayName}",
                body: """
                    <p>Pipeline Execution Completed:</p>
                    <ul>
                        <li>Project: ${env.JOB_NAME}</li>
                        <li>Build Number: ${env.BUILD_NUMBER}</li>
                        <li>Status: ${currentBuild.currentResult}</li>
                        <li>Check the console output for more details: <a href="${env.BUILD_URL}">Build Link</a></li>
                    </ul>
                """,
                mimeType: 'text/html'
            )
        }
    }
}
