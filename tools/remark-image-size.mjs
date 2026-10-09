export default function remarkImageSize() {
  return (tree) => {
    function visit(node) {
      const size = node.type === 'image' && node.title?.match(/^width=(50|75|100)%$/)?.[1];
      if (size) {
        const width = `${size}%`;
        node.data ??= {};
        node.data.hProperties = {
          ...node.data.hProperties,
          style: `display: block; width: ${width}; max-width: 100%; height: auto; margin-inline: auto`,
        };
        node.title = null;
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
