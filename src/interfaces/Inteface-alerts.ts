export interface Creation {
    id: string;
    quantity: string
}

export interface Edit {
    productName: string;
    quantity: string;
    price: string;
    total: string
}

export interface Delete {
    productName: string;
    quantity: string;
    price: string;
    total: string
}
