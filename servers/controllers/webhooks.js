import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller function to manage Clerk user with database
export const clerkWebhooks = async (req, res) => { 
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Get the headers
        const svix_id = req.headers["svix-id"];
        const svix_timestamp = req.headers["svix-timestamp"];
        const svix_signature = req.headers["svix-signature"];

        if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).json({ success: false, message: "Missing webhook headers" });
        }

        // Verify the webhook
        const payload = await whook.verify(JSON.stringify(req.body), {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        });

        const { data, type } = payload;

        switch (type) {
            case 'user.created': {
                try {
                    const userData = {
                        _id: data.id, 
                        email: data.email_addresses[0].email_address,
                        name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'User',
                        image: data.image_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
                        resume: ''
                    };
                    
                    const existingUser = await User.findById(data.id);
                    if (!existingUser) {
                        await User.create(userData);
                        console.log('User created successfully:', userData);
                    }
                    return res.json({ success: true, message: "User created successfully" });
                } catch (error) {
                    console.error('Error creating user:', error);
                    return res.status(500).json({ success: false, message: "Error creating user" });
                }
            }

            case 'user.updated': {
                try {
                    const userData = {
                        email: data.email_addresses[0].email_address,
                        name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'User',
                        image: data.image_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                    };
                    await User.findByIdAndUpdate(data.id, userData);
                    return res.json({ success: true, message: "User updated successfully" });
                } catch (error) {
                    console.error('Error updating user:', error);
                    return res.status(500).json({ success: false, message: "Error updating user" });
                }
            }

            case 'user.deleted': {
                try {
                    await User.findByIdAndDelete(data.id);
                    return res.json({ success: true, message: "User deleted successfully" });
                } catch (error) {
                    console.error('Error deleting user:', error);
                    return res.status(500).json({ success: false, message: "Error deleting user" });
                }
            }

            default:
                return res.json({ success: true, message: "Webhook received" });
        }
    } catch (error) {
        console.error('Webhook Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}