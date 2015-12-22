class Record extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      edit: false
    };
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit});
  }

  handleEdit(e) {
    e.preventDefault();
    const data = {
      title: this.title.value,
      date: this.date.value,
      amount: this.amount.value
    }
    $.ajax({
      method: 'PUT',
      url: `/records/${this.props.record.id}`,
      dataType: 'JSON',
      data: {record: data},
      success: (result) => {
        this.setState({edit: false})
        this.props.handleEditRecord(this.props.record, result);
      }
    })
  }

  handleDelete(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: `/records/${this.props.record.id}`,
      dataType: 'JSON',
      success: (result) => {
        this.props.handleDeleteRecord(this.props.record);
      }
    });
  }

  recordRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
          <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    )
  }

  recordForm() {
    return (
      <tr>
        <td><input className="form-control" type="text" defaultValue={this.props.record.date} ref={(ref) => this.date = ref} /></td>
        <td><input className="form-control" type="text" defaultValue={this.props.record.title} ref={(ref) => this.title = ref} /></td>
        <td><input className="form-control" type="number" defaultValue={this.props.record.amount} ref={(ref) => this.amount = ref} /></td>
        <td>
          <a className="btn btn-default" onClick={this.handleEdit}>Update</a>
          <a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    )
  }

  render() {
    if (this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }

}