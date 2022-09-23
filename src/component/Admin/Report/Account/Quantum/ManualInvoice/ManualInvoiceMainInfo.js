import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "stretch",
    fontSize: "10px",
  },
  headerNormalText: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flexGrow: 5,
  },

  headerText: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  invoiceNoContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },

  label: {
    alignSelf: "flex-start",
  },
  value: {
    alignSelf: "flex-end",
  },
  leftlabel: {
    width: 100,
    alignSelf: "flex-start",
    textAlign: "left",
  },
  leftvalue: {
    alignSelf: "flex-end",
    textAlign: "left",
  },
  rightlabel: {
    width: 80,
    textAlign: "left",
  },
  rightvalue: {
    minWidth: 60,
    maxWidth: 100,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    textAlign: "left",
  },
});

export class ManualInvoiceMainInfo extends React.Component {
  render() {
    let { accountHeader, Flag } = this.props;
    let now = new Date();
    var PrintedDate = moment(now).format("DD-MM-YYYY");
    var PrintedTime = moment(now).format("HH:MM:SS");
    var xFormName = "Invoice";
    var xNumber = accountHeader.manualinv_number;
    if (Flag == 7) {
      xNumber = accountHeader.manualinv_number;
    }
    if (Flag == 8) {
      xFormName = "Work Order";
      xNumber = accountHeader.workorderinv_number;
    }
    else if (Flag == 9) {
      xFormName = "Delivery Order";
      xNumber = accountHeader.do_number;
    }
    else if (Flag == 10) {
      xFormName = "Quotation";
      xNumber = accountHeader.quotation_number;
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerNormalText}>
          <View style={styles.invoiceNoContainer}>
            <Text style={styles.leftlabel}>{xFormName} No.</Text>
            <Text style={styles.label}> : </Text>
            <Text style={styles.leftvalue}>
              {xNumber}
            </Text>
          </View>
          <View style={styles.invoiceNoContainer}>
            <Text style={styles.leftlabel}>{xFormName} Date</Text>
            <Text style={styles.label}> : </Text>
            <Text style={styles.leftvalue}>
              {moment(accountHeader.created_at).format("DD-MM-YYYY")}
            </Text>
          </View>
          {Flag != 10 &&
            <View style={styles.invoiceNoContainer}>
              <Text style={styles.leftlabel}>Status</Text>
              <Text style={styles.label}> : </Text>
              <Text style={styles.leftvalue}>{accountHeader.status}</Text>
            </View>
          }
          <View style={styles.invoiceNoContainer}>
            <Text style={styles.leftlabel}>Project</Text>
            <Text style={styles.label}> : </Text>
            <Text style={styles.leftvalue}>{accountHeader.title}</Text>
          </View>
          {Flag == 7 &&
            <View style={styles.invoiceNoContainer}>
              <Text style={styles.leftlabel}>Quotation No</Text>
              <Text style={styles.label}> : </Text>
              <Text style={styles.leftvalue}>{accountHeader.quotation_number}</Text>
            </View>
          }
        </View>
        <View style={styles.headerText}>
          <View style={styles.invoiceNoContainer}>
            <Text style={styles.rightlabel}>Company Name</Text>
            <Text style={styles.label}> : </Text>
            <Text style={styles.rightvalue}>{accountHeader.company}</Text>
          </View>
          {Flag == 10 &&
            <View style={styles.invoiceNoContainer}>
              <Text style={styles.rightlabel}>Company Address</Text>
              <Text style={styles.label}> : </Text>
              <Text style={styles.rightvalue}>{accountHeader.address}</Text>
            </View>}
          <View style={styles.invoiceNoContainer}>
            <Text style={styles.rightlabel}>Attn To</Text>
            <Text style={styles.label}> : </Text>
            <Text style={styles.rightvalue}>
              {accountHeader.contact_person}
            </Text>
          </View>
          <View style={styles.invoiceNoContainer}>
            <Text style={styles.rightlabel}>Prepared By</Text>
            <Text style={styles.label}> : </Text>
            <Text style={styles.rightvalue}>{accountHeader.in_charge}</Text>
          </View>
          {Flag != 10 &&
            <View style={styles.invoiceNoContainer}>
              <Text style={styles.rightlabel}>Printed On</Text>
              <Text style={styles.label}> : </Text>
              <Text style={styles.rightvalue}>
                {PrintedDate}
                {` `} {PrintedTime}
              </Text>
            </View>
          }
        </View>
      </View>
    );
  }
}
