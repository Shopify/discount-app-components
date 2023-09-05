import {generateRandomDiscountCode} from '../utilities';
import {DEFAULT_DISCOUNT_CODE_LENGTH} from '../../../constants';

describe('discount code generator utilities', () => {
  describe('#generateRandomDiscountCode', () => {
    it('generates a code of length DEFAULT_DISCOUNT_CODE_LENGTH when no length is specified', () => {
      const response = generateRandomDiscountCode();
      expect(response).toMatch(
        new RegExp(`^[0-9A-Z]{${DEFAULT_DISCOUNT_CODE_LENGTH}}$`),
      );
    });

    it('generates a code of length', () => {
      const length = 42;
      const response = generateRandomDiscountCode(length);
      expect(response).toMatch(new RegExp(`^[0-9A-Z]{${length}}$`));
    });

    it('throws an error when discount code length is < 1', () => {
      const length = 0;
      const attempt = () => generateRandomDiscountCode(length);
      expect(attempt).toThrow(
        new Error('Discount code length must be greater than 0'),
      );
    });
  });
});
