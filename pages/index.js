import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const handleSubscribe = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/api/create-checkout-session", { method: "POST" });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>🚀 AI Resume Builder 🚀</h1>
      <p>Upgrade to Premium to unlock advanced features!</p>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleSubscribe}
      >
        Upgrade to Premium
      </button>
    </div>
  );
}
