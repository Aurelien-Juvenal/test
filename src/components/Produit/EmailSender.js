// EmailSender.jsx
import React, { useState } from 'react';
import axios from 'axios';

const EmailSender = () => {
    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        body: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/send-email', formData);
            setMessage(response.data.message);
            setFormData({ to: '', subject: '', body: '' });
        } catch (error) {
            setMessage(error.response?.data?.error || 'Erreur lors de l\'envoi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="email-sender">
            <h2>Envoyer un Email</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Destinataire:</label>
                    <input
                        type="email"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Sujet:</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        rows="5"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Envoyer'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EmailSender;