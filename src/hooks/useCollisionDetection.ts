export const useCollisionDetection = () => {
  const checkCollision = (submarineX: number, submarineY: number, sharkX: number, sharkY: number) => {
    const submarineWidth = 80;
    const submarineHeight = 40;
    const sharkWidth = 60;
    const sharkHeight = 30;
    
    return (
      submarineX < sharkX + sharkWidth &&
      submarineX + submarineWidth > sharkX &&
      submarineY < sharkY + sharkHeight &&
      submarineY + submarineHeight > sharkY
    );
  };

  return { checkCollision };
};