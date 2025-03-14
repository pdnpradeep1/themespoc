// src/pages/TrackOrderPage.jsx
import React, { useState } from 'react';
import Button from '../components/common/Button';

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setOrderResult(null);
    
    if (!orderNumber) {
      setError('Please enter your order number');
      return;
    }
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);
    
    // In a real app, you would call your API here
    // For now, we'll simulate a tracking response
    setTimeout(() => {
      if (orderNumber === '12345' || showDemo) {
        // Demo order
        setOrderResult({
          orderNumber: orderNumber || 'ABC12345',
          customer: 'John Doe',
          email: email,
          orderDate: '2023-05-15',
          status: 'In Transit',
          estimatedDelivery: '2023-05-20',
          trackingNumber: 'TRK98765432',
          carrier: 'Express Shipping',
          items: [
            { name: 'Premium T-Shirt', quantity: 2, price: 29.99 },
            { name: 'Casual Jeans', quantity: 1, price: 59.99 }
          ],
          timeline: [
            { date: '2023-05-15', status: 'Order Placed', details: 'Your order has been confirmed' },
            { date: '2023-05-16', status: 'Processing', details: 'Your order is being processed' },
            { date: '2023-05-17', status: 'Shipped', details: 'Your order has been shipped' },
            { date: '2023-05-18', status: 'In Transit', details: 'Your order is on the way' }
          ]
        });
      } else {
        setError('Order not found. Please check your order number and email.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="page track-order-page">
      <div className="container">
        <div className="track-order-header">
          <h1>Track Your Order</h1>
          <p>Enter your order details to check its status</p>
        </div>
        
        <div className="track-order-content">
          <div className="track-order-form-container">
            {error && <div className="track-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="track-order-form">
              <div className="form-group">
                <label htmlFor="orderNumber">Order Number</label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div className="checkbox-group demo-checkbox">
                <input
                  type="checkbox"
                  id="demoOrder"
                  checked={showDemo}
                  onChange={(e) => setShowDemo(e.target.checked)}
                />
                <label htmlFor="demoOrder">
                  Show demo data (for testing)
                </label>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Track Order'}
              </Button>
            </form>
          </div>
          
          {orderResult && (
            <div className="order-result">
              <h2>Order Details</h2>
              
              <div className="order-status-badge" data-status={orderResult.status.toLowerCase().replace(' ', '-')}>
                {orderResult.status}
              </div>
              
              <div className="order-info-grid">
                <div className="order-info-item">
                  <span className="info-label">Order Number</span>
                  <span className="info-value">{orderResult.orderNumber}</span>
                </div>
                
                <div className="order-info-item">
                  <span className="info-label">Order Date</span>
                  <span className="info-value">{orderResult.orderDate}</span>
                </div>
                
                <div className="order-info-item">
                  <span className="info-label">Customer</span>
                  <span className="info-value">{orderResult.customer}</span>
                </div>
                
                <div className="order-info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{orderResult.email}</span>
                </div>
                
                <div className="order-info-item">
                  <span className="info-label">Est. Delivery</span>
                  <span className="info-value">{orderResult.estimatedDelivery}</span>
                </div>
                
                <div className="order-info-item">
                  <span className="info-label">Tracking Number</span>
                  <span className="info-value">{orderResult.trackingNumber}</span>
                </div>
              </div>
              
              <div className="order-timeline">
                <h3>Shipment Tracking</h3>
                <div className="timeline-container">
                  {orderResult.timeline.map((event, index) => (
                    <div 
                      key={index} 
                      className={`timeline-item ${index === orderResult.timeline.length - 1 ? 'current' : index < orderResult.timeline.length - 1 ? 'completed' : ''}`}
                    >
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <h4>{event.status}</h4>
                        <div className="timeline-date">{event.date}</div>
                        <p>{event.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="order-items">
                <h3>Order Items</h3>
                <div className="order-items-list">
                  {orderResult.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <span>Total</span>
                  <span>
                    ${orderResult.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;