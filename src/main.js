import Vue from 'vue';
import ImageGallery from './components/ImageGallery.vue';
import VideoGallery from './components/VideoGallery.vue';
import CarouselContainer from './components/CarouselContainer.vue';
import './assets/main.css';
import vueLazy from 'vue-lazyload';

Vue.use(vueLazy, {
	observer: true,
	observerOptions: {
		rootMargin: '0px',
		threshold: 0.1
	}
});

Vue.config.productionTip = false;

window.addEventListener('load', function() {
	new Vue({
		render: h => h(VideoGallery)
	}).$mount('#video-gallery');

	setTimeout(() => {
		new Vue({
			render: h => h(ImageGallery)
		}).$mount('#image-gallery');
	}, 300);

	setTimeout(() => {
		new Vue({
			render: h => h(CarouselContainer)
		}).$mount('#carousel');
	}, 1000);
});
