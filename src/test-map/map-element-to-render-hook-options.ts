import type { RenderHookOptions } from '@testing-library/react-hooks';
import type { UseAwsuiTableItemDescriptionProps } from '..';
import mapElementToProps from '../test-map/map-element-to-props';
import type TestItem from '../test-types/test-item';

export default function mapElementToRenderHookOptions(
  element: HTMLElement | null,
): RenderHookOptions<UseAwsuiTableItemDescriptionProps<TestItem>> {
  return {
    initialProps: mapElementToProps(element),
  };
}
