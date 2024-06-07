/* eslint-disable prettier/prettier */
import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
/* Explanation
  ^                         Start anchor
  (?=.*[A-Z])               Ensure string has one uppercase letters.
  (?=.*[!@#$&*])            Ensure string has one special case letter.
  (?=.*[0-9])               Ensure string has one digits.
  (?=.*[a-z])               Ensure string has one lowercase letters.
  .{8}                      Ensure string is of length 8.
  $                         End anchor.
*/
const PASSWORD_RULE_MESSAGE = 'Password should have 1 upper case, lower letter along with a number and special character.';
const VALIDATION_PIPE = new ValidationPipe({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,});

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};

export const SETTINGS = {
  VALIDATION_PIPE,
};
