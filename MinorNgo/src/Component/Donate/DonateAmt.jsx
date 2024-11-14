import { useState } from 'react';

const DonateAmt = () => {
  const [amount, setAmount] = useState(500);

  const handleDonate = async () => {
    if (amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!data.orderId) {
        alert('Failed to create donation order');
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Nanhe Kadam",
        description: "Thank you for your support",
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('http://localhost:3001/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyResponse.json();

            if (verifyData.message === 'Payment verification successful') {
              alert('Payment verified successfully!');
            } else {
              alert('Payment verification failed.');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('An error occurred during payment verification.');
          }
        },
        modal: {
          ondismiss: function () {
            alert('Payment process was interrupted. Please try again.');
          },
        },
        prefill: {
          name: "Donor Name",
          email: "donor@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert(`Payment failed due to: ${response.error.description}`);
      });

      rzp.open();
    } catch (error) {
      console.error('Error initiating donation:', error);
      alert('An error occurred while initiating the donation process.');
    }
  };

  return (
    <div>
      <h2>Support Nanhe Kadam</h2>
      <p>Your contribution can make a difference!</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleDonate}>Donate Now</button>
    </div>
  );
};

export default DonateAmt;
