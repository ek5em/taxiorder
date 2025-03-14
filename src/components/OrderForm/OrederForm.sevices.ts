export function debounce(callback: Function, timeout: number) {
    let lastCallTimer: NodeJS.Timeout | null = null;

    return function perform(...args: any) {
        if (lastCallTimer) {
            clearTimeout(lastCallTimer);
            lastCallTimer = null;
        }

        lastCallTimer = setTimeout(() => {
            callback(...args);
            lastCallTimer = null;
        }, timeout);
    };
}

export const getSourceTime = () => {
    const now = new Date();

    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};
