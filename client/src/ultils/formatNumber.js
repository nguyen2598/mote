export function getNumber(value) {
    const arr = value.match(/[-]{0,1}[\d]*[\.]{0,1}[\d]+/g);
    return (
        arr?.reduce((total, curentValue) => {
            return +total + +curentValue;
        }, 0) / arr.length
    );
}
