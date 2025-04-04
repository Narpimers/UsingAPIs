'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';


  function walk(img, startPos, stopPos) {
    return new Promise((resolve) => {
        img.style.left = `${startPos}px`; 
        const WalkInterval = setInterval(() => {
            let currentPos = parseInt(img.style.left); 
            if (currentPos < stopPos) {
                img.style.left = `${currentPos + STEP_SIZE_PX}px`; 
            } else {
                clearInterval(WalkInterval);
                resolve(); 
            }
        }, STEP_INTERVAL_MS); 
    });
}
    
  

function dance(img) {
  return new Promise((resolve) => {
    const originalSrc = img.src;
    img.src = DANCING_CAT_URL;

    setTimeout(() => {
      img.src = originalSrc;
      img.style.left++;
      resolve();
    }, DANCE_TIME_MS);
  })
}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;
  function startCycle() {
    
  // if (parseInt(img.style.left) === centerPos) {
  //   dance(img);
  // };

  // if (parseInt(img.style.left) > centerPos) {
  //   walk(img, startPos, stopPos)
  // };

    walk(img, startPos, centerPos)
      .then(() => dance(img))
      .then(() => walk(img, centerPos, stopPos))
      .then(() => {
        startCycle();
      });
  }

  startCycle();
}
window.addEventListener('load', catWalk);