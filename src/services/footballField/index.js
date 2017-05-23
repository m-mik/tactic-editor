import { findDOMNode } from 'react-dom';

export const getNodeOffset = (sourceNode, targetNode) => ({
  x: targetNode.offsetLeft - sourceNode.offsetLeft,
  y: targetNode.offsetTop - sourceNode.offsetTop,
});

export const getCompOffset = (sourceComp, targetComp) =>
  getNodeOffset(findDOMNode(sourceComp), findDOMNode(targetComp));
