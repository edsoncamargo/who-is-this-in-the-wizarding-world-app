export default function generateId(name: string) {
    return name.replace(/\s/g, "_").replace(/[A-Z]/g, function (match) {
        return match.toLowerCase()
    }).replace(/[^a-zA-Z0-9]/g, '');
}