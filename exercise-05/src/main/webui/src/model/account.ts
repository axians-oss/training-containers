// The account object is used to store information about the account.
export interface Account {
    id: number;
    name: string;
    address: Address;
    email: string;
    phoneNumber: string;
    vatNumber: string;
    cocNumber: string;
}

// The address object is used to store information about the address.
export interface Address {
    street: string;
    houseNumber: number;
    houseNumberSuffix: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
}