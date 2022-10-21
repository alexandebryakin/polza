import { isEqual } from 'lodash';
import React from 'react';

type Interpolations = Record<string, React.ReactNode>;
type Part = string;

const wrap = (str: string) => '${' + str + '}';
const unwrap = (str: string) => str.replace(/(\$|\{|\})/g, '');

const split = (pattern: string, regex: RegExp): Part[] => {
  const groups = pattern.match(regex);

  let parts = [pattern];
  (groups || []).forEach((group) => {
    parts = parts.flatMap((part) => {
      const subparts = part.split(group);

      return subparts.flatMap((elem, index, array) => {
        const isLastPart = index === array.length - 1;

        return isLastPart ? elem : [elem, group];
      });
    });
  });

  return parts.filter((part) => part !== '');
};

const replace = (parts: Part[], interpolations: Interpolations) => {
  const keys = Object.keys(interpolations).map(wrap);

  return parts.map((part) => {
    return keys.includes(part) ? interpolations[unwrap(part)] : part;
  });
};

const INTERPOLATION_REGEX = /(\$\{[a-zA-Z]+\})+/gm;

interface FormatProps {
  pattern: string;
  interpolations: Interpolations;
}
const Format = ({ pattern, interpolations }: FormatProps) => {
  const groups = pattern.match(INTERPOLATION_REGEX) || [];

  if (isEqual(Object.keys(interpolations), groups.map(wrap))) {
    throw new Error('Keys in pattern and interpolations mismatch');
  }

  const parts = replace(split(pattern, INTERPOLATION_REGEX), interpolations);

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>{part}</React.Fragment>
      ))}
    </>
  );
};

export default Format;
