pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = ''
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test --passWithNoTests'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running code quality checks...'
                bat 'npx eslint src'
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to test environment...'
                bat 'docker build -t my-react-app .'  // Use a batch file for Windows
                bat 'docker stop my-react-container || true'
                bat 'docker run my-react-container || true'
                bat 'docker run -d --name my-react-container -p 3000:3000 my-react-app'
            }
        }

        stage('Release to Production') {
            steps {
                echo 'Releasing to production...'
                    script {
                        bat "sudo netlify deploy --dir-./build --prod --site-${env.NETLIFY_SITE_ID}"
                    }// Use batch file or Git Bash
            }
        }
    }

    post {
        success {
            emailext subject: "Pipeline '${CurrentBuild.fullDisplayName}' Successful",
                      body: 'The build was successful. Congratulations!',
                       to: 'simranpreetkaur23015@gmail.com',
                      attachLog: true
        } 
        failure {
            emailtext subject: "Pipeline '${currentBuild.fullDisplayName}' Failed",
                       body: 'The build has failed. Please investigate.',
                        to: 'simranpreetkaur23105@gmail.com',
                      attachLog: true
        }
    }
}
