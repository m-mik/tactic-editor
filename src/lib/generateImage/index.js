// noinspection JSCheckFunctionSignatures,JSValidateTypes

import domtoimage from 'dom-to-image';

export function generateImageFromNode(node, options = {}) {
  return new Promise((resolve, reject) => {
    domtoimage.toPng(node, options)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        resolve(img);
      })
      .catch(reject);
  });
}

export function generateImagesFromNodes(nodes, options) {
  const data = nodes.map(node => generateImageFromNode(node, options));
  return Promise.all(data);
}

export function generateTacticImages(includeSummary) {
  const nodeNames = ['tactic-page'];
  if (includeSummary) nodeNames.push('match-summary');
  const nodes = nodeNames.map(nodeName => document.getElementById(nodeName));

  const filter = (node) => {
    const ignoreData = {
      className: ['tacticSelect'],
      id: ['edit-team', 'add-player'],
    };
    if (!node) return false;
    return !Object.keys(ignoreData)
      .some(
        key => typeof node[key] === 'string'
        && ignoreData[key].some(item => node[key].includes(item)),
      );
  };

  generateImagesFromNodes(nodes, { filter }).then((images) => {
    const newTab = window.open();
    images.forEach((image) => {
      const div = document.createElement('div');
      div.style.padding = '10px';
      div.appendChild(image);
      newTab.document.body.style.background = '#cbcbcb';
      newTab.document.body.appendChild(div);
    });
    // eslint-disable-next-line no-console
  }).catch(e => console.error(`Could not generate tactic images: ${e}`));
}
