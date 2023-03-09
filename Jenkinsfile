pipeline{
    agent any
    environment {
        USER_NAME = 'ibrahima.diop'
         imageName = "zepe-app-server"
         dockerImage = ''
         repo = "${JOB_NAME}"
         DOCKER_REGISTRY_USER= 'karimux'
         DOCKER_REGISTRY_USER_PASSWORD= 'Adama7812@%!'
         TOKEN_SONAR= '49b46dcd7429cb158d6c9ac968365ace9ab62ef9'
        }
    tools {
    nodejs "node"
    dockerTool 'DOCKER'
  }
  stages {
    stage('install') {
      steps {
          sh 'npm install'
      }
    }
       stage('Build') {
            steps {
                sh 'npm run build'
            }
            }
           
                    stage('Build Image'){
                          steps{
                            script {
                             sh "docker build -t ${DOCKER_REGISTRY_URL}/${env.imageName} ."
                            }
                          }
                        }
                    stage('Connect To Registry'){
                        steps{
                            sh "docker logout"
                            sh "docker login ${DOCKER_REGISTRY_URL} --username ${env.DOCKER_REGISTRY_USER} --password ${env.DOCKER_REGISTRY_USER_PASSWORD}"
                        }
                    }
                    stage ('Push Docker Image'){
                        steps{
                            script{
                      
                          sh "docker push ${DOCKER_REGISTRY_URL}/${env.imageName}"
                        }
                        }
                    }


                    stage ('Delete Tempory Image'){
                        steps{
                        sh "docker rmi ${DOCKER_REGISTRY_URL}/${env.imageName}"
                    }
                    }

                        }
                            		post {
   			 failure {
                mail to: ''+"${env.USER_NAME}"+'@atos.net,eric.djikydjazik@atos.net,jospin.diffouofoufouo@atos.net,mohammad-abdoul-aziz.ciss@atos.net,abdou-karim.diop@atos.net',
             		subject: "**Failed Pipeline**: ${currentBuild.fullDisplayName}",
             		body: "Something is wrong with ${env.BUILD_URL}"
    }
             success{
                mail to: ''+"${env.USER_NAME}"+'@atos.net,eric.djikydjazik@atos.net,jospin.diffouofoufouo@atos.net,mohammad-abdoul-aziz.ciss@atos.net,abdou-karim.diop@atos.net',
                 subject: "**Success Pipeline**:${currentBuild.fullDisplayName}",
           		    body: "Success of your build, here is the link of the build ${env.BUILD_URL}"
                        }
 }
              }
