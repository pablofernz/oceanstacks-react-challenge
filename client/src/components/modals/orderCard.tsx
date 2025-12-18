import type { IOrder } from "../../types/order";

interface Props {
    order: IOrder;
    handleDelete: (orderId: string) => Promise<void>;
    deletingId: string | null;
}
export const OrderCard = ({ order, handleDelete, deletingId }: Props) => {
    return (
        <div
            key={order.id}
            className="flex flex-col gap-4 rounded-xl bg-[#303030] p-4"
        >
            <div className="flex items-start justify-between border-b border-[#404040] pb-2">
                <div>
                    <p className="text-sm text-[#a0a0a0]">ID: {order.id.split('-')[0]}</p>
                    <p className="text-xs text-[#808080]">
                        {new Date(order.created_at).toLocaleString()}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-xl  text-[#e0e0e0]">
                        ${order.total.toFixed(2)}
                    </p>
                    <button
                        onClick={() => handleDelete(order.id)}
                        disabled={deletingId === order.id}
                        className="rounded-lg bg-red-900/30 px-2 py-2 text-sm text-red-400 transition-colors hover:bg-red-900/50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-[20px]"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {order.order_items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                    >
                        <span className="text-[#c0c0c0]">
                            {item.product.name}{' '}
                            <span className="text-[#606060]">x{item.quantity}</span>
                        </span>
                        <span className="text-[#909090]">${item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};