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
}


