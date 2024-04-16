import {
  Banner,
  reactExtension,
  useApi,
  useTranslate,
} from '@shopify/ui-extensions-react/checkout'

export default reactExtension(
  'purchase.checkout.shipping-option-list.render-after',
  () => <Extension />,
);

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();

  return (
    <Banner title="date-picker">
      {translate('welcome', {target: extension.target})}
    </Banner>
  );
}