<script>
  import { MediaQuery } from 'svelte/reactivity'

  const dark = new MediaQuery('(prefers-color-scheme: dark)')
  const mode = $derived(dark.current ? 'dark' : 'light')
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="img/favicon-{mode}.png" />
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center gap-[5vh]">
  <img id="logo" src="img/logo-{mode}.svg" alt="Antruc" />
  <div class="flex gap-4">
    <a
      class="btn btn-neutral w-32"
      href="https://github.com/antruc"
      target="_blank">GitHub</a
    >
    <a class="btn btn-neutral w-32" href="cv.pdf" target="_blank">CV</a>
  </div>
</div>

<style>
  /* Scoped override wins over Tailwind's global .min-h-screen (two classes) */
  .min-h-screen {
    min-height: 85vh;
  }
</style>
