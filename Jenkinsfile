pipeline{
     
    agent any
    stages{
         
        stage('Get surce from GIT'){
            steps{
               // Get some code from a GitHub repository...
               //This path must exists on jenkins server
               sh 'rm -rf /opt/cicd/app'
               sh 'git clone https://github.com/erdnando/coltrans-websocket-server.git /opt/cicd/app'
               echo 'Clon OK'
            }
         }
         
        stage('Build docker image'){
            steps{
                sh 'docker build -t erdnando/coltrans-websocket-server:1.0 /opt/cicd/app/'
                echo 'DockerBuild OK...'
            }
            
        }
        
         stage('Publish to DockerHub'){
            steps{
                 withDockerRegistry([ credentialsId: "github_erv", url: "" ]) {
                      sh 'docker push erdnando/coltrans-websocket-server:1.0'
                    }
               
                } 
            }  
    }
    
}
