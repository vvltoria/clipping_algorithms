# Документация к Веб-Приложению «Алгоритмы Отсечения Отрезков»

## Введение

Данное веб-приложение предназначено для визуализации и интерактивного изучения работы алгоритмов отсечения отрезков:
- **Алгоритм Лианга-Барски** для отсечения отрезков относительно прямоугольного окна.
- **Алгоритм Кайруса-Бека** для отсечения отрезков относительно выпуклого многоугольника.

Приложение позволяет пользователям вводить данные, выполнять отсечение, увеличивать и уменьшать масштаб отображения, а также подробно отслеживать шаги выполнения алгоритмов.

## Структура Приложения

### Главная Страница (`index.html`)

На главной странице представлены две основные секции:

1. **Отсечение отрезков прямоугольным окном (Лианга-Барски)**
2. **Отсечение отрезков выпуклым многоугольником (Кайруса-Бека)**

Каждая секция включает в себя:
- **Поле ввода данных**: для задания параметров отрезков и окон отсечения.
- **Кнопки управления**:
  - **Выполнить отсечение**: запускает процесс отсечения введённых отрезков.
  - **Увеличить/Уменьшить масштаб**: изменяет масштаб отображения на канвасе.
  - **Очистить канвас**: сбрасывает все отображённые элементы и шаги алгоритма.
- **Отображение текущего масштаба**.
- **Канвас**: графическое отображение отрезков, окон отсечения и отсечённых отрезков.
- **Контейнер для шагов алгоритма**: подробно описывает каждый шаг выполнения алгоритма.

### Страница Теории (`theory.html`)

Эта страница предоставляет теоретическое обоснование используемых алгоритмов:

- **Алгоритм Лианга-Барски**: описание шагов и принцип работы.
- **Алгоритм Кайруса-Бека**: описание шагов и принцип работы.

## Использование Приложения

### Ввод Данных

Для каждого алгоритма необходимо ввести данные в соответствующее текстовое поле. Формат ввода данных:

1. **Алгоритм Лианга-Барски**:
   ```
   n
   x1 y1 x2 y2
   ...
   xmin ymin xmax ymax
   ```
   - `n` — количество отрезков.
   - `x1 y1 x2 y2` — координаты начала и конца каждого отрезка.
   - `xmin ymin xmax ymax` — границы прямоугольного окна отсечения.

2. **Алгоритм Кайруса-Бека**:
   ```
   n
   x1 y1 x2 y2
   ...
   m
   x0 y0
   x1 y1
   ...
   xm-1 ym-1
   ```
   - `n` — количество отрезков.
   - `x1 y1 x2 y2` — координаты начала и конца каждого отрезка.
   - `m` — количество вершин выпуклого многоугольника.
   - `x0 y0 ... xm-1 ym-1` — координаты вершин многоугольника в порядке обхода.

### Выполнение Отсечения

1. **Ввод данных**: Введите необходимые параметры в соответствующее текстовое поле.
2. **Запуск алгоритма**: Нажмите кнопку «Выполнить отсечение». Отрезки будут обработаны выбранным алгоритмом, результаты отобразятся на канвасе.
3. **Просмотр шагов алгоритма**: Внизу каждой секции отображаются подробные шаги выполнения алгоритма, что позволяет лучше понять процесс отсечения.
4. **Управление масштабом**: Используйте кнопки «Увеличить масштаб» и «Уменьшить масштаб» для изменения масштаба отображения на канвасе.
5. **Очистка канваса**: Для сброса отображённых данных и шагов алгоритма нажмите кнопку «Очистить канвас».

## Интерфейс Приложения

- **Кнопка «Теория»**: Переводит пользователя на страницу с теоретическим описанием алгоритмов.
- **Кнопка «← Назад»** (на странице теории): Возвращает пользователя на главную страницу.
- **Канвас**: Основная область для графического отображения отрезков, окон отсечения и результатов отсечения.
- **Контейнеры шагов алгоритма**: Позволяют подробно отслеживать каждое действие алгоритма, что способствует лучшему пониманию его работы.

## Заключение

Это веб-приложение предоставляет удобный и наглядный способ изучения и понимания алгоритмов отсечения отрезков. Интерактивные элементы позволяют экспериментировать с различными данными и наблюдать за процессом выполнения алгоритмов в реальном времени.

Для доступа к приложению, посетите наш сайт:

[Перейти на сайт](https://vvltoria.github.io/clipping_algorithms/)