import React, { Component } from "react";
import "./style.scss";
import { TableWrapper, NormalInput, NormalFileUpload, DragFileUpload } from "component/common";
import {
  getCommonApi,
  updateForm,
  commonCreateApi,
  commonDeleteApi,
  commonPatchApi,
} from "redux/actions/common";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import { history } from "helpers";
import { Toast } from "service/toast";
import SimpleReactValidator from 'simple-react-validator';
export class DocumentUploadViewTabClass extends Component {
  state = {
    formFields: {
      customer_id: "",
      filename: "",
      document_name: "",
      files: "",
    },
    activeTab: "",
    isOpenTreatmentDone: false,
    isActiveTab: "detail",
    headerDetails: [

      { label: "File Name ", width: "180px" },
      { label: "Document Name", sortKey: false, width: "150px" },
      {
        label: "File ",
        sortKey: false,
        width: "400px",
      },
    ],


    documentList: [],
    documentListHeader: {},
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  componentWillUnmount() {
    this.validator = new SimpleReactValidator({
      element: message => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });
  }
  componentDidMount() {
    this.getProjectDocument();

  }

  getProjectDocument = () => {
    let { documentListHeader } = this.state;
    this.props
      .getCommonApi(`projectdocument/?project_id=${this.props.fk_id}`)
      .then(key => {
        let { data, header_data } = key;
        let { documentList } = this.state;
        documentList = data;
        documentListHeader = header_data;
        this.setState({ documentList, documentListHeader });
      });
  };


  handleChangeFormName = ({ target: { name, value } }) => {
    let formFields = Object.assign({}, this.state.formFields)
    formFields['filename'] = value;
    this.setState({
      formFields
    });
  }
  handleChangeDocumentName = ({ target: { name, value } }) => {
    let formFields = Object.assign({}, this.state.formFields)
    formFields['document_name'] = value;
    this.setState({
      formFields
    });
  }

  handlefile = (e) => {
    let { formFields } = this.state;
    formFields["files"] = e.target.files[0];
    //img.append("images", e.target.files[0]);
    //this.props.handleFileUpload(e.target.files[0]);
    // console.log(e.target.files[0], "sdkflodsjfpsjdf ===", img)
  };

  // select image to formfield
  handleImageUpload = file => {
    let { formFields } = this.state;
    formFields["files"] = file;
    this.setState({
      formFields,
    });
  };
  handleSubmit = () => {
    this.handleSave();
  };
  handleSave = () => {
    let { formFields } = this.state;

    let formData = new FormData();
    formData.append("customer_id", this.props.cust_id);
    formData.append("filename", formFields.filename);
    formData.append("document_name", formFields.document_name);
    formData.append("file", formFields.files);
    formData.append("fk_project", this.props.fk_id);
    this.props.commonCreateApi(`projectdocument/`, formData).then(async key => {
      Toast({
        type: "success",
        message: "Document Saved Successfully",
      });
      this.getProjectDocument();
    });
  }
  render() {
    let {
      formFields,
      headerDetails,
      documentList = [],
      documentListHeader = {},
    } = this.state;
    let {
      filename,
      document_name,
      files,
    } = formFields;
    let { t } = this.props;
    return (
      <div className="treatment-account">
        <div className="row">
          <div className="col-md-6 col-12 mb-4">
            <label className="text-left text-black common-label-text fs-17 pb-1">
              {t("File Name")}
            </label>
            <div className="input-group">
              <NormalInput
                placeholder="Enter here"
                value={filename}
                name="filename"
                onChange={this.handleChangeFormName}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-4">
            <label className="text-left text-black common-label-text fs-17 pb-1">
              {t("Document Name")}
            </label>
            <div className="input-group">
              <NormalInput
                placeholder="Enter here"
                value={document_name}
                name="document_name"
                onChange={this.handleChangeDocumentName}
              />
            </div>
          </div>

          <div className="col-md-3 col-12 mb-4">

            <input
              onChange={this.handlefile}
              accept="file/*"
              type="file" />
          </div>
          <div className="col-3">
            <input
              type="button"
              id="get_file"
              value="Upload"
              className="btn cursor-pointer mainbg-btn"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
        <div className="col-12 mt-2">
          <div className="table">
            <TableWrapper
              headerDetails={headerDetails}
              queryHandler={this.handlePagination}
            // pageMeta={pageMeta}
            // isEmpty={documentList.length === 0 ? true:false}
            >
              {documentList && documentList.length > 0
                ? documentList.map((item, index) => {
                  return (
                    <tr key={index}>

                      <td>
                        <div className="text-left">{item.filename}</div>
                      </td>
                      <td>
                        <div className="text-left">{item.document_name}</div>
                      </td>
                      <td>
                        <div className="text-left"><a href={item.file}>{item.file}</a></div>
                      </td>

                    </tr>
                  );
                })
                : null}
            </TableWrapper>
          </div>
        </div>


      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCommonApi,
      updateForm,
      commonCreateApi,
      commonPatchApi,
      commonDeleteApi,
    },
    dispatch
  );
};

export const DocumentUploadViewTab = withTranslation()(
  connect(null, mapDispatchToProps)(DocumentUploadViewTabClass)
);
