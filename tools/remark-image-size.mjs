export default function remarkImageSize() {
  return (tree) => {
    function visit(node) {
      const dimensions = node.type === 'image' && node.title?.match(/^max=(\d+)x(\d+)$/);
      const width = dimensions && Number(dimensions[1]);
      const height = dimensions && Number(dimensions[2]);
      const legacyWidth = node.type === 'image' && node.title?.match(/^width=(50|75|100)%$/)?.[1];
      if (width >= 100 && width <= 1600 && height >= 100 && height <= 1600) {
        node.data ??= {};
        node.data.hProperties = {
          ...node.data.hProperties,
          style: `display: block; width: auto; height: auto; max-width: min(100%, ${width}px); max-height: ${height}px; object-fit: contain; margin-inline: auto`,
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
