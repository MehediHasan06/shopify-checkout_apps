import {
  BlockSpacer,
  DatePicker,
  Text,
  reactExtension,
  useApplyMetafieldsChange,
  useMetafield,
} from "@shopify/ui-extensions-react/checkout";
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
    namespace: "delivery",
    key: "delivery_date",
  });

  // Handle when a buyer selects a new date
  const updateMetafield = useApplyMetafieldsChange();
  const handleDateChange = (newSelectedDate) => {
    updateMetafield({
      type: "updateMetafield",
      namespace: "delivery",
      key: "delivery_date",
      value: newSelectedDate,
      valueType: "string",
    });
  };

  return (
    <>
      <BlockSpacer spacing="loose" />
      <Text size="medium">Select a date for delivery</Text>
      <BlockSpacer spacing="extraLoose" />
      <DatePicker
        selected={deliveryDate?.value || initialAvailableDay}
        onChange={handleDateChange}
        disabled={disabledDateRanges}
      />
    </>
  );
}
