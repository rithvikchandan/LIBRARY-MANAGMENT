const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins (adjust for production)
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Error connecting to MongoDB:', err));

// Schemas & Models
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
});
const Book = mongoose.model('Book', bookSchema);

const fineSchema = new mongoose.Schema({
    member: String,
    book: String,
    amount: Number,
    status: { type: String, default: 'Unpaid' },
});
const Fine = mongoose.model('Fine', fineSchema);

const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
});
const Member = mongoose.model('Member', memberSchema);

const reportSchema = new mongoose.Schema({
    type: String,
    date: String,
    status: String,
    details: String,
});
const Report = mongoose.model('Report', reportSchema);

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

const transactionSchema = new mongoose.Schema({
    book: { type: String, required: true },
    member: { type: String, required: true },
    issueDate: { type: String, required: true },
    returnDate: { type: String, default: "" },
    status: { type: String, default: "Issued" },
});
const Transaction = mongoose.model("Transaction", transactionSchema);

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
        req.user = user;
        next();
    });
};

// --- API Routes ---

// Books CRUD
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
});

app.post('/api/books', async (req, res) => {
    try {
        const { title, author, category } = req.body;
        const newBook = new Book({ title, author, category });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Error adding book' });
    }
});

app.put('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, category } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, category }, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
});

app.delete('/api/books/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book' });
    }
});

// Fines CRUD
app.get('/api/fines', async (req, res) => {
    try {
        const fines = await Fine.find();
        res.status(200).json(fines);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching fines' });
    }
});

app.post('/api/fines', async (req, res) => {
    try {
        const { member, book, amount } = req.body;
        const newFine = new Fine({ member, book, amount });
        await newFine.save();
        res.status(201).json(newFine);
    } catch (error) {
        res.status(500).json({ error: 'Error adding fine' });
    }
});

app.put('/api/fines/:id', async (req, res) => {
    try {
        const updatedFine = await Fine.findByIdAndUpdate(req.params.id, { status: 'Paid' }, { new: true });
        res.status(200).json(updatedFine);
    } catch (error) {
        res.status(500).json({ error: 'Error updating fine' });
    }
});

app.delete('/api/fines/:id', async (req, res) => {
    try {
        await Fine.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Fine deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting fine' });
    }
});

// Members CRUD
app.get('/api/members', async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching members' });
    }
});

app.post('/api/members', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newMember = new Member({ name, email, phone });
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ error: 'Error adding member' });
    }
});

app.put('/api/members/:id', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const updatedMember = await Member.findByIdAndUpdate(req.params.id, { name, email, phone }, { new: true });
        res.status(200).json(updatedMember);
    } catch (error) {
        res.status(500).json({ error: 'Error updating member' });
    }
});

app.delete('/api/members/:id', async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting member' });
    }
});

// Reports CRUD + Get by ID (fixed!)
app.get('/api/reports', async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reports' });
    }
});

app.get('/api/reports/:id', async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ error: 'Report not found' });
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching report' });
    }
});

app.post('/api/reports', async (req, res) => {
    try {
        const { type, date, status, details } = req.body;
        const newReport = new Report({ type, date, status, details });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ error: 'Error adding report' });
    }
});

app.put('/api/reports/:id', async (req, res) => {
    try {
        const { type, date, status, details } = req.body;
        const updatedReport = await Report.findByIdAndUpdate(req.params.id, { type, date, status, details }, { new: true });
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ error: 'Error updating report' });
    }
});

app.delete('/api/reports/:id', async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting report' });
    }
});

// Auth
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid username or password' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid username or password' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Transactions CRUD
app.get("/api/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching transactions" });
    }
});

app.post("/api/transactions", async (req, res) => {
    try {
        const { book, member, issueDate } = req.body;
        const newTransaction = new Transaction({ book, member, issueDate });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: "Error adding transaction" });
    }
});

app.put("/api/transactions/:id", async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { returnDate: new Date().toISOString().split("T")[0], status: "Returned" },
            { new: true }
        );
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ error: "Error updating transaction" });
    }
});

app.delete("/api/transactions/:id", async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting transaction" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
 