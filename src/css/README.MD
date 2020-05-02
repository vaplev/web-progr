# Основы CSS

CSS (Cascade Style Sheets) - каскадные таблицы стилей используются для визуального форматирования разметки. Элементарной единицей CSS является селесктор - элемент или признак элемента HTML разметки к которому нужно применить некоторый набор свойств. В чистом виде селекторы применяются редко, обычно они объединяются в правило. Правило - некоторая последовательность селекторов.

Общий синтаксис CSS выглядит примерно так:
```css
/* Правило состоящее из одного селектора */
selector-name {
    property1: value1;
    property2: value2;
}

/* Правило из нескольких селекторов*/
selector-name selector-another-name {
    property1: value1;
    property2: value2;
}

/* Один набор свойств для разных правил*/
selector-name,
selector-another-name,
selector-name selector-another-name {
    property1: value1;
    property2: value2;
}
```

CSS может применяться как стили объявленные в теле документа или как ссылка на ресурс. 

```html
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Window title</>
        <link rel="stylesheet" href="path-to.css"> <!-- link to resource-->
        <link rel="icon" href="favicon.icon">
        <script type="text/javascript"></script>
        <script src="path-to.js" type="text/javascript"></script>
        <style type="text/css">
            <!-- document body style -->
            selector {
                property1: value1,
                property2: value2,
            },
        </style>
    </head>
    <body>
    </body>
</html>
```
Каждый из способов применения стилей имеет свои преимущества и недостатки. 
Стили объявленные как ссылка на ресурс кешируются браузером при первой загрузке страницы, при последующем визите страницы стиль загружаться не будет и будет применен сразу. С другой стороны загрузка стилей происходит _асинхронно_ т. е. в ходе разбора HTML браузером, браузер увидев ссылку условно даст команду _начать загрузку стилей_, и применить их по окончании загрузки. В случае, когда файл с css достаточно объемный или соединение с сетью имеет низкую скорость, могут случиться ситуация когда пользователь сначала  увидит **"голую"** разметку, а когда загрузится CSS страничка резко преобразитья - что не очень приятно.

Стили объявленные как часть документа обрабатываются браузером как и весь остальной HTML проблема опичанная выше при таком подходе произойти не может, однако эти стили загружаются каждый раз и читаются каждый раз при перезагрузке страницы, что технически при низкой скорости соединения и большом объеме HTML приведет к тому что страничка может долго отрисовываться браузером, и пользователь дого будет наблюдать пустую страницу.

В заваисимости от архитектуры приложения каждый из этих подходов может быть применимы более или менее, однако в ходе обучения будем подключать css **исключительно как ссылку на ресурс** сейчас это наиболее частая практика, а стили объявленные в теле документа используются для _затыкания узких мест_

> **Важно** каждый браузер по умолчанию имеет свои встроенные стили стили. При верстке страницы крайне рекомендуется явно устанавливать все стили. Явно и не рассчитывать на авось, ну и проверять верстку в несколькольких браузерах.

