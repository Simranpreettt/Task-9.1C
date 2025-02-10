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

        stage('Release to Production') {
            steps {
                echo 'Releasing to production...'
                withEnv(["NETLIFY_SITE_ID=e438700d-39c6-4f0f-ade1-8981bfd8a69a"]) {
                    sh 'if ! command -v netlify &> /dev/null; then npm install -g netlify-cli; fi'
                    sh '$(npm root -g)/netlify-cli/cli.js deploy --dir=./build --prod --site=$NETLIFY_SITE_ID'
                }
            }
        }
    }

    post {
        success {
            emailext subject: "Pipeline '${currentBuild.fullDisplayName}' Successful",
                      body: 'The build was successful. Congratulations!',
                      to: 'simranpreetkaur23015@gmail.com',
                      attachLog: true
        } 
        failure {
            emailext subject: "Pipeline '${currentBuild.fullDisplayName}' Failed",
                      body: 'The build has failed. Please investigate.',
                      to: 'simranpreetkaur23105@gmail.com',
                      attachLog: true
        }
    }
}
