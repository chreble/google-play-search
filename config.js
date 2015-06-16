module.exports = {
  url: 'https://play.google.com/store/apps/details?id=%s&hl=%s',
  mainSelector: '',
  selectors: [
    {
      selector: '.document-title[itemprop=name]',
      property: 'name'
    },
    {
      selector: '.document-subtitle.primary span[itemprop=name]',
      property: 'developer'
    },
    {
      selector: '.cover-image[itemprop=image]',
      attr: 'src',
      property: 'icon',
      replacer: ['w300','w256']
    },
    {
      selector: '.document-subtitle.category',
      property: 'categories'
    },
    {
      selector: '.screenshot[itemprop=screenshot]',
      attr: 'src',
      property: 'screenshots',
      replacer: ['h310', 'h700']
    },
    {
      selector: 'meta[itemprop=ratingValue]',
      attr: 'content',
      property: 'rating'
    },
    {
      selector: 'meta[itemprop=ratingCount]',
      attr: 'content',
      property: 'ratingCount'
    },
    {
      selector: '.meta-info .content[itemprop=operatingSystems]',
      property: 'requiredOS'
    },
    {
      selector: '.meta-info .content[itemprop=softwareVersion]',
      property: 'softwareVersion'
    },
    {
      selector: '.meta-info .content[itemprop=contentRating]',
      property: 'contentRating'
    }
  ]
};
