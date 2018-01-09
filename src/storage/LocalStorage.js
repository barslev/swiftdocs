export default class LocalStorage
{
    load(documentId) {
        return Promise.resolve(
            JSON.parse(
                window.localStorage.getItem(documentId)
            )
        )
    }

    persist(documentId, state) {
        return Promise.resolve(
            window.localStorage.setItem(
                documentId, JSON.stringify(state)
            )
        )
    }
}