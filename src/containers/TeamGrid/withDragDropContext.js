import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
const backend = isTouchDevice ? TouchBackend({ enableMouseEvents: true }) : HTML5Backend;

export default DragDropContext(backend);
