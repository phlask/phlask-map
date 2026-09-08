import toTitleCase from './toTitleCase';

function formatTag(tag: unknown) {
  if (typeof tag !== 'string') {
    return '';
  }

  return toTitleCase(tag.replaceAll('_', ' '));
}

export default formatTag;
