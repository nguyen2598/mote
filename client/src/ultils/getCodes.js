const getNumbers = (string) => {
    return string.match(/[0-9]+/g);
};

export const getCodePrice = (totals) => {
    let arr = [];
    return totals?.map((item, index) => {
        let arrMaxMin = getNumbers(item.value);
        if (arrMaxMin.length === 1) {
            if (index === 0)
                return {
                    ...item,
                    min: 0,
                    max: arrMaxMin[0],
                };
            else {
                return {
                    ...item,
                    min: arrMaxMin[0],
                    max: 999999,
                };
            }
        }
        let sortedArr = arr.sort();
        return {
            ...item,
            min: arrMaxMin[0],
            max: arrMaxMin[1],
        };
    });
};
export const getCodeArea = (totals) => {
    let arr = [];
    return totals?.map((item, index) => {
        let arrMaxMin = getNumbers(item.value);
        if (arrMaxMin.length === 1) {
            if (index === 0)
                return {
                    ...item,
                    min: 0,
                    max: +arrMaxMin[0],
                };
            else {
                return {
                    ...item,
                    min: +arrMaxMin[0],
                    max: 999999,
                };
            }
        }
        let sortedArr = arr.sort();
        return {
            ...item,
            min: +arrMaxMin[0],
            max: +arrMaxMin[1],
        };
    });
};

export const getCodes = (arrMinMax, prices) => {
    const pricesWithMinMax = getCodePrice(prices);
    return pricesWithMinMax.filter(
        (item) =>
            (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) ||
            (item.max >= arrMinMax[0] && item.max <= arrMinMax[1]),
    );
};
export const getCodesArea = (arrMinMax, areas) => {
    const areasWithMinMax = getCodeArea(areas);
    return areasWithMinMax.filter(
        (item) =>
            (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) ||
            (item.max >= arrMinMax[0] && item.max <= arrMinMax[1]),
    );
};
