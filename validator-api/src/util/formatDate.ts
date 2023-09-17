export const formatDate = (date: string) => {
    if(date.length === 8){
        const dateString  = date;
        const year        = dateString.substring(0,4);
        const month       = dateString.substring(4,6);
        const day         = dateString.substring(6,8);

        const newDate =  new Date(Number(year), Number(month)-1, Number(day));
        return newDate.toLocaleDateString();
    }
    return null;
}