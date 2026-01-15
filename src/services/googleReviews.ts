// Google Places API Service
// Fetches reviews from Google Places API

export interface GoogleReview {
    author_name: string;
    author_url?: string;
    profile_photo_url?: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
}

export interface PlaceDetails {
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
}

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;

/**
 * Fetches Google reviews for the configured place
 * @returns Promise with place details and reviews
 */
export async function fetchGoogleReviews(): Promise<PlaceDetails | null> {
    if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
        console.warn('Google Places API key or Place ID not configured');
        return null;
    }

    try {
        // Using Places API (New) - Place Details
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${GOOGLE_PLACES_API_KEY}`;

        // Note: This will fail due to CORS when called directly from browser
        // You'll need to use a proxy or serverless function
        // For now, we'll use the CORS proxy approach
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

        const response = await fetch(proxyUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'OK' && data.result) {
            return {
                name: data.result.name,
                rating: data.result.rating,
                user_ratings_total: data.result.user_ratings_total,
                reviews: data.result.reviews || []
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        return null;
    }
}

/**
 * Get the Google Maps URL for the place
 */
export function getGoogleMapsUrl(): string {
    if (!GOOGLE_PLACE_ID) {
        return 'https://www.google.com/maps';
    }
    return `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`;
}

/**
 * Fallback static reviews (used when API fails or is not configured)
 */
export const fallbackReviews = [
    {
        author_name: "Rajesh & Priya Gupta",
        rating: 5,
        text: "Little Wings has been a blessing for our family. Aarav has grown so much in confidence and loves going to school every day. The teachers are incredibly caring and skilled.",
        relative_time_description: "2 months ago",
        time: Date.now() - 5184000000,
    },
    {
        author_name: "Amit & Sneha Sharma",
        rating: 5,
        text: "The Montessori approach at Little Wings is exactly what we were looking for. Diya has developed independence and creativity beyond our expectations. Highly recommended!",
        relative_time_description: "3 months ago",
        time: Date.now() - 7776000000,
    },
    {
        author_name: "Vikram & Neha Patel",
        rating: 5,
        text: "As working parents, we needed a place where Arjun would be safe and happy. Little Wings exceeded our expectations with their caring environment and regular updates.",
        relative_time_description: "1 month ago",
        time: Date.now() - 2592000000,
    },
    {
        author_name: "Suresh & Kavita Singh",
        rating: 5,
        text: "The transition from home to school was seamless thanks to the wonderful teachers. Ananya has made great friends and is well-prepared for primary school.",
        relative_time_description: "4 months ago",
        time: Date.now() - 10368000000,
    }
];
