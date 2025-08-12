import type ProductType from "./productType";

export default interface CartType extends ProductType {
    quantity: number;
}