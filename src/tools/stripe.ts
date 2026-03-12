import axios from "axios";

/**
 * StripeTools: Example of payment link generation and customer management.
 */
export class StripeTools {
    private secretKey: string;

    constructor() {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("STRIPE_SECRET_KEY is required.");
        }
        this.secretKey = process.env.STRIPE_SECRET_KEY;
    }

    private getHeaders() {
        return {
            Authorization: `Bearer ${this.secretKey}`,
            "Content-Type": "application/x-www-form-urlencoded",
        };
    }

    async createProduct(name: string, priceCents: number) {
        // Stripe API uses URL encoded form data
        const params = new URLSearchParams();
        params.append("name", name);
        
        const product = await axios.post("https://api.stripe.com/v1/products", params, { headers: this.getHeaders() });
        
        const priceParams = new URLSearchParams();
        priceParams.append("product", product.data.id);
        priceParams.append("unit_amount", priceCents.toString());
        priceParams.append("currency", "usd");
        
        const price = await axios.post("https://api.stripe.com/v1/prices", priceParams, { headers: this.getHeaders() });
        
        return { product: product.data, price: price.data };
    }

    async createPaymentLink(priceId: string) {
        const params = new URLSearchParams();
        params.append("line_items[0][price]", priceId);
        params.append("line_items[0][quantity]", "1");
        
        const response = await axios.post("https://api.stripe.com/v1/payment_links", params, { headers: this.getHeaders() });
        return response.data;
    }
}
