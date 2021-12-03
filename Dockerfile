FROM node:14
#https://itnext.io/building-docker-images-from-private-git-repositories-using-ssh-login-433edf5a18f2
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
RUN git clone https://github.com/erdnando/coltrans-websocket-server.git /usr/src/app

WORKDIR /usr/src/app
RUN npm install

#docker rmi image erdnando/coltrans-websocket-server
#build
#docker build -t erdnando/coltrans-websocket-server:1.0 .
#local test
#docker run -itd -p 9001:8080 --name coltrans-websocket-server erdnando/coltrans-websocket-server:1.0
#push
#docker push erdnando/coltrans-websocket-server:1.0


EXPOSE 8080

#CMD [ "node", "index.js" ]
#https://blog.jayway.com/2015/04/13/600k-concurrent-websocket-connections-on-aws-using-node-js/
CMD [ "node","index.js","--nouse-idle-notification ","--expose-gc","--max-new-space-size=2048","--max-old-space-size=8192" ]