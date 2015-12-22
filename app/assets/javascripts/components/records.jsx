class Records extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    this.addRecord = this.addRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    
    this.records = props.data;
    this.state = {
      records: this.records
    };
  }

  addRecord(record) {
    const records = React.addons.update(this.state.records, {$push: [record]});
    this.setState({records: records});
  }

  updateRecord(record, data) {
    const index = this.state.records.indexOf(record);
    const records = React.addons.update(this.state.records, { $splice: [[index, 1, data]] })
    this.setState({records: records});
  }

  deleteRecord(record) {
    const index = this.state.records.indexOf(record);
    const records = React.addons.update(this.state.records, {$splice: [[index, 1]]});
    this.setState({records: records});
  }

  credits() {
    const credits = this.state.records.filter((val)=> val.amount >= 0);
    return credits.reduce((prev, curr) => prev + parseFloat(curr.amount), 0);
  }

  debits() {
    const debits = this.state.records.filter((val)=> val.amount < 0);
    return debits.reduce((prev, curr) => prev + parseFloat(curr.amount), 0);
  }

  balance() {
    return this.debits() + this.credits();
  }

  render() {
    return (
      <div className="records">
        <h2 className="title col-md-12">Records</h2>

        <AmountBox type="success" amount={this.credits()} text="Credit" />
        <AmountBox type="danger" amount={this.debits()} text="Debit" />
        <AmountBox type="info" amount={this.balance()} text="Balance" />

        <RecordForm handleNewRecord={this.addRecord} />

        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.state.records.map((record) => 
                <Record key={record.id} record={record} handleDeleteRecord={this.deleteRecord} handleEditRecord={this.updateRecord}/>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