> **Важно не меньше** каждый браузер по- разному поддерживает те или иные возможности CSS для оценки возможности применения тех или иных возможностей CSS рекомендуется проверить их поддержку в [Can I use](https://caniuse.com/). Про [webref](https://webref.ru/)

## Селекторы

Для лучшего понимания селекторов рекомендую ознакомиться со статьей [30 css селекторов которые вы должны запомнить](https://code.tutsplus.com/ru/tutorials/the-30-css-selectors-you-must-memorize--net-16048).

**Родительский элемент** - элемент в нутри которого находятся другие элементы.

**Дочерний элемент** - элемент находящийся внутри элемента, для такого элемента родительстким элементом всякий элемнт котрый находится выше в иерархии HTML разметки.

**Соседний злемент** - элемент находящийся на одном уровне иерархии 
```html
<!DOCTYPE html>
<html lang="ru"> <!-- Элемент родительский для всех -->
    <head> <!-- Элемент дочерний для html -->
        <meta charset="UTF-8"> <!-- Элемент дочерний для html и head -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <title>Window title</>  <!-- Элемент соседний с link -->
        <link rel="stylesheet" href="path-to.css">
        <link rel="icon" href="favicon.icon">
        <script type="text/javascript"></script>
        <script src="path-to.js" type="text/javascript"></script>

    </head>
    <body>
    </body>
</html>
```
Наиболее частоиспользуемыми селекторами являются:

- **идентификатор** - применяется к элементу помеченному атрибутом `id`, идентификатор должен быть уникален в пределах одной страницы, если на странице будет несколько элементов с одинаковым идентификатором, HTML и браузер промолчат, это будут ваши проблемы но вас предупредили;
```html
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Window title</>
        <link rel="stylesheet" href="path-to.css"> <!-- link to resource-->
        <link rel="icon" href="favicon.icon">
        <script type="text/javascript"></script>
        <script src="path-to.js" type="text/javascript"></script>
        <style type="text/css">
            <!-- этот стиль -->
            #root {
                background: #cecece;
            }
        </style>
    </head>
    <body>
        <!-- будет применен к этому элементу -->
        <div id="root"></div>
    </body>
</html>
```
- **тэг** - применяется к определенному теку в пределах всего документа;

```html
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Window title</>
        <link rel="stylesheet" href="path-to.css"> <!-- link to resource-->
        <link rel="icon" href="favicon.icon">
        <script type="text/javascript"></script>
        <script src="path-to.js" type="text/javascript"></script>
        <style type="text/css">
            <!-- этот стиль будет применен только к тэгу html-->
            html {
                font-family: 'Open Sans';
            }
        </style>
    </head>
    <body>
        <!-- будет применен к этому элементу -->
        <div id="root"></div>
    </body>
</html>
```
- **класс** - наше все применяется ко всем элементам помеченным атрибутом `class`, с указанным значением. атрибут класс может содержать условно бесконечное множество значений. Можно применять правило к элементу отмеченному несколькими значениями.
```html
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Window title</>
        <link rel="stylesheet" href="path-to.css"> <!-- link to resource-->
        <link rel="icon" href="favicon.icon">
        <script type="text/javascript"></script>
        <script src="path-to.js" type="text/javascript"></script>
        <style type="text/css">
            <!-- Это правило применится ко всем элементам с классом text -->
            .text {
                font-size: 14px;
                text-transform: uppercase;
            }
            <!-- Это правило применится ко всем элементам с классом block -->
            .block {
                padding: 10px;
                color: red;
            }
            <!-- Это правило применится ко всем элементам с классом block и text одновременно -->
            .text.block {
                font-size: 12px;
                background: green;
            }
        </style>
    </head>
    <body>
        <div id="root">
            <!--будет применено правило .text -->
            <p class="text">
                Text
            </p>
            <!--будет применено правило .block -->
            <div class="block">
                Text
            </div>
            <!--будет применено правило .text -->
            <div class="text">
                Text
            </div>
            <!--будет применено правило .text .block .text.block -->
            <div class="block text">
                Text
            </div>
        </div>
    </body>
</html>
```
- **просто добавь контекст** - сочетания селекторов, позволяют ограничивать область применения тех или иных селекторов.
```html
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Window title</>
        <link rel="stylesheet" href="path-to.css"> <!-- link to resource-->
        <link rel="icon" href="favicon.icon">
        <script type="text/javascript"></script>
        <script src="path-to.js" type="text/javascript"></script>
        <style type="text/css">
            <!-- Это правило применится ко всем элементам с классом text, находящихся внутри элемента помеченного классом root -->
            .root .text {
                font-size: 14px;
                text-transform: uppercase;
            }
            <!-- Это правило применится ко всем элементам с классом block -->
            .block {
                padding: 10px;
                color: red;
            }
            <!-- Это правило применится ко всем элементам с классом block и text одновременно -->
            .text.block {
                font-size: 12px;
                background: green;
            }
        </style>
    </head>
    <body>
        <div id="root">
            <!--будет применено правило .text -->
            <p class="text">
                Text
            </p>
            <!--будет применено правило .block -->
            <div class="block">
                Text
            </div>
            <!--будет применено правило .text -->
            <div class="text">
                Text
            </div>
            <!--будет применено правило .text .block .text.block -->
            <div class="block text">
                Text
            </div>
        </div>
        <div class="footer">
            <!-- правил применено не будет!!!!!! -->
            <p class="text">
                Text
            </p>
            <!--будет применено правило .block -->
            <div class="block">
                Text
            </div>
            <!--будет применено правило .text -->
            <div class="text">
                Text
            </div>
            <!--будет применено правило .text .block .text.block -->
            <div class="block text">
                Text
            </div>
        </div>
    </body>
</html>
```
> **Осторожно!** CSS  всего не написать и не прересказать. за подробностями [сюда](https://webref.ru/css)

## Тексты и шрифты, а точнее наоборот

Про форматироване текста можно прочитать вы сами знаете где. Особое значение следует уделить шрифтам. Шрифт устанавливается указанием свойства `font-family`, свойство допускает установку нескольких значений, сделано это по той причине, что по умолчанию браузер пытается подключить шрифты _уже имеющиеся на компьтере пользователя_, однако на компьютере может не быть того семейства шрифтов, которое было указанного как значение свойства, если его нет то браузер попытается применить семейство шрифтов, которое указано вторым, если нет второго, попытается установить третье, когда варианты закончатся браузер применит тот шрифт, что настроен у него по умолчанию.

```html
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Window title</>
        <link rel="stylesheet" href="path-to.css"> <!-- link to resource-->
        <link rel="icon" href="favicon.icon">
        <script type="text/javascript"></script>
        <script src="path-to.js" type="text/javascript"></script>
        <style type="text/css">
            <!-- Шрифты содержащие в названии несколько слов указываются в апострофах -->
            html {
                font-family: 'Open Sans', Arial, sans-serif;
            }
        </style>
    </head>
    <body>
        <!-- будет применен к этому элементу -->
        <div id="root"></div>
    </body>
</html>
```
Шрифт является критически важной состовляющей сайта, и запасные варианты, могут, быть неприемлемы. Как обеспечить чтобы у каждого пользователя был один и тотже шрифт? Шрифт должен быть частью ресурсов сайта. Шрифт может быть загружен либо с домена самого сайта, либо c [fonts.google.com](https://fonts.google.com)

Еще одна особенность шрифтов - **авторское право** да, многие стоят денег, шрифты в [fonts.google.com](https://fonts.google.com) в большинстве бесплатные, а если и платный вас перенаправят туда где его можно купить. Еще одна особенность шрифтов - не все имеют набор кирилических символов, а еще в зависимости от шрифта богут быть разные значения жирности.

Шрифты с [fonts.google.com](https://fonts.google.com) подключать как CSS стиль.

Также стоити отметить, что есть иконочные шрифты например [Font Awesome](https://fontawesome.com)

## Блоки (элементы) отображение и позиционирование

Как было сказано ранее есть блочные тэги (элементы) и строчные, однако, это повевение можно менять, и заставить любой тэг отображаться как блок, строку, таблицу, скрыть или не отображать содержимое (да, да есть тонкая грань).

Для того чтобы задать способ отображения элемнетна, необходимо указать свойство `display`. Значения свойства `display` могут быть:
- **block** - указывает элементу, что он должен вести себя как блочный;
- **inline** - указывает элементу, что он должен вести себя как строчный;
- **inline-block** - указывает элементу, что его поведение сочетает поведение блочного и строчного элемена;
- **table** - в сочетании с элементами  со свойствами **table-row** и **table-cell** позволяет сделать таблицу без тэга `table`.
- **flex** - наше все, inline-block, котороый мы заслужили, подробнее [здесь](https://webref.ru/layout/visual-guide-flexbox);
- **none** - скрывает элемент в документе, элемент с этим свойством никак визуально не виден, и нет признаков того, что он вообще в документе присутствует, можно скрыть элемент испоьльзуя свойство `visiibility: hidden`, однако в этом случае, хоть содержимое этого элемента и не будет видно, будет видно место которое этот элемент занимает.

Блокам могут быть назначены внешние `margin` и внутреннае `padding`. Важно отметить, что внешние блоки элементов при пересечении не суммируются, т.е. если у двух элементов, следующих друг за другом, указаны внешние отступы 10px, то расстояние между ними будет не 20px, а 10px, если отступы неравны, будет взят больший.

```css
/* Для padding аналогично */
.header {
    margin: 10px; 
    margin: 10px 5px; /*внешний отступ 10xp сверху и снизу, 5px слева и справа*/
    margin: 10px 15px 5px; /*отступ сверху 10px, слева/справа 5px, 15px снизу*/
    /*Эти свойства говорят сами за себя*/
    margin-left: 10px; 
    margin-right: 10px; 
    margin-bottom: 10px; 
    margin-top: 10px;
}
```






