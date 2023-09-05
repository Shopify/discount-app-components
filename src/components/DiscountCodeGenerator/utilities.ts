import {DEFAULT_DISCOUNT_CODE_LENGTH} from '../../constants';

const CHARS = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

/**
 * @param length - length of the discount code. Defaults to {@constant DEFAULT_DISCOUNT_CODE_LENGTH}
 *
 * @returns a pseudorandom alphanumeric string
 */
export const generateRandomDiscountCode = (
  length = DEFAULT_DISCOUNT_CODE_LENGTH,
) => {
  if (length < 1) {
    throw new Error('Discount code length must be greater than 0');
  }

  return [...Array(length)]
    .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
    .join('');
};
