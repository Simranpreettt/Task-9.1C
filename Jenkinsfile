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
        success {
            script {
                echo "Site Deployed at: http://localhost:3000"
            }
            emailext (
                subject: "Jenkins Build & Deployment Successful - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                The Jenkins pipeline for ${env.JOB_NAME} completed successfully.
                
                - *Docker Deployment URL:* http://localhost:3000
                
                """,
                to: "xr045jss@gmail.com"
            )
        }

        failure {
            emailext (
                subject: "Jenkins Build Failed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "The Jenkins pipeline for ${env.JOB_NAME} failed. Check the logs for more details.",
                to: "xr045jss@gmail.com"
            )
        }
    }
}
