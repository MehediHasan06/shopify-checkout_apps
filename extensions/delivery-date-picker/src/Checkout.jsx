import {
  BlockSpacer,
  DatePicker,
  Text,
  reactExtension,
  useApplyMetafieldsChange,
  useMetafield,
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";
import { getDisabledDateRange } from "./utils/utils";

export default reactExtension(
  "purchase.checkout.shipping-option-list.render-after",
  () => <App />,
);

function App() {
  // make upto x days to the future disabled from the past
  const disabledDateRanges = getDisabledDateRange(3);
  const { selectedDate, setSelectedDate } = useState();

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
        disabled={disabledDateRanges}
      />
    </>
  );
}
