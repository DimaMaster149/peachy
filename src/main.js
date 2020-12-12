import Vue from 'vue';
import ImageGallery from './components/ImageGallery.vue';
import VideoGallery from './components/VideoGallery.vue';
import Carousel from './components/Carousel.vue';
import './assets/main.css';
import VueLazyLoad from 'vue-lazyload';

Vue.use(VueLazyLoad);

Vue.config.productionTip = false;

window.addEventListener('load', function() {
	new Vue({
		render: (h) => h(ImageGallery)
	}).$mount('#image-gallery');

	new Vue({
		render: (h) => h(VideoGallery)
	}).$mount('#video-gallery');

	new Vue({
		render: (h) => h(Carousel)
	}).$mount('#carousel');
});
