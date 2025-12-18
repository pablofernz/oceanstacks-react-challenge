interface Props {
    item: {
        product: {
            name: string;
        };
        quantity: number;
        price: number;
    };
}

export const OrderItem = ({ item }: Props) => {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-[#c0c0c0]">
                {item.product.name} <span className="text-[#606060]">x{item.quantity}</span>
            </span>
            <span className="text-[#909090]">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    );
};
