export const entryTime = (date: string) => {
    const newDate = new Date(date);
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
    return `${hour}:${minute < 10 ? `0${minute}` : minute}`;
}

export const remainingTime = (entryTime: string) => {
    const currentTime = new Date();
    const newEntryTime = new Date(entryTime);
    const remainingTime = newEntryTime.setHours(newEntryTime.getHours() + 2) - currentTime.getTime();
    return Math.floor(remainingTime / 60000);
}