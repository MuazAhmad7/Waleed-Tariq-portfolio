// Stub implementations - Tiptap removed

export interface TocEntry {
  level: number;
  text: string;
  id: string;
}

export interface ArticleMetadata {
  title: string | null;
  description: string | null;
  coverImage: string | null;
  wordCount: number;
  toc: TocEntry[];
}

export function extractMetadata(doc: any): ArticleMetadata {
  // Stub function - returns empty metadata
  return {
    title: null,
    description: null,
    coverImage: null,
    wordCount: 0,
    toc: [],
  };
}
