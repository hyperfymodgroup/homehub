
export interface LinkCardData {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  tags?: string[];
}

export const linkCards: LinkCardData[] = [
  {
    id: "1",
    title: "Neural Network Hub",
    description: "Advanced AI research and development platform",
    url: "https://example.com/neural",
    tags: ["AI", "Research", "Development"]
  },
  {
    id: "2",
    title: "Quantum Vault",
    description: "Secure digital asset storage and management",
    url: "https://example.com/vault",
    tags: ["Security", "Storage", "Encryption"]
  },
  {
    id: "3",
    title: "Cybernetic Forums",
    description: "Community discussions on tech advancements",
    url: "https://example.com/forums",
    tags: ["Community", "Discussion", "Tech"]
  },
  {
    id: "4",
    title: "Digital Marketplace",
    description: "Buy and sell digital products and services",
    url: "https://example.com/market",
    tags: ["Commerce", "Digital", "Products"]
  },
  {
    id: "5",
    title: "Holographic Design Lab",
    description: "Create immersive 3D experiences and designs",
    url: "https://example.com/design",
    tags: ["Design", "3D", "Creative"]
  },
  {
    id: "6",
    title: "Neon Documentation",
    description: "Technical documentation and API references",
    url: "https://example.com/docs",
    tags: ["Documentation", "Technical", "Reference"]
  },
  {
    id: "7",
    title: "CyberGuard Security",
    description: "Advanced security monitoring and threat detection",
    url: "https://example.com/security",
    tags: ["Security", "Monitoring", "Protection"]
  },
  {
    id: "8",
    title: "Virtual Reality Portal",
    description: "Enter immersive virtual worlds and experiences",
    url: "https://example.com/vr",
    tags: ["VR", "Immersive", "Entertainment"]
  },
  {
    id: "9",
    title: "Augmented Reality SDK",
    description: "Development tools for AR applications",
    url: "https://example.com/ar",
    tags: ["AR", "Development", "Tools"]
  },
  {
    id: "10",
    title: "Blockchain Explorer",
    description: "Navigate and analyze blockchain networks",
    url: "https://example.com/blockchain",
    tags: ["Blockchain", "Analysis", "Cryptocurrency"]
  },
  {
    id: "11",
    title: "Neural Interface",
    description: "Brain-computer interface research and applications",
    url: "https://example.com/neural-interface",
    tags: ["BCI", "Research", "Neuroscience"]
  },
  {
    id: "12",
    title: "Synthetic Biology Lab",
    description: "Biological computing and synthetic organisms",
    url: "https://example.com/synbio",
    tags: ["Biology", "Computing", "Research"]
  }
];
