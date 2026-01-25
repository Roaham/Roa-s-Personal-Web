export async function load() {
    // Busca todos los archivos .md en la carpeta posts
    // Importar como texto crudo para evitar que Vite intente parsear Markdown como JS
    // Intentamos con y sin `?raw` para compatibilidad
    // prefer query import to load raw text; fallback using query option for older Vite
    let paths = import.meta.glob('/src/lib/posts/*.md?raw', { eager: true });
    if (Object.keys(paths).length === 0) {
        // use the newer query/import form
        paths = import.meta.glob('/src/lib/posts/*.md', { eager: true, query: '?raw', import: 'default' });
    }

    function parseFrontmatter(raw) {
        // aceptar CRLF o LF
        const m = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/m.exec(raw);
        if (!m) return { metadata: {}, content: raw };

        const fm = m[1];
        const content = m[2] || '';
        const metadata = {};

        const titleMatch = /title\s*:\s*(?:"|')?(.+?)(?:"|')?\s*$/m.exec(fm);
        if (titleMatch) metadata.title = titleMatch[1].trim();

        const imageMatch = /image\s*:\s*(?:"|')?(.+?)(?:"|')?\s*$/m.exec(fm);
        if (imageMatch) metadata.image = imageMatch[1].trim();

        const tagsMatch = /tags\s*:\s*\[([^\]]*)\]/m.exec(fm);
        if (tagsMatch) {
            metadata.tags = tagsMatch[1]
                .split(',')
                .map((t) => t.replace(/["'\s]/g, '').trim())
                .filter(Boolean);
        }

        const dateMatch = /date\s*:\s*(?:"|')?(.+?)(?:"|')?\s*$/m.exec(fm);
        if (dateMatch) metadata.date = dateMatch[1].trim();

        return { metadata, content };
    }

    const posts = Object.entries(paths).map(([path, raw]) => {
        const filename = path.split('/').pop();
        const slug = filename ? filename.split('.md')[0] : filename;
        const { metadata, content } = parseFrontmatter(raw);
        return { slug, content, ...metadata };
    });

    // Ordenar por fecha (si existe) y devolver
    return {
        posts: posts.sort((a, b) => {
            const ta = a.date ? new Date(a.date).getTime() : 0;
            const tb = b.date ? new Date(b.date).getTime() : 0;
            return tb - ta;
        })
    };
}