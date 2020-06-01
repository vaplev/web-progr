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

Middleware - промежуточный слой обработчиков запросов, предназначенный для подготовки запроса к дальнейшей обработке, добавление или провекрка заголовков, проверка или установка cookie и так далее.

Для установки компонента middleware используется метод `use` экземпляра express. Компонен middleware представляет собой функциию принимающую на вход 3 аргумента:
- объект запроса (request);
- объект ответа (response);
- callback next() - в 99 % случаев вызов next в теле функции обязателен, так как именно этот вызов передает запрос дальше по конвееру обработки запроса. 

Сами же компоненты middleware и обработчики запросов организованы в соответсвии с паттерном "Chain of responsibility (цепочка ответственности)", вроде бы...

Компонент middleware может быть оформлен в виде отдельного модуля.
```javascript
const express = require('express');
const app = express();

app.use((req, res, next)=> {
  res.set(
    'X-HELLO-Andrew', 'Hello Andrew'
  );
  res.cookie('Authorized', 'true');
  next();
});

app.listen(3000);
```
Важно! Комонент middleware `bodyParser`, используется для обработки тела `post` запроса, при этом имее две конфигурации для обработки запроса иницииорованного отправкой формы браузером пример `app.use(bodyParser.urlencoded({ extended: false })`, и для обработки запроса содержащего в теле JSON, как правило запрос отправленный асинхронно, и/или инициированного программно. Пример `router.use(bodyParser.json())`. Самое интересное, что если эти два компонента middleware  разместить друг за другом, при отправки запросов, express будет ... недумевать, почему так не понятно.

### Маршрутизация 

Для того чтобы на одном порте разместить разные обрабочики, с разной логике, необходимо иметь механизм, который бы позволял идентифицировать запросы, для идентификации слушат маршруты. Маршрут представляет собой, собственно маршрут, и строку запроса, она не обязательна, но, тем не менне может быть, служит она для передачи дополнительных параметров, которые могут быть использованы при обработке запроса.

```javascript
const express = require('express');
const app = express();

// Обработчик Get запроса на условный адрес http://www.my-site.test
app.get('/', (req, res)=> {
    res.status(200).send(); // возвращаем пустой ответ.
})

// Обработчик Get запроса на условный адрес http://www.my-site.test/sum
// Если есть строка запроса
// Обработчик Get запроса на условный адрес 
// http://www.my-site.test/sum?valueA=10&valueB=20
// строка запроса начинается с ? параметры указывтся как paramName=value
// несколько параметров указывается через &
app.get('/sum', (req, res)=> {
    let valueA = 10;
    let valueB = 10;
    const query = req.query; // объекта строки параметров
    if (query.valueA) {
        valueA = +query.valueA
    }
    if (query.valueB) {
        valueB = +query.valueB
    }
    const reusult = {
        valueA: valueA,
        valueB: valueB,
        sum: valueA + valueB
    }
    res.status(200).send(result);
});

// Переменные параметры маршрута
// Get запрос на условный адрес http://www.my-site.test/sum/valueA/valueB
// http://www.my-site.test/sum/10/20
// Переменный параметр маршрута указывается как :paramName
// и отделяется слэшем /
app.get('/sum/:valueA/:valueB', (req, res)=>{
    let valueA = 10;
    let valueB = 10;
    const params = req.params
    if (params.valueA) {
        valueA = +params.valueA
    }
    if (prams.valueB) {
        valueB = +params.valueB
    }
    const reusult = {
        valueA: valueA,
        valueB: valueB,
        sum: valueA + valueB
    }
    res.status(200).send(result);
});

// POST запрос на условный адрес http://www.my-site.test/sum
app.post('/sum', (req, res) => {
    let valueA = 10;
    let valueB = 10;
    const body = req.body;
    if (body.valueA) {
        valueA = +params.valueA
    }
    if (body.valueB) {
        valueB = +params.valueB
    }
    const reusult = {
        valueA: valueA,
        valueB: valueB,
        sum: valueA + valueB
    }
    res.status(200).send(result);
});
app.listen(3000);
```

Не всегда удобно и разумно описывать все обработчики запросов в одном файле.
Разумнее выделить группы обрабочиков в отдельные модули.

```javascript
// содержимое файла handlers.js
const express = require('express');
const router = express.Router();

router.use(bodyParser.json())
router.get('/sum', (req, res)=> {
    let valueA = 10;
    let valueB = 10;

    const reusult = {
        valueA: valueA,
        valueB: valueB,
        sum: valueA + valueB
    }
    res.status(200).send(result);
});

module.exports = router;
// содержимое файла server.js 
const express = require('express');
const app = express();
const handlers = require('./handlers')

app.use(handlers);
// Или так
app.use('/calculator', handlers)
// тогда надо будет обращаться по http://www.my-site.test/calculator/sum
app.listen(3000);

```
### Отрисовка HTML на сервере

