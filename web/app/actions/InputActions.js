//Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
export const INPUT_CLEARED = 'INPUT_CLEARED';


export function rescaleImagePixels(pixelIntensities, toSize) {
  const fromSize = parseInt(Math.sqrt(pixelIntensities.length));
  const scale = fromSize / toSize;

  const rescaledPixelIntensities = Array(toSize**2);

  for (let i=0; i < rescaledPixelIntensities.length; i++) {
    let xStart = (i%toSize)*scale;
    let xEnd = xStart + scale;
    let yStart = parseInt(i/toSize) * scale;
    let yEnd = yStart + scale;

    let pixelSum = 0;
    for (let x=xStart; x < xEnd; x++) {
      for (let y=yStart; y < yEnd; y++) {
        pixelSum += pixelIntensities[x + y*fromSize]
      }
    }
    rescaledPixelIntensities[i] = pixelSum / (255.0 * scale**2);
  }
  console.log(rescaledPixelIntensities)
  return rescaledPixelIntensities;
}

export function inputCleared() {
  return (dispatch) => {
    dispatch({ type: INPUT_CLEARED, payload: { }});
  }
};
