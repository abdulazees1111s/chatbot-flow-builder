export const validateFlow = (nodes: any[], edges: any[]) => {
  if (nodes.length <= 1) return true;
  const nodesWithoutIncoming = nodes.filter(
    (node) => !edges.some((edge) => edge.target === node.id)
  );
  return nodesWithoutIncoming.length <= 1;
};