В предыдущих примерах в качестве результата возвращался `JSON`, но никто не запрещает нам генерировать целые html страницы.

```javascript
const express = require('express');
const app = express();

app.get('/sum', (req, res) => {
    let valueA = 10;
    let valueB = 10;
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div>
                Result is ${valueA + valueB}
            </div>
        </body>
        </html>
    `);
});

app.listen(3000);
```

Так можно, однако это долго больно и неприятно, для подобных целей используют так называемые движки представлений. Мы использовать движок [handlebars](https://handlebarsjs.com/). Для этого нужно установить пакеты `express-handlebars` и `hbs` а также необходима некоторая структура папок необходимо создать папки layouts, views, prartials. В этих папках будут файлы с расширением hbs, файлами представлений.

```javascript
const express = require('express');
const app = express();
const hbs = require('hbs');
const expressHbs = require("express-handlebars");

app.set('view engine', 'hbs'); // говорим express какой движок используется
app.set('views', path.join(__dirname, 'views')) // говорим где будут шаблоны

app.engine('hbs', expressHbs({ // конфигурируем сам движок
  layoutsDir: path.join(__dirname, '/views/layouts'), // указывааем папку с шаблонами страниц
  defaultLayout: 'layout', // шаблон используемый по умолчанию.
  extname: 'hbs' // расширение фалов с шаблонами
}));
app.listen(3000);
```

Что такое layout? Также его можно называть мастер-страницей. У нормального сайта всегда есть единый стиль который не меняется от страницы к странице, на каждой странице есть меню, шапка, подвал, и некоторая html-разметка соответсвующая теме страниы, например "О компании", "Контакты". Каддый раз писать всю страницу с нуля это, конечно можно, но это ад сопровождения, когда страниц 5, еще нормально, когда их 5000, это уже больно. По этой причине и руководствуюясь принципом Do not repeat yourself, все что повторяется от страницы в страницу выностися в отдельный файл.

Представления. Представление это ничто иное как набор html разметки соответствующий определенной странце и то чтои втавляется в layuot.

Частичные представления кусок разметки, который может повторяться несколько раз на одной странице, или просто объемный элемент разметки представляющий некоторую структурно и логически завершенную часть, например можно вынести в частичное представление шапку, подвал, карточку товара.

Вот пример файла layout
```html
<!DOCTYPE html>
<html>
<head>
    <title>{{title}}</title> <!-- переменная title -->
    <meta charset="utf-8" />
    <link href="/styles/hedgehog.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i&amp;display=swap&amp;subset=cyrillic" rel="stylesheet">
</head>
<body>
    {{>header}} <!-- подключение частичного представления header -->
    <div class="page-content">
    {{{body}}} <!--именно сюда будет вставляться разметка сгенерированная представлением-->
    </div>
    {{>footer}} <!-- подключение частичного представления header -->
    <script src="/hedgehog.bundle.js"></script>
</body>
<html>
```
Пример частичного пердставления, с параметром product
```html
<div class="product">
    <div class="name">{{product.name}}</div>
    <div class="price">{{product.price}}</div>
</div>
```

Пример представления products

```html
<div class="product-list">
    <!--Инициируем перебор массива products, элемент p -->
    {{#each products as | p |}}
        <!--Вызываем частичное представление product-item -->
        <!--Указываем, что product-item имеет параметр product-->
        <!--Значение параметра product  устанавливаем равным p-->
        {{>product-item product=p}}
    {{/each}}
</div>
```

Пример отрисовки представления.

```javascript
const express = require('express');
const app = express();
const hbs = require('hbs');
const expressHbs = require("express-handlebars");

app.set('view engine', 'hbs'); // говорим express какой движок используется
app.set('views', path.join(__dirname, 'views')) // говорим где будут шаблоны

app.engine('hbs', expressHbs({ // конфигурируем сам движок
  layoutsDir: path.join(__dirname, '/views/layouts'), // указывааем папку с шаблонами страниц
  defaultLayout: 'layout', // шаблон используемый по умолчанию.
  extname: 'hbs' // расширение фалов с шаблонами
}));

app.get('/products',(res, req)=> {
    const products = [
        { name: 'Apple', price: 10 },
        { name : 'Banana', price: 15 }
    ];
    // отрисовывет представление products
    res.status(200).render('products', { 
        title: 'Products list', // заголовок страниы и окна
        products: products // данные для отрисовки списка продуктов
    });
});
app.listen(3000);
```
