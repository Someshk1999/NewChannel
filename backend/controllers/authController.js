const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASS || 'password123';
  const jwtSecret = process.env.JWT_SECRET || 'news-secret-key';

  if (username !== adminUser || password !== adminPass) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  const token = jwt.sign({ role: 'admin', username }, jwtSecret, {
    expiresIn: '8h',
  });

  res.json({ token });
};
