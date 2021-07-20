# Django-and-React-With-Mongodb-Postgresql-MySql

<h3>Structure Of Databases</h3>
<br/>
<img src="dbstructure.png" alt="/"/>

to run the project follow the below steps

python manage.py makemigrations authenticate

python manage.py migrate authenticate --database=UsersDb

python manage.py makemigrations products 

python manage.py migrate –database=ProductsDb

python manage.py makemigrations productsapp

python manage.py migrate –database=ProductsDb

python manage.py migrate –database=ProductsCatalog

python manage.py migrate authtoken --database=UsersDb

python manage.py runsslserver

open another terminal and execute following 

npm start

