'use client';

import React, { useState } from 'react';

function PagoPage() {
    const [paymentId, setPaymentId] = useState('');
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);

    const fetchPaymentData = async () => {
        try {
            const response = await fetch('/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: { id: paymentId } })
            });

            if (!response.ok) {
                throw new Error('Error fetching payment data');
            }

            const data = await response.json();
            setPaymentData(data.pago);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                placeholder="Enter Payment ID"
            />
            <button onClick={fetchPaymentData}>Fetch Payment Data</button>
            {error && <p>Error: {error}</p>}
            {paymentData && (
                <div>
                    <p>Payment ID: {paymentData.id}</p>
                    <p>Amount: {paymentData.amount}</p>
                    <p>Date: {paymentData.date}</p>
                </div>
            )}
        </div>
    );
}

export default PagoPage;
