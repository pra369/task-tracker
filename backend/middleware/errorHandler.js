const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({ field: e.path, message: e.message }));
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server Error' });
};

module.exports = errorHandler;