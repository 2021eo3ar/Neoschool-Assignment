import express from 'express';
import Contact from '../models/Contact.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create Contact API
router.post('/create', auth, async (req, res) => {
    const { name, phone, email, linkedin, twitter } = req.body;

    try {
        const newContact = new Contact({
            name,
            phone: phone.toString(),
            email,
            linkedin,
            twitter,
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error('Error creating contact:', err.message);
        res.status(500).send('Server Error');
    }
});

// Edit Contact API
router.put('/edit', auth, async (req, res) => {
    const { name, email, linkedin, twitter } = req.body;

    try {
        const contact = await Contact.findOne({ name });

        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        if (email) contact.email = email;
        if (linkedin) contact.linkedin = linkedin;
        if (twitter) contact.twitter = twitter;

        await contact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Search Contact API
router.post('/search', auth, async (req, res) => {
    const { search_token } = req.body;

    try {
        const contacts = await Contact.find({ name: { $regex: search_token, $options: 'i' } });

        if (contacts.length === 0) {
            return res.status(404).json({ msg: 'No contacts found' });
        }

        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
