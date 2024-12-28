export const X_AXIS = 'x';
export const Y_AXIS = 'y';

export const getIlligalGrids = (currentShipGrids, nextShipLength, nextShipAxis) => {
    const illigalGrids = [...currentShipGrids];
    const temp = nextShipAxis == Y_AXIS ? 10 : 1;

    currentShipGrids.forEach(grid => {
        for (let i = 0; i < nextShipLength; i++) {
            illigalGrids.push(grid - i * temp)
        }
    });
    if (nextShipAxis == Y_AXIS) {
        let limit = 90 - (nextShipLength - 2) * 10;
        for (let i = limit; i < 100; i++)
            illigalGrids.push(i)
    } else {
        let limit = 9 - (nextShipLength - 2);
        for (let i = limit; i < 10; i++) {
            for (let j = 0; j < 100; j += 10) {
                illigalGrids.push(i + j);
            }
        }
    }
    return illigalGrids;
}