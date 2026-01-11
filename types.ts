export interface ArtPiece {
    id: string;
    title: string;
    englishTitle: string;
    description: string;
    price: string;
    image: string;
    videoUrl?: string;
    narrativePhilosophy?: string;
    scriptPreview?: string;
    usageScenario?: string;
    keyCuts?: string[];
}

export type ViewState = 'gallery' | 'detail';