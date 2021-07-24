import DESCRIPTION_ROW_ERROR from '../test-constants/description-row-error';
import mapContainerToTbody from '../test-map/map-container-to-tbody';

const SECOND = 1;

export default function mapContainerToDescriptionRow(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  container: HTMLElement,
): HTMLTableRowElement {
  const tbody: HTMLTableSectionElement = mapContainerToTbody(container);

  const tr: HTMLTableRowElement | null = tbody
    .getElementsByTagName('tr')
    .item(SECOND);
  if (tr === null) {
    throw DESCRIPTION_ROW_ERROR;
  }

  return tr;
}
