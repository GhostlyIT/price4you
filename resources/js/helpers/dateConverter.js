const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
]

export const getMonthOnRus = (monthNumber) => {
    return months[monthNumber]
}

export const getFullDate = rawDate => {
    const transformedDate = new Date(rawDate)
    let month = '0' + (parseInt(transformedDate.getMonth()) + parseInt(1))
    if (parseInt(transformedDate.getMonth()) + 1 > 9) {
        month = month.slice(0)
    }

    let day = '0' + transformedDate.getDate()
    if (parseInt(transformedDate.getDate()) > 9) {
        day = day.slice(0)
    }

    return day +
        '.' + month +
        '.' + transformedDate.getFullYear() +
        ' ' + transformedDate.getHours() +
        ':' + (transformedDate.getMinutes()<10?'0':'') + transformedDate.getMinutes()
}
