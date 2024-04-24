#Начало работы с Alfa Search

Запуск проекта возможен, либо перемещением в директории и запуском проектов

### `cd ./server` -> `npm install` -> `npm start`
### `cd ./client` -> `npm install` -> `npm start`

Либо через запуск докера из корневого каталога

### `docker-compose up`

##Enpoints

Доступные эндпоинты можно проверить в документации Swagger

### `http://localhost:4221/api-docs`

##Доступны методы:

Поиск записей по ФИО, ИП, ИНН в базе данных:
### `/entity/?page={page}`

Поиск записей с сайта по ФИО, ИП, ИНН:
### `/entity/search/?page={page}`

Изменение записи по id с базы данных:
### `/entity/update/{id}`

##Frontend

Доступ к фронт части доступен по ссылке:

### `http://localhost:3000`