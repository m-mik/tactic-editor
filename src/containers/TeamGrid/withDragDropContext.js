import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

export default DragDropContext(TouchBackend({ enableMouseEvents: true }));
