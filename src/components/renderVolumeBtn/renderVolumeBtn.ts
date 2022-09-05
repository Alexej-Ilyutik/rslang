import { storage } from '../../shared/storage';

export const renderVolumeBtn = (): string => {
  let mainBlock = '';
  if (storage.volumeState) {
    mainBlock = `
      <div class = "audiocall__volume-on"><i class="fa fa-volume-up fa-2x volume-on"></i></div>
      `;
  } else {
    mainBlock = `
      <div class = "audiocall__volume-off"><i class="fa fa-volume-mute fa-2x volume-off"></i></div>
      `;
  }
  return mainBlock;
};
