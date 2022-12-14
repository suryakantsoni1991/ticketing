import { Subjects } from "./subjects";
//test
export interface TicketUpdatedEvent {
    subject: Subjects.TicketUpdated;
    data: {
        id: string;
        version: number;
        title: string;
        price: number;
        userId: string;
    };
}