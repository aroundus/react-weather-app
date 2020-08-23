module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx'
          ],
          root: ['./src']
        }
      ]
    ]
  };
};
