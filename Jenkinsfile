pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel_token')
    }

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Skipping tests - no test script found'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                  bat '''
                  npm config set cache "%WORKSPACE%\\.npm-cache"
                  npm config set prefix "%WORKSPACE%\\.npm-global"
                  set PATH=%WORKSPACE%\\.npm-global;%PATH%
                  npx vercel --prod --yes --token=%VERCEL_TOKEN%
                  '''
            }
        }
    }
}