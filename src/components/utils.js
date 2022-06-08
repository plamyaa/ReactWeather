import fromUnixTime from 'date-fns/fromUnixTime'

export function roundTemp(value) {
    return Math.round(value - 273.15) + '°';
}

export function editTime(value) {
    let time = String(fromUnixTime(value));
    return time.slice(15, 21);
}