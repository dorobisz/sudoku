export const classNames = (prefix: string, classes: Array<any>): string => {
    const classesString  = classes.map(elem => elem ? `${prefix}_${elem}` : "").join(" ");
    return `${prefix} ${classesString}`;
}