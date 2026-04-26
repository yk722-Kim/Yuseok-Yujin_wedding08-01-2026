<script lang="ts">
  import locationTopWave from '$lib/assets/location-top-wave.svg';
  import locationDeco from '$lib/assets/location-deco.svg';
  import { _ } from 'svelte-i18n';
  import { localeStore } from '../i18n.svelte';
  import { Clipboard, Github } from '@lucide/svelte';

  const googleMapsUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2944.0354971913102!2d-76.48449792368277!3d42.44826082952433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d0818af370608f%3A0x1a869c58e0fa205f!2sA.D.%20White%20House!5e0!3m2!1sen!2sus!4v1772031987055!5m2!1sen!2sus";

  function copyAddress() {
    navigator.clipboard
      .writeText('27 E Ave, Ithaca, NY 14853')
      .then(() => alert($_('location.address_copied')))
      .catch(() => null);
  }
</script>

<img src={locationTopWave} class="location-top-wave" alt="" />

<section class="location">
  <h2 class="title {localeStore.locale}">{$_('location.title')}</h2>

  <p class="venue en">A.D. White House, Cornell University</p>

  <button class="copy-address en" onclick={copyAddress}>
    <span class="clipboard-icon">
      <Clipboard size="1.1em" />
    </span>
    <span class="address">27 E Ave, Ithaca, NY 14853</span>
  </button>

  <div class="map">
    <iframe
      class="google-maps"
      title="google maps"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      src={googleMapsUrl}
    />
  </div>

  <p class="signature en">made by Yuseok & Yujin</p>

  <a
    class="github-icon"
    href="https://github.com/yk722-Kim/Yuseok-Yujin_wedding08-01-2026"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Github size="1.1em" strokeWidth={1} />
  </a>

  <img class="location-deco" src={locationDeco} alt="" />
</section>

<style lang="scss">
  @use '../styles/global.scss' as *;

  img.location-top-wave {
    max-width: $content-max-width;
    margin: auto;
  }

  section.location {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $bg-color-1;
    padding: 1em 2em 1em 2em;
  }

  h2.title {
    color: $primary-color;
    text-align: center;
    margin-bottom: 1em;

    &.kr {
      @extend .title-font-kr !optional;
      letter-spacing: 1px;
    }

    &.en {
      @extend .title-font-en !optional;
      letter-spacing: 1px;
    }
  }

  p.venue {
    &.en {
      font-size: 1.1rem;
    }
  }

  button.copy-address {
    display: flex;
    align-items: center;
    margin-top: 0.5em;

    .clipboard-icon {
      height: 1em;
      display: inline-block;
      margin-right: 0.2em;
      color: $font-color-default;
    }

    .address {
      display: inline-block;
      font-size: 1.2rem;
      text-decoration: underline;
    }
  }

  .map {
    margin-top: 2em;
    width: 100%;
    height: 16em;
    margin-bottom: 3em;
  }

  iframe.google-maps {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  p.signature {
    font-size: 1rem;
  }

  .github-icon {
    margin-top: 0.2em;
    color: $font-color-default;
    cursor: pointer;
  }

  img.location-deco {
    position: absolute;
    bottom: 2.5em;
    right: 1.5em;
  }
</style>