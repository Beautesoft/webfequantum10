import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";
import {
  AccountDetailTableRow,
  AccountDetailTableHeader,
  AccountMainTableHeader,
  AccountMainTableRow,
  ProductTableHeader,
  ProductMainTable,
  ProductDetailHeader,
  ProductDetailTable,
} from "./TreatmentAccount";

import { ManualTable, ManualTableHeader } from "./Quantum/ManualInvoice";

import { PrepaidTableHeader } from "./TreatmentAccount/PrepaidMainTableReport/PrepaidTableHeader";
import { PrepaidTable } from "./TreatmentAccount/PrepaidMainTableReport/PrepaidTable";
import {
  PrepaidDetailHeader,
  PrepaidDetailTable,
} from "./TreatmentAccount/DetailPrepaid";
import {
  CreditTable,
  CreditTableHeader,
} from "./TreatmentAccount/CreditReport";

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
    fontSize: "10px",
  },
});

export class InvoiceItemsTable extends React.Component {
  render() {
    let { TableList, Flag } = this.props;
    return (
      <View style={styles.tableContainer}>
        {Flag == 1 ? (
          <>
            <AccountMainTableHeader />
            {TableList && TableList.length > 0 ? (
              <AccountMainTableRow items={TableList} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {Flag == 2 ? (
          <>
            <CreditTableHeader />
            {TableList && TableList.length > 0 ? (
              <CreditTable items={TableList} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {Flag == 3 ? (
          <>
            <PrepaidTableHeader />
            {TableList && TableList.length > 0 ? (
              <PrepaidTable items={TableList} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {Flag == 4 ? (
          <>
            <PrepaidDetailHeader />
            {TableList && TableList.length > 0 ? (
              <PrepaidDetailTable items={TableList} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {Flag == 5 ? (
          <>
            <ProductTableHeader />
            {TableList && TableList.length > 0 ? (
              <ProductMainTable items={TableList} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {Flag == 6 ? (
          <>
            <ProductDetailHeader />
            {TableList && TableList.length > 0 ? (
              <ProductDetailTable items={TableList} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {Flag == 7 ? (
          <>
            <ManualTableHeader
              Flag={Flag} />
            {TableList.manualinvitem && TableList.manualinvitem.length > 0 ? (
              <ManualTable items={TableList.manualinvitem} Flag={Flag} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {Flag == 8 ? (
          <>
            <ManualTableHeader
              Flag={Flag} />
            {TableList.workordinvitem && TableList.workordinvitem.length > 0 ? (
              <ManualTable items={TableList.workordinvitem} Flag={Flag} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {Flag == 9 ? (
          <>
            <ManualTableHeader
              Flag={Flag} />
            {TableList.deliveryitem && TableList.deliveryitem.length > 0 ? (
              <ManualTable items={TableList.deliveryitem} Flag={Flag} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {Flag == 10 ? (
          <>
            <ManualTableHeader
              Flag={Flag} />
            {TableList.quotationitem && TableList.quotationitem.length > 0 ? (
              <ManualTable items={TableList.quotationitem} Flag={Flag} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {/* <InvoiceTableBlankSpace rowsCount={tableRowsCount - invoice.items.length} /> */}
        {/* <InvoiceTableBlankSpace rowsCount={1} /> */}
        {/* <InvoiceTableFooter items={TableList} /> */}
      </View>
    );
  }
}

export default InvoiceItemsTable;
