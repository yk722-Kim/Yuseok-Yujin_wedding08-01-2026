<script lang="ts">
	import photo1 from '$lib/assets/gallery/1.webp';
	import photo2 from '$lib/assets/gallery/2.webp';
	import photo3 from '$lib/assets/gallery/3.webp';
	import photo4 from '$lib/assets/gallery/4.webp';
	import photo5 from '$lib/assets/gallery/5.webp';
	import photo6 from '$lib/assets/gallery/6.webp';
	import photo7 from '$lib/assets/gallery/7.webp';
	import photo8 from '$lib/assets/gallery/8.webp';
	import photo9 from '$lib/assets/gallery/9.webp';
	import photo10 from '$lib/assets/gallery/10.webp';
	import photo11 from '$lib/assets/gallery/11.webp';
	import photo12 from '$lib/assets/gallery/12.webp';
	import photo13 from '$lib/assets/gallery/13.webp';
	import photo14 from '$lib/assets/gallery/14.webp';
	import photo15 from '$lib/assets/gallery/15.webp';
	import photo16 from '$lib/assets/gallery/16.webp';
	import photo17 from '$lib/assets/gallery/17.webp';
	import photo18 from '$lib/assets/gallery/18.webp';
	import photo19 from '$lib/assets/gallery/19.webp';
	import photo20 from '$lib/assets/gallery/20.webp';

	import PhotoSwipeLightBox from 'photoswipe/lightbox';
	import PhotoSwipe from 'photoswipe';
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import { localeStore } from '../i18n.svelte';
	import { _ } from 'svelte-i18n';

	type PhotoItem = {
		src: string;
		width: number;
		height: number;
		span: number;
	};

	type PhotoRow = {
		height: number;
		photos: PhotoItem[];
	};

	function createPhoto(src: string, span: number): PhotoItem {
		return {
			src,
			width: 1200,
			height: 1800,
			span
		};
	}

	let rows: PhotoRow[] = [
		{
			height: 300,
			photos: [
				createPhoto(photo16, 2),
				createPhoto(photo2, 4)
			]
		},
		{
			height: 250,
			photos: [
				createPhoto(photo1, 2),
				createPhoto(photo3, 2),
				createPhoto(photo4, 2)
			]
		},
		{
			height: 300,
			photos: [
				createPhoto(photo13, 4),
				createPhoto(photo15, 2)
			]
		},
		{
			height: 250,
			photos: [
				createPhoto(photo20, 2),
				createPhoto(photo5, 2),
				createPhoto(photo6, 2)
			]
		},
		{
			height: 300,
			photos: [
				createPhoto(photo8, 2),
				createPhoto(photo18, 4)
			]
		},
		{
			height: 330,
			photos: [
				createPhoto(photo7, 3),
				createPhoto(photo14, 3)
			]
		},
		{
			height: 250,
			photos: [
				createPhoto(photo9, 2),
				createPhoto(photo11, 2),
				createPhoto(photo10, 2)
			]
		},
		{
			height: 250,
			photos: [
				createPhoto(photo12, 2),
				createPhoto(photo17, 2),
				createPhoto(photo19, 2)
			]
		}
	];

	function getImageSize(src: string): Promise<{ width: number; height: number }> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				resolve({
					width: img.naturalWidth,
					height: img.naturalHeight
				});
			};
			img.onerror = reject;
			img.src = src;
		});
	}

	onMount(async () => {
		rows = await Promise.all(
			rows.map(async (row) => ({
				...row,
				photos: await Promise.all(
					row.photos.map(async (photo) => {
						try {
							const size = await getImageSize(photo.src);
							return {
								...photo,
								width: size.width,
								height: size.height
							};
						} catch {
							return photo;
						}
					})
				)
			}))
		);

		const lightbox = new PhotoSwipeLightBox({
			gallery: '#gallery',
			children: 'a',
			showHideAnimationType: 'fade',
			pswpModule: PhotoSwipe
		});

		lightbox.init();

		return () => {
			lightbox.destroy();
		};
	});
</script>

<section class="gallery">
	<div class="header">
		<h2 class="title {localeStore.locale}">{$_('gallery.title')}</h2>
		<p class="sub-title {localeStore.locale}">{$_('gallery.sub_title')}</p>
	</div>

	<div id="gallery">
		{#each rows as row}
			<div class="gallery-row" style={`height: ${row.height}px;`}>
				{#each row.photos as photo}
					<a
						href={photo.src}
						class="slide"
						style={`grid-column: span ${photo.span};`}
						data-pswp-width={photo.width}
						data-pswp-height={photo.height}
					>
						<img class="thumbnail" src={photo.src} alt="" />
					</a>
				{/each}
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	@use '../styles/global.scss' as *;

	section.gallery {
		padding: 4.5em 2em 2em 2em;
		background-color: $white;
	}

	.header {
		margin-bottom: 2em;
	}

	h2.title {
		text-align: center;

		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}
	}

	p.sub-title {
		text-align: center;

		&.kr {
			margin-top: 0.9em;
			font-size: 0.9rem;
		}

		&.en {
			margin-top: 0.5em;
			font-size: 1.2rem;
		}
	}

	#gallery {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.gallery-row {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 1em;
	}

	.slide {
		display: block;
		height: 100%;
		overflow: hidden;
		border-radius: 4px;
	}

	img.thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		border-radius: 4px;
	}

	@media (max-width: 768px) {
		.gallery-row {
			grid-template-columns: repeat(2, 1fr);
			height: auto !important;
		}

		.slide {
			grid-column: span 1 !important;
			height: 260px;
		}
	}
</style>