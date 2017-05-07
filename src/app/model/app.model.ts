export interface Point {
    x: number;
    y: number;
}

export interface Fruit extends Point {
    type: string;
}

export interface Snake extends Point {
    direction: number;
    parts: Array<Point>;
}