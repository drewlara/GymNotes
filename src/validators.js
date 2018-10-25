export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';
export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};
export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';
export const nonZero = value => parseInt(value, 10) !== 0 ? undefined : 'Cannot be zero';
export const nonNegative = value => parseInt(value, 10) > 0 ? undefined : 'Cannot be negative';
export const maxVal = value => parseInt(value, 10) <= 999 ? undefined : 'Number too large';