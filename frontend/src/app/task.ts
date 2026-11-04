export interface Task {
    id: number;
    title: string;
    status: string;
    description: string;
    createdAt: string;
    updatedAt: string | null;
    completedAt: string | null;
}