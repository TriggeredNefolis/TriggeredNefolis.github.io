exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, phone, email, address, notes, items, total } = JSON.parse(event.body);
        
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        
        const orderSummary = items.map(item => 
            `• ${item.name} x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}`
        ).join('\n');

        const embed = {
            title: '🎮 New Order - GamePort Nepal',
            color: 0x10b981,
            fields: [
                { name: '👤 Customer', value: name, inline: true },
                { name: '📞 Phone', value: phone, inline: true },
                { name: '📧 Email', value: email || 'Not provided', inline: true },
                { name: '📍 Address', value: address, inline: false },
                { name: '🛒 Items', value: orderSummary, inline: false },
                { name: '💰 Total', value: `Rs. ${total.toLocaleString()}`, inline: true }
            ],
            timestamp: new Date().toISOString(),
            footer: { text: 'GamePort Nepal • Order Management' }
        };

        if (notes) {
            embed.fields.push({ name: '📝 Notes', value: notes, inline: false });
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });

        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: 'Order sent to Discord' })
            };
        } else {
            throw new Error('Discord webhook failed');
        }

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send order' })
        };
    }
};