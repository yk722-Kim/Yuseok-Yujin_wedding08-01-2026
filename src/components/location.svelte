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

  function copyAccount(accountNumber: string) {
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => alert('계좌번호가 복사되었습니다.'))
      .catch(() => null);
  }

  let groomOpen = false;
  let brideOpen = false;

  const groomAccounts = [
    { name: '김유석', bank: '하나은행', account: '880-910543-82207' },
    { name: '[부]김경윤', bank: '제일은행', account: '597-20-013988' },
    { name: '[모]김수현', bank: '농협은행', account: '312-91835-87401' }
  ];

  const brideAccounts = [
    { name: '김유진', bank: '토스뱅크', account: '1000-1171-1442' },
    { name: '[부]김찬훈', bank: '우리은행', account: '060-029887-12-101' },
    { name: '[모]안현아', bank: '하나은행', account: '359-18-10978-0' }
  ];
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

  <div class="account-section">
    <h2 class="title kr">마음전하실 곳</h2>

    <div class="account-group">
      <button class="account-toggle kr" onclick={() => (groomOpen = !groomOpen)}>
        <span>신랑측 계좌번호</span>
        <span class="toggle-mark">{groomOpen ? '−' : '+'}</span>
      </button>

      {#if groomOpen}
        <div class="account-list">
          {#each groomAccounts as item, index}
            <div class="account-item">
              <p class="account-name kr">{item.name}</p>
              <div class="account-line">
                <span class="account-text kr">{item.bank} {item.account}</span>
                <button
                  class="copy-account-button kr"
                  type="button"
                  onclick={() => copyAccount(item.account)}
                >
                  복사하기
                </button>
              </div>
            </div>

            {#if index < groomAccounts.length - 1}
              <div class="account-divider"></div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <div class="account-group">
      <button class="account-toggle kr" onclick={() => (brideOpen = !brideOpen)}>
        <span>신부측 계좌번호</span>
        <span class="toggle-mark">{brideOpen ? '−' : '+'}</span>
      </button>

      {#if brideOpen}
        <div class="account-list">
          {#each brideAccounts as item, index}
            <div class="account-item">
              <p class="account-name kr">{item.name}</p>
              <div class="account-line">
                <span class="account-text kr">{item.bank} {item.account}</span>
                <button
                  class="copy-account-button kr"
                  type="button"
                  onclick={() => copyAccount(item.account)}
                >
                  복사하기
                </button>
              </div>
            </div>

            {#if index < brideAccounts.length - 1}
              <div class="account-divider"></div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <p class="signature en">made by Yuseok & Yujin</p>
  <a class="github-icon" href="https://github.com/anthopark/our-wedding-invitation" target="_blank" rel="noopener noreferrer">
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

  .account-section {
    width: 100%;
    margin-bottom: 4em;
  }

  .account-section h2.title {
    margin-bottom: 1em;
  }

  .account-group {
    width: 100%;
    margin-bottom: 1em;
  }

  .account-toggle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.95em 1em;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background-color: $white;
    color: $primary-color;
    cursor: pointer;
    text-align: left;
    box-sizing: border-box;

    &.kr {
      font-size: 1.05rem;
    }
  }

  .toggle-mark {
    font-size: 1.3rem;
    line-height: 1;
  }

  .account-list {
    margin-top: 0.6em;
    padding: 1em;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.7);
  }

  .account-item {
    padding: 0.2em 0;
  }

  .account-name {
    margin-bottom: 0.45em;
    color: $font-color-default;
    font-weight: 600;

    &.kr {
      font-size: 1rem;
    }
  }

  .account-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8em;
  }

  .account-text {
    color: $font-color-default;
    word-break: keep-all;

    &.kr {
      font-size: 0.98rem;
      line-height: 1.5;
    }
  }

  .copy-account-button {
    flex-shrink: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: $white;
    color: $primary-color;
    border-radius: 6px;
    padding: 0.45em 0.8em;
    cursor: pointer;

    &.kr {
      font-size: 0.9rem;
    }
  }

  .account-divider {
    margin: 0.9em 0;
    border-top: 1px dashed rgba(0, 0, 0, 0.18);
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