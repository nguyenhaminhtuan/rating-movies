import slugify from './slugify';

describe('slugify', () => {
  it('should return slug string', () => {
    const str = 'Phim Hàn Quốc';
    const slug = slugify(str);
    expect(slug).toBe('phim-han-quoc');
  });
});
