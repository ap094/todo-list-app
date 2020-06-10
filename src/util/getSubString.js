export default function getSubString(str) {
    if (typeof str !== 'string') {
        return '';
    }

    let subString = '';

    if (str.length >= 20) {
        subString = str.substring(0, 20) + '...';
    } else {
        subString = str;
    }

    return subString;
}
