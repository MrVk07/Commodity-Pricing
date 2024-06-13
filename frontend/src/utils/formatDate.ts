export const formatDateString = (date: Date | string): string => {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    const newDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    return newDate;
}