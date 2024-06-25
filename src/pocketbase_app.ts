import PocketBase, {RecordModel} from 'pocketbase';

const PocketbaseApp = () => new PocketBase(import.meta.env.VITE_POCKETBASE_URL)

export default PocketbaseApp;

export const blogReplaceImagePlaceholders = (record: RecordModel, text: string) => {
    const app = PocketbaseApp()
    const regex = /\[\[\[([a-zA-Z0-9_.]+)\|([^\]]+)\|([^\]]+)]]]/g;
    return text.replace(regex, (_, imageId, thumb, imageAlt) => {
        const source = app.files.getUrl(record, imageId, thumb.trim() ? { thumb: thumb } : undefined);
        return `<Image src="${source}" alt="${imageAlt}"/>`
    });
}