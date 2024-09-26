import axios from 'axios';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const checkServerStatus = async () => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/health`);  // Flask health endpoint
        if (data.status === "ok") {
            return true
        }
    } catch (error) {
        return false
    }
};
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    if (await checkServerStatus() == false) {
        return NextResponse.redirect(new URL('/demo', request.url))
    }
}
// See "Matching Paths" below to learn more
export const config = {
    matcher: '/playground',
}