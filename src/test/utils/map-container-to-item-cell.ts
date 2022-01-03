import mapContainerToTbody from '../utils/map-container-to-tbody';

const FIRST = 0;

export default function mapContainerToDescriptionCell(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  container: HTMLElement,
): HTMLTableCellElement {
  const tbody: HTMLTableSectionElement = mapContainerToTbody(container);

  const td: HTMLTableCellElement | null = tbody
    .getElementsByTagName('td')
    .item(FIRST);
  if (td === null) {
    throw new Error('Could not find item cell.');
  }

  return td;
}
