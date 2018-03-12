import YandexShare from './YandexShare';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('yandex-share', YandexShare);
}

export default YandexShare;
