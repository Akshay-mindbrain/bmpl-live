export interface TreeNodeType {
    id: number;
    name: string;
    isReferred: boolean;
    left?: TreeNodeType | null;
    right?: TreeNodeType | null;
}