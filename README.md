The app uses postgres as the database also usinf sequelize ORM for querying it.

The sample env is pushed to git

We can run the app by:

git clone https://github.com/manvithak/images_test_app.git

node version 12.20.0
npm install node app.js

#Steps to configure db
sudo -u postgres -i
psql
create database images_db;
create user master with encrypted password 'Yutreisxoui';
grant all privileges on database images_db to master;



The sql queries to create table is added to postgres-queries.sql


#Curl commanda to verify api's

curl -X POST 'http://localhost:8080/api/image' -F 'image=@/home/manvitha/Desktop/test-img.png'
curl -X GET 'http://localhost:8080/api/image'
curl -X GET 'http://localhost:8080/api/image/dcd19149-ee84-42a2-a2fb-f2d44d5941b7'
curl -X GET 'http://localhost:8080/api/image/dcd19149-ee84-42a2-a2fb-f2d44d5941b7/300'
curl -X GET 'http://localhost:8080/api/image/dcd19149-ee84-42a2-a2fb-f2d44d5941b7/600'
