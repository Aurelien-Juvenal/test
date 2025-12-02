import styled from 'styled-components';

export const ProductCardContainer = styled.div`
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
}



.container {
    display: flex;
    max-width: 1000px;
    width: 100%;
    
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.brand-section {
    flex: 1;
    background: linear-gradient(135deg, #1a2a57 0%, #2c3e50 100%);
    color: white;
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.brand-logo {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
}

.brand-tagline {
    font-size: 18px;
    opacity: 0.9;
    margin-bottom: 30px;
}

.brand-features {
    list-style: none;
    margin-top: 30px;
}

.brand-features li {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
}

.brand-features li::before {
    content: "✓";
    margin-right: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.form-section {
    flex: 1.2;
    padding: 50px 40px;
}

.form-header {
    margin-bottom: 30px;
}

.form-title {
    font-size: 32px;
    font-weight: 700;
    color: #1a2a57;
    margin-bottom: 10px;
}

.form-subtitle {
    color: #666;
    font-size: 16px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #444;
}

.form-control {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: #1a2a57;
    box-shadow: 0 0 0 3px rgba(26, 42, 87, 0.1);
}

.select-wrapper {
    position: relative;
}

.select-wrapper::after {
    content: "▼";
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #777;
    pointer-events: none;
}

select.form-control {
    appearance: none;
    background-color: white;
}

.btn {
    display: block;
    width: 100%;
    padding: 14px;
    background-color: #1a2a57;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
}

.btn:hover {
    background-color: #152347;
}

.login-link {
    text-align: center;
    margin-top: 25px;
    color: #666;
}

.login-link a {
    color: #1a2a57;
    text-decoration: none;
    font-weight: 600;
}

.login-link a:hover {
    text-decoration: underline;
}

.form-footer {
    margin-top: 30px;
    text-align: center;
    font-size: 14px;
    color: #888;
}

/* Responsive */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
    
    .brand-section {
        padding: 30px 25px;
    }
    
    .form-section {
        padding: 30px 25px;
    }
}
`;