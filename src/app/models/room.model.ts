import { UserModel } from "./user.model";

export interface RoomModel {
    id: number;
    name: string;
    description: string;
    notes?: string;
    responsible?: number;
    responsible_details?: UserModel;
}

export interface RoomPaginationResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: RoomModel[];
}