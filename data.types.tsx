export type Data = {
    search: {
      edges: [Node];
    };
  };
  
  export type Node = {
    node: Edge;
  };
  
  export type Edge = {
    createdAt: string;
    description: string;
    name: string;
    id: string;
    stargazers: {
      totalCount: number;
    };
    url: string;
  };