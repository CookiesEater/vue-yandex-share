# Vue Yandex Share

**vue-yandex-share** позволяет интегрировать [Блок "Поделиться"] от Яндекса 

[DEMO](http://cookieseater.github.io/vue-yandex-share/)

## Установка

```Bash
$ npm i @cookieseater/vue-yandex-share --save
```

## Способ использования

- Подключить глобально

```JavaScript
// main.js
import Vue from 'vue';
import YandexShare from '@cookieseater/vue-yandex-share';

Vue.component('yandex-share', YandexShare);
```

И далее использовать в любых компонентах <yandex-share />

- Или импортировать непосредственно в компоненте

```HTML
<template>
  <yandex-share :services="['vkontakte','facebook','twitter']" counter />
</template>

<script>
import YandexShare from '@cookieseater/vue-yandex-share';

export default {
  components: {
    YandexShare,
    // ...
  },
  // ...
};
</script>
```

## Параметры

Более подробное описание находится на странице сервиса: https://tech.yandex.ru/share/doc/dg/api-docpage/


| Название         | Тип     | Описание                                                                                                          | Обязателен | По умолчанию      |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------- | ---------- | ----------------- |
| services         | Array   | Список сервисов, [список поддерживаемых](https://tech.yandex.ru/share/doc/dg/add-docpage/#supported-networks)     | true       | null              |
| counter          | Boolean | Отображать счётчик публикаций                                                                                     | false      | false             |
| url              | String  | Ссылка, которой нужно поделиться                                                                                  | false      | Текущий url       |
| title            | String  | Заголовок, которым нужно поделиться                                                                               | false      | Текущий заголовок |
| description      | String  | Текст, которым нужно поделиться                                                                                   | false      | ''                |
| image            | String  | Изображение, которым нужно поделиться                                                                             | false      | null              |
| contentByService | Object  | Параметры для отельных сервисов, [подробнее](https://tech.yandex.ru/share/doc/dg/api-docpage/#contentbyservice)   | false      | {}                |
| vertical         | Boolean | Вертикальное направление списка вместо горизонтального                                                            | false      | false             |
| small            | Boolean | Маленький размер кнопок соцсетей вместо больших                                                                   | false      | false             |
| lang             | String  | Язык                                                                                                              | false      | 'ru'              |
| limit            | Number  | Количество соцсетей, отображаемых в виде кнопок                                                                   | false      | undefined         |
| bare             | Boolean | Отключение стилей и вывод кнопок в виде текста (не будет работать если на странице несколько компонентов)         | false      | false             |
| copy             | Boolean | Позиция кнопки Скопировать ссылку (last, first или hidden)                                                        | false      | 'last'            |
| popupTop         | Boolean | Открытие pop-up вверх вместо вниз                                                                                 | false      | false             |
| popupOuter       | Boolean | Outer расположение pop-up                                                                                         | false      | false             |

## События

| Название | Передаваемые данные      | Описание                                         |
| -------- | ------------------------ | ------------------------------------------------ |
| ready    | -                        | Срабатывает при инициализации виджета            |
| share    | Идентификатор соцсети    | Срабатывает при нажатии на кнопку соцсети        |

[Блок "Поделиться"]: https://tech.yandex.ru/share/
