import {
  BlockSpacer,
  Checkbox,
  DatePicker,
  Text,
  reactExtension,
  useApplyMetafieldsChange,
  useMetafield,
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";
import * as metafields from "./constants/metafields";
import { getDisabledDateRange, getFirstAvailableDate } from "./utils/utils";

export default reactExtension(
  "purchase.checkout.shipping-option-list.render-after",
  () => <App />,
);

function App() {
  const disabledDateRanges = getDisabledDateRange(3); // make upto x days to the future disabled, from the past
  const lastDisabledDay = disabledDateRanges[0].end;
  const initialAvailableDay = getFirstAvailableDate(lastDisabledDay);
  const deliveryDate = useMetafield({
    namespace: metafields.SHIPPING_METAFIELD_NAMESPACE,
    key: metafields.SHIPPING_METAFIELD_KEY,
  });

  // Handle when a buyer selects a new date
  const updateMetafield = useApplyMetafieldsChange();
  const handleDateChange = (newSelectedDate) => {
    updateMetafield({
      type: "updateMetafield",
      namespace: metafields.SHIPPING_METAFIELD_NAMESPACE,
      key: metafields.SHIPPING_METAFIELD_KEY,
      value: newSelectedDate,
      valueType: "string",
    });
  };

  // Handle when a buyer checks the checkbox
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleCheckboxChange = (isChecked) => {
    setShowDatePicker(isChecked);
    if (!isChecked) {
      console.log("inside to remove the metafield---");
      updateMetafield({
        type: "removeMetafield",
        namespace: metafields.SHIPPING_METAFIELD_NAMESPACE,
        key: metafields.SHIPPING_METAFIELD_KEY,
      });
    }
  };
  return (
    <>
      <Text size="medium" emphasis="bold">
        Want your order delivered a specific date?
      </Text>
      <Checkbox
        id="showDatePicker"
        name="showDatePicker"
        checked={showDatePicker}
        onChange={handleCheckboxChange}
      >
        Select a target delivery date.
      </Checkbox>
      <BlockSpacer spacing="extraLoose" />
      {showDatePicker && (
        <DatePicker
          selected={deliveryDate?.value || initialAvailableDay}
          onChange={handleDateChange}
          disabled={disabledDateRanges}
        />
      )}
    </>
  );
}
