import Script from './Script';

export default {
  name: 'YandexShare',
  props: {
    services: {
      type: Array,
      required: true,
    },
    counter: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: undefined,
    },
    contentByService: {
      type: Object,
      default() {
        return {};
      },
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: String,
      default: 'ru',
    },
    limit: {
      type: Number,
      default: undefined,
    },
    bare: {
      type: Boolean,
      default: false,
    },
    copy: {
      type: String,
      default: 'last',
    },
    popupTop: {
      type: Boolean,
      default: false,
    },
    popupOuter: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    Script.attach().then(() => {
      window.Ya.share2(this.$el, {
        content: {
          url: this.url || window.location.href,
          title: this.title || document.title,
          description: this.description,
          image: this.image,
        },
        contentByService: this.contentByService,
        theme: {
          bare: this.bare,
          copy: this.copy,
          counter: this.counter,
          direction: this.vertical ? 'vertical' : 'horizontal',
          lang: this.lang,
          limit: this.limit,
          popupDirection: this.popupTop ? 'top' : 'bottom',
          popupPosition: this.popupOuter ? 'outer' : 'inner',
          services: this.services.join(','),
          size: this.small ? 's' : 'm',
        },
        hooks: {
          onready: () => { this.$emit('ready'); },
          onshare: (name) => { this.$emit('share', name); },
        },
      });
    });
  },
  render(h) {
    return h('div');
  },
};
