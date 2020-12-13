import Vue from 'vue';
import ImageGallery from './components/ImageGallery.vue';
import VideoGallery from './components/VideoGallery.vue';
import CarouselContainer from './components/CarouselContainer.vue';
import './assets/main.css';

Vue.config.productionTip = false;

window.addEventListener('load', function() {
	new Vue({
		render: (h) => h(ImageGallery)
	}).$mount('#image-gallery');

	new Vue({
		render: (h) => h(VideoGallery)
	}).$mount('#video-gallery');

	new Vue({
		render: (h) => h(CarouselContainer)
	}).$mount('#carousel');
});
