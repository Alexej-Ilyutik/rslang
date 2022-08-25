import './audioButton.scss';

export const renderAudioButton = (): string => `
<button class="word-card_audio-button">
  <img class="word-card_audio-button-image" src="../../assets/volume.svg" alt="audio button"
  </img>
</button>`

export const stopAllAudioFiles = (): void => {
  const allAudioFiles: HTMLAudioElement[] = Array.from(document.querySelectorAll('audio'));
  allAudioFiles.forEach(el => {
    el.pause();
    el.remove();
  })
}

export const playAllAudioFiles = (audioLinks: string[], index = 0): void => {
  if (index === 0) {
    stopAllAudioFiles();
  }
  if (index < audioLinks.length) {
    const audio = document.createElement('audio');
    audio.style.display = "none";
    audio.src = audioLinks[index];
    audio.autoplay = true;
    audio.onended = () => {
      audio.remove();
    };
    document.body.appendChild(audio);
    audio.addEventListener("ended", () => {
      playAllAudioFiles(audioLinks, index + 1);
    });
  }
}
