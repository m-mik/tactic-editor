import { findDOMNode } from 'react-dom';

export const getNodeOffset = (sourceNode, targetNode) => ({
  left: targetNode.offsetLeft - sourceNode.offsetLeft,
  top: targetNode.offsetTop - sourceNode.offsetTop,
});

export const getCompOffset = (sourceComp, targetComp) =>
  getNodeOffset(findDOMNode(sourceComp), findDOMNode(targetComp));
