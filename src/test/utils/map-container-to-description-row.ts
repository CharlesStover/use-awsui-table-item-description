import DESCRIPTION_ROW_ERROR from '../constants/description-row-error';
import mapContainerToTbody from '../utils/map-container-to-tbody';

const SECOND = 1;

export default function mapContainerToDescriptionRow(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  container: HTMLElement,
): HTMLTableRowElement {
  const tbody: HTMLTableSectionElement = mapContainerToTbody(container);

  const tr: HTMLTableRowElement | null = tbody
    .getElementsByTagName('tr')
    .item(SECOND);

  // This should never occur, so we don't need mandatory coverage on it.
  // Since it throws an error, the test will fail and block CI/CD.
  // istanbul ignore next
  if (tr === null) {
    throw DESCRIPTION_ROW_ERROR;
  }

  return tr;
}
