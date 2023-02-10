export type cartItem = {
    id: string;
    email: string;
    image: string;
    name: string;
    price: number;
    score: number;
};

export type login = {
    email: string;
    password: string;
};

export type registration = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type orderType = {
    date: string;
    email: string;
    id: string;
    image: string;
    name: string;
    order_id: string;
    price: number;
};
