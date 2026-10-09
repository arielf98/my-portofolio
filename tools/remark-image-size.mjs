export default function remarkImageSize({ editorPreview = false } = {}) {
  return (tree, file) => {
    const markdown = String(file?.value ?? '');
    function visit(node) {
      const dimensions = node.type === 'image' && node.title?.match(/^(max|size)=(\d+)x(\d+)$/);
      const width = dimensions && Number(dimensions[2]);
      const height = dimensions && Number(dimensions[3]);
      const legacyWidth = node.type === 'image' && node.title?.match(/^width=(50|75|100)%$/)?.[1];
      if (editorPreview && node.type === 'image') {
        const start = node.position?.start.offset;
        const end = node.position?.end.offset;
        const source = Number.isInteger(start) && Number.isInteger(end) ? markdown.slice(start, end) : '';
        const inlineImage = /^!\[(?:\\.|[^\]])*\]\([\s\S]*\)$/.test(source);
        const knownTitle = !node.title || /^(?:max|size)=\d+x\d+$|^width=(?:50|75|100)%$/.test(node.title);
        if (inlineImage && knownTitle) {
          node.data ??= {};
          node.data.hProperties = {
            ...node.data.hProperties,
            'data-editor-resize': 'true',
            'data-editor-start': String(start),
            'data-editor-end': String(end),
          };
        }
      }
      if (dimensions && width >= (dimensions[1] === 'max' ? 100 : 1) && width <= 1600 && height >= (dimensions[1] === 'max' ? 100 : 1) && height <= 1600) {
        node.data ??= {};
        node.data.hProperties = {
          ...node.data.hProperties,
          style: dimensions[1] === 'size'
            ? `display: block; width: ${width}px; height: auto; max-width: 100%; max-height: ${height}px; object-fit: contain; margin-inline: auto`
            : `display: block; width: auto; height: auto; max-width: min(100%, ${width}px); max-height: ${height}px; object-fit: contain; margin-inline: auto`,
        };
        node.title = null;
      } else if (legacyWidth) {
        node.data ??= {};
        node.data.hProperties = {
          ...node.data.hProperties,
          style: `display: block; width: ${legacyWidth}%; max-width: 100%; height: auto; margin-inline: auto`,
        };
        node.title = null;
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
