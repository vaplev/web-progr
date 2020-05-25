# Java Script (back-end)

## Протокол HTTP

TL;DR Поскольку автору лень в очередной раз переписывать интернет, нужно почитать [тут](https://developer.mozilla.org/ru/docs/Web/HTTP/Overview), [там](https://ru.wikipedia.org/wiki/HTTP) и [здесь](https://habr.com/ru/post/215117/)

## NodeJS

[NodeJS](https://nodejs.org/ru/about/) среда выполнения кода **javascript**, спроектирован для построения масштабируемых сетевых приложений. Для запуска кода необходимо вылолнить команду `node` и указать путь к выполняемому файлу.
```powershell
node ./server/server.js 
```
Приведенная инструкция - копия команды `dev` описанная в `package.json` данного проекта.

С точки зрения использования **JavaScript** отличия на серверной стороне клиента минимальны. Ключевое отличие это использование модулей, на сервере используются модули **AMD**.

```javascript
// файл расположенный по условному пути /modules/configs/index.js

let configs = {
    enableSearch: true,
    edit: false,
    allowedRoles: ['User', 'Supervizor']
}

module.exports = configs; // Этой строчкой и создаем модуль.



// файл app.js расположенный в корне, на одном уровне с папкой modules

// импортируем модули
// если экспорт производится в файле index.js файл можно не указывать. 
//const settings = require('./modules/configs')
// но никто не запрещает делать так, расширение "js" можно не указывать. 
const settings = require('./modules/configs/index') 
const moment = require('moment') // подгружаем moment.js из папки node_modules


function createApp(configs) {
    console.log('some configs!')

}
createApp(settings);

module.exports = createApp; // можно экспортировать и функции
```
## Express

[Express](https://expressjs.com/) Это минималистичный web-фреймворк для создания web-api и web-приложений. Технически можно использовать модуль `http` nodejs, собственно фреймворк есть оболочка, адаптер над модулем `http`. Express это не единственный фреймворк на базе nodejs, более того сам Express является основой для других фреймворков. Главная мысль - есть выбор, и в зависимости от задачи можно подобрать то, что лучше всего подходит. 

### Конфигурация сервера

В текущем проекте есть файл `server\server.js` (в зависимости от контекста проекта файл с серверным кодом может называться `index.js`, `main.js` `app.js`). Этот файл запускается при выполнение команыды `npm run dev`, собственно он является входной точкой приложения. Ну а чтобы файл c JS стал веб сервером нужно сделать следующее.

```javascript
const express = require('express');
const app = express();


app.listen(3000) // порт который будет слушать запущенный процесс.
```

В таком виде сервер только место занимет, для того чтобы заставить его делать что-то полезное надо добавить middleware и маршруты.
### Middleware
### Маршрутизация 
### Простая обработка запросов
### Отрисовка HTML на сервере

