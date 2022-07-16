export function useStorage () {
    function setItem (key, value) {
        try {
            const item = JSON.stringify(value);
            localStorage.setItem(key, item);
        }
        catch(error) {
            console.log(error);
        }
    }
    function getItem(key) {
        const item = String(localStorage.getItem(key));
        return item !== null ? JSON.parse(item) : item;
    }
    return {setItem, getItem};
}