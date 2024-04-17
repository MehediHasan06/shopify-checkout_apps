import {
  BlockSpacer,
  DatePicker,
  Text,
  reactExtension,
  useApplyMetafieldsChange,
  useMetafield,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension(
  "purchase.checkout.shipping-option-list.render-after",
  () => <Extension />,
);

function Extension() {
  const deliveryDate = useMetafield({
    namespace: "delivery",
    key: "delivery_date",
  });
  const setDeliveryDate = useApplyMetafieldsChange();

  return (
    <>
      <BlockSpacer spacing="loose" />
      <Text size="medium">Select a date for delivery</Text>
      <BlockSpacer spacing="extraLoose" />
      <DatePicker
        selected={deliveryDate?.value}
        onChange={(value) => {
          setDeliveryDate({
            type: "updateMetafield",
            namespace: "delivery",
            key: "delivery_date",
            value,
            valueType: "string",
          });
        }}
      />
    </>
  );
}
