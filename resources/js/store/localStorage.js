export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('price4you')
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState)
    } catch(err) {
        return undefined
    }
}

export const saveState = (store) => {
    try {
        const serializedStore = JSON.stringify(store)
        localStorage.setItem('price4you', serializedStore)
    } catch(err) {}
}
