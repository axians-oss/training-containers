//  Purpose: This file defines the Opportunity interface.
import {Account} from "./account";

export interface Opportunity {
    id: number;
    account: Account;
    title: string;
    description: string;
    registrationDateTime: Date;
    amount: number;
}