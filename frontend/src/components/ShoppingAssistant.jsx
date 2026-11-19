import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/cartContextValue";
import {
    buildShoppingResponse,
    findRecommendations,
} from "../services/shoppingAssistant";

const starterPrompts = [
    "Build a ₹150 Tea-Time Combo",
    "Paste My Shopping List",
    "Movie Night Snacks",
    "Best Sellers",
];

function ShoppingAssistant() {
    const { addToCart } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            id: "welcome",
            role: "assistant",
            text: "Hi! I can match your list to Tara's catalog, suggest a combo, and add your picks to the cart.",
            items: [],
            recommendations: [],
        },
    ]);
    const listRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const appendAssistant = (response) => {
        setMessages((current) => [
            ...current,
            { ...response, id: `${Date.now()}-${Math.random()}`, role: "assistant" },
        ]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const prompt = input.trim();
        if (!prompt) return;

        setMessages((current) => [
            ...current,
            { id: `${Date.now()}-user`, role: "user", text: prompt },
        ]);
        setInput("");
        appendAssistant(buildShoppingResponse(prompt));
    };

    const sendStarter = (prompt) => {
        if (prompt === "Paste My Shopping List") {
            setInput("");
            inputRef.current?.focus();
            return;
        }

        setMessages((current) => [
            ...current,
            { id: `${Date.now()}-user`, role: "user", text: prompt },
        ]);
        appendAssistant(buildShoppingResponse(prompt));
    };

    const addItems = (items, label) => {
        items.forEach(({ product, quantity }) => addToCart(product, quantity));
        appendAssistant({
            text: `${label} added to your cart. ${
                items.some(({ product }) => product.category === "Biscuits")
                    ? "A drink or namkeen makes a great pairing."
                    : "Would you like another Tara favourite?"
            }`,
            items: [],
            recommendations: findRecommendations(items),
        });
    };

    const addOne = (item) => {
        addToCart(item.product, item.quantity);
        const response = buildShoppingResponse(item.product.name);
        appendAssistant({
            text: `Added ${item.quantity > 1 ? `${item.quantity} × ` : ""}${item.product.name}. You might like these with it:`,
            items: [],
            recommendations: response.recommendations,
        });
    };

    const renderItems = (items, keyPrefix) => (
        <div className="assistant-items">
            {items.map(({ product, quantity }) => (
                <div className="assistant-item" key={`${keyPrefix}-${product.id}`}>
                    <div className="assistant-item-copy">
                        <strong>{quantity > 1 ? `${quantity} × ` : ""}{product.name}</strong>
                        <span>₹{product.price} each</span>
                    </div>
                    <button
                        type="button"
                        className="assistant-add-button"
                        onClick={() => addOne({ product, quantity })}
                    >
                        Add
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="shopping-assistant">
            {isOpen && (
                <section
                    className="assistant-panel"
                    aria-label="Tara AI Shopping Assistant"
                    aria-live="polite"
                >
                    <header className="assistant-header">
                        <div>
                            <span className="assistant-status-dot" />
                            <h2>Tara AI Assistant</h2>
                            <p>Catalog-aware shopping help</p>
                        </div>
                        <button
                            type="button"
                            className="assistant-close"
                            aria-label="Close shopping assistant"
                            onClick={() => setIsOpen(false)}
                        >
                            ×
                        </button>
                    </header>

                    <div className="assistant-messages" ref={listRef}>
                        {messages.map((message) => (
                            <article
                                className={`assistant-message assistant-message-${message.role}`}
                                key={message.id}
                            >
                                <p>{message.text}</p>
                                {message.items?.length > 0 && (
                                    <>
                                        {renderItems(message.items, `${message.id}-item`)}
                                        <button
                                            type="button"
                                            className="assistant-batch-button"
                                            onClick={() => addItems(message.items, message.actionLabel || "Items")}
                                        >
                                            {message.actionLabel || "Add All to Cart"}
                                        </button>
                                    </>
                                )}
                                {message.recommendations?.length > 0 && (
                                    <div className="assistant-recommendations">
                                        <strong>Take this also</strong>
                                        {renderItems(message.recommendations, `${message.id}-pair`)}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>

                    <div className="assistant-starters" aria-label="Starter prompts">
                        {starterPrompts.map((prompt) => (
                            <button
                                key={prompt}
                                type="button"
                                onClick={() => sendStarter(prompt)}
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>

                    <form className="assistant-input-row" onSubmit={handleSubmit}>
                        <label className="sr-only" htmlFor="assistant-prompt">Your shopping request</label>
                        <input
                            id="assistant-prompt"
                            ref={inputRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="Type a list or idea…"
                        />
                        <button type="submit" disabled={!input.trim()} aria-label="Send message">
                            →
                        </button>
                    </form>
                </section>
            )}

            <button
                type="button"
                className="assistant-launcher"
                aria-label={isOpen ? "Close Tara shopping assistant" : "Open Tara shopping assistant"}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
            >
                <span aria-hidden="true">{isOpen ? "×" : "✦"}</span>
                {!isOpen && <span className="assistant-launcher-label">Ask Tara</span>}
            </button>
        </div>
    );
}

export default ShoppingAssistant;
