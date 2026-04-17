const News = require('../models/News');

exports.getAllNews = async (req, res) => {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 8;
    const filter = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};

    const totalItems = await News.countDocuments(filter);
    const news = await News.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ news, totalItems, page, limit });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news', error: error.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news detail', error: error.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { title, description, content, imageUrl } = req.body;
    const news = new News({ title, description, content, imageUrl });
    const savedNews = await news.save();

    res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create news', error: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { title, description, content, imageUrl } = req.body;
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    news.title = title || news.title;
    news.description = description || news.description;
    news.content = content || news.content;
    news.imageUrl = imageUrl || news.imageUrl;

    const updatedNews = await news.save();
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update news', error: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    await news.deleteOne();
    res.json({ message: 'News article deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete news', error: error.message });
  }
};
