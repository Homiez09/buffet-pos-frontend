export const formatDate  = (date: string) => {
    const newDate = new Date(date);
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
    return `${hour}:${minute < 10 ? `0${minute}` : minute}`;
}