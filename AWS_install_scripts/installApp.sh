cd /home/ubuntu/student-poll/client
npm install
quasar build

cp /home/ubuntu/environment/.env /home/ubuntu/student-poll/server

cd /home/ubuntu/student-poll/server
npm install

systemctl stop studentPoll
systemctl start studentPoll