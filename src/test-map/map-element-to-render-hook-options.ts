import mapElementToProps from '../test-map/map-element-to-props';
import TestRenderHookOptions from '../test-types/test-render-hook-options';

export default function mapElementToRenderHookOptions(
  element: HTMLElement | null,
): TestRenderHookOptions {
  return {
    initialProps: mapElementToProps(element),
  };
}
