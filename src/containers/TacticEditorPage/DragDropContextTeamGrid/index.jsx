import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';
import TeamGrid from '../../../components/FootballField/TeamGrid';

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(TeamGrid);
