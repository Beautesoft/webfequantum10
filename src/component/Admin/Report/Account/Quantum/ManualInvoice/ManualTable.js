import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    minHeight: 30,
    flexGrow: 1,
    fontSize: "9px",
    alignItems: "center",
  },
  description: {
    paddingLeft: "3px",
    width: "39%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
  },
  status: {
    width: "13%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
  },
  type: {
    width: "12%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
  },
  prepaid: {
    width: "24%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
  },
  payment: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "left",
  },
});

export class ManualTable extends React.Component {
  render() {
    let { items, Flag } = this.props;
    return items.map((item, index) => (
      <View style={styles.row} key={index}>
        <Text style={styles.payment}>{item.quotation_itemcode}</Text>
        <Text style={styles.description}>
          {item.quotation_itemdesc}
          {'\n'}
          {item.quotation_itemremarks}
        </Text>
        <Text style={styles.type}>{item.quotation_quantity}</Text>
        {(Flag == 7 || Flag == 10) && <Text style={styles.type}>{item.quotation_unitprice}</Text>}
        {(Flag == 10) && <Text style={styles.type}>{item.discount_amt}</Text>}
        {(Flag == 7 || Flag == 10) && <Text style={styles.type}>
          {Number(item.quotation_quantity) * Number(item.quotation_unitprice - item.discount_amt)}
        </Text>}
      </View>
    ));
  }
}
