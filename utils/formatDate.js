export function formatDate(timestamp) {
    if (timestamp && timestamp.toDate instanceof Function) {
        const date = timestamp.toDate();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    } else {
        return "Data inválida";
    }
}