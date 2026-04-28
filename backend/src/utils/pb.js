import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.PB_URL || 'http://127.0.0.1:8090');

// Optionally authenticate as admin if needed for backend operations
export const initPb = async () => {
    try {
        if (process.env.PB_ADMIN_EMAIL && process.env.PB_ADMIN_PASSWORD) {
            await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASSWORD);
        }
    } catch (err) {
        console.error('Failed to auth PocketBase:', err.message);
    }
};

export default pb;
