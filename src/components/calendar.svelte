<script lang="ts">
	import calendarFull from '$lib/assets/calendar/calendar.svg';
	import calendarDeco from '$lib/assets/calendar-deco.svg';
</script>

<section class="calendar">
	<h2 class="title en">Aug</h2>
	<img class="calendar-full" src={calendarFull} alt="August calendar" />
	<img class="calendar-deco" src={calendarDeco} alt="calendar deco" />
</section>

<style lang="scss">
	@use '../styles/global.scss' as *;

	.calendar {
		position: relative;
		background-color: $white;
		padding: 2em 3.5em 4em 3.5em;

		.title {
			@extend .title-font-en !optional;
			text-align: center;
			margin-bottom: 1em;
		}

		.calendar-full {
			display: block;
			width: 100%;
			height: auto;
		}

		img.calendar-deco {
			position: absolute;
			bottom: 0.5em;
			right: 2.5em;
		}
	}
</style>