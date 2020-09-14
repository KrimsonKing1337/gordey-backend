# Backend для сайта c портфолио Гордея

### Установка пакетов
```npm i```

### Запуск сервера
```npm run start```

Сервер запустится на 3000 порту.

Для работы потребуется база данных sqlite.

При первом запуске скрипт автоматически создаст файл db.sqlite в корне проекта с двумя таблицами: projects и tags.

По дизайну с фронтенда невозможно произвести регистрацию,поэтому потребуется вручную создать ещё одну таблицу: `auth`. С двумя полями `login` и `password` формата `varchar`.
Например:

```sqlite
create table auth
(
	login varchar not null,
	password varchar not null
);
```

И добавить строку со значениями.

Для пароля необходимо использовать хэширование, используя bcrypt.
Например:

```javascript
bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
    // Store hash in your password DB.
});
```
