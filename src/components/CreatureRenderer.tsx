import Shark from './Shark';
import SeaSerpent from './SeaSerpent';
import Kraken from './Kraken';
import Jellyfish from './Jellyfish';

interface CreatureType {
  id: number;
  x: number;
  y: number;
  type: 'shark' | 'serpent' | 'kraken' | 'jellyfish';
}

interface CreatureRendererProps {
  creatures: CreatureType[];
}

const CreatureRenderer = ({ creatures }: CreatureRendererProps) => {
  return (
    <>
      {creatures.map(creature => {
        switch (creature.type) {
          case 'shark':
            return <Shark key={creature.id} x={creature.x} y={creature.y} />;
          case 'serpent':
            return <SeaSerpent key={creature.id} x={creature.x} y={creature.y} />;
          case 'kraken':
            return <Kraken key={creature.id} x={creature.x} y={creature.y} />;
          case 'jellyfish':
            return <Jellyfish key={creature.id} x={creature.x} y={creature.y} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default CreatureRenderer;